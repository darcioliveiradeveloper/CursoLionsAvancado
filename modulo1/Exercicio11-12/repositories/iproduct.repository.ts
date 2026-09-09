import type { IProduct } from "../types.js";

// ========== EXERCÍCIO 12: CONTRATO DO REPOSITORY (PRODUTOS) ==========
// Mesma ideia do IUserRepository: esconde COMO os produtos são persistidos.
// Todos os métodos retornam Promise tipada. Nenhum método decide status HTTP.

export interface IProductRepository {
  findAll(): Promise<IProduct[]>;
  findById(id: number): Promise<IProduct | undefined>;
  create(input: Omit<IProduct, "id">): Promise<IProduct>;
  update(id: number, changes: Partial<IProduct>): Promise<IProduct | undefined>;
  delete(id: number): Promise<IProduct | undefined>;
}