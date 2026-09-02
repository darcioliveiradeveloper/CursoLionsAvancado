import type { IUserRepository } from "../repositories/iuser.repository.js";
import { AppError } from "../errors/app.error.js";
import type { IUser } from "../types.js";
import type { CreateUserBody, UpdateUserBody } from "../types.js";

// ========== EXERCÍCIO 12: UserService com injeção de dependência ==========
// Recebe um IUserRepository (não o cria) e usa apenas o contrato. As regras de
// negócio (validação do corpo, 400/404) continuam aqui; o Service não conhece
// req, res nem detalhes do arquivo JSON.

export class UserService {
  constructor(private readonly repository: IUserRepository) {}

  async getAll(): Promise<IUser[]> {
    return this.repository.findAll();
  }

  async getById(id: number): Promise<IUser> {
    const user: IUser | undefined = await this.repository.findById(id);
    if (!user) {
      throw new AppError(`Usuário com id ${id} não encontrado`, 404);
    }
    return user;
  }

  async create(body: CreateUserBody): Promise<IUser> {
    if (!isValidUser(body)) {
      throw new AppError(
        "Dados inválidos. Envie: { name: string, email: string, isActive: boolean }",
        400,
      );
    }
    return this.repository.create(body);
  }

  async update(id: number, body: UpdateUserBody): Promise<IUser> {
    if (!isValidPartialUser(body)) {
      throw new AppError(
        "Dados inválidos. Envie ao menos um campo: { name?, email?, isActive? }",
        400,
      );
    }

    const updated: IUser | undefined = await this.repository.update(id, body);
    if (!updated) {
      throw new AppError(`Usuário com id ${id} não encontrado`, 404);
    }
    return updated;
  }

  async delete(id: number): Promise<IUser> {
    const removed: IUser | undefined = await this.repository.delete(id);
    if (!removed) {
      throw new AppError(`Usuário com id ${id} não encontrado`, 404);
    }
    return removed;
  }
}

// Validação em tempo de execução. O RequestHandler tipa o contrato em
// desenvolvimento; o JSON real chega aqui sem garantia, por isso validamos.

function isValidUser(body: CreateUserBody): body is CreateUserBody {
  return (
    typeof body.name === "string" &&
    typeof body.email === "string" &&
    typeof body.isActive === "boolean"
  );
}

function isValidPartialUser(body: UpdateUserBody): body is UpdateUserBody {
  const hasName: boolean = "name" in body && typeof body.name === "string";
  const hasEmail: boolean = "email" in body && typeof body.email === "string";
  const hasIsActive: boolean = "isActive" in body && typeof body.isActive === "boolean";

  const allFieldsValid: boolean =
    (!("name" in body) || hasName) &&
    (!("email" in body) || hasEmail) &&
    (!("isActive" in body) || hasIsActive);

  return allFieldsValid && (hasName || hasEmail || hasIsActive);
}