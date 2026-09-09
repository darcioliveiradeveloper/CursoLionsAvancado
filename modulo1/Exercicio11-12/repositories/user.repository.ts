import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { IUserRepository } from "./iuser.repository.js";
import type { IUser } from "../types.js";

// ========== EXERCÍCIO 12: UserRepository (persistência em JSON) ==========
// Implementa IUserRepository sobre um arquivo JSON. Detalhes de fs.promises,
// JSON.parse e local do arquivo ficam escondidos atrás da interface.
// Limitação documentada: gravações concorrentes podem se sobrescrever (não
// há fila/transação; leitura-escrita é feita por operação).

const dataFile: string = fileURLToPath(new URL("../data/users.json", import.meta.url));

export class UserRepository implements IUserRepository {
  async findAll(): Promise<IUser[]> {
    return this.readUsers();
  }

  async findById(id: number): Promise<IUser | undefined> {
    const users: IUser[] = await this.readUsers();
    return users.find((user) => user.id === id);
  }

  async create(input: Omit<IUser, "id">): Promise<IUser> {
    const users: IUser[] = await this.readUsers();
    const maxId: number = users.length === 0 ? 0 : Math.max(...users.map((user) => user.id));
    const user: IUser = { id: maxId + 1, ...input };
    await this.writeUsers([...users, user]);
    return user;
  }

  async update(id: number, changes: Partial<IUser>): Promise<IUser | undefined> {
    const users: IUser[] = await this.readUsers();
    const index: number = users.findIndex((user) => user.id === id);
    if (index === -1) {
      return undefined;
    }

    const current: IUser = users[index]!;
    const updated: IUser = { ...current, ...changes, id };
    users[index] = updated;
    await this.writeUsers(users);
    return updated;
  }

  async delete(id: number): Promise<IUser | undefined> {
    const users: IUser[] = await this.readUsers();
    const index: number = users.findIndex((user) => user.id === id);
    if (index === -1) {
      return undefined;
    }

    const [removed]: IUser[] = users.splice(index, 1);
    await this.writeUsers(users);
    return removed;
  }

  // ===== internas: escondem o formato de armazenamento =====

  private async readUsers(): Promise<IUser[]> {
    let content: string;
    try {
      content = await readFile(dataFile, "utf-8");
    } catch (error) {
      const err: NodeJS.ErrnoException = error as NodeJS.ErrnoException;
      // Arquivo inexistente: começa com a lista vazia.
      if (err.code === "ENOENT") {
        return [];
      }
      throw error;
    }

    const parsed: unknown = JSON.parse(content);
    // A anotação de tipo não valida o arquivo; checamos o formato em runtime.
    if (!Array.isArray(parsed)) {
      throw new Error("Arquivo de dados de usuários está corrompido");
    }
    return parsed as IUser[];
  }

  private async writeUsers(users: IUser[]): Promise<void> {
    await mkdir(dirname(dataFile), { recursive: true });
    await writeFile(dataFile, JSON.stringify(users, null, 2), "utf-8");
  }
}