import type { IUser } from "../types.js";

// ========== EXERCÍCIO 12: CONTRATO DO REPOSITORY ==========
// O Repository esconde COMO os dados são armazenados/recuperados (array,
// JSON, banco de dados). O restante da aplicação conhece apenas este contrato.
// Como a persistência é assíncrona, todos os métodos retornam Promise.
// Nenhum método decide status HTTP.

export interface IUserRepository {
  findAll(): Promise<IUser[]>;
  findById(id: number): Promise<IUser | undefined>;
  create(input: Omit<IUser, "id">): Promise<IUser>;
  update(id: number, changes: Partial<IUser>): Promise<IUser | undefined>;
  delete(id: number): Promise<IUser | undefined>;
}