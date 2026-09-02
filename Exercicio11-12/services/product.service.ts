import type { IProductRepository } from "../repositories/iproduct.repository.js";
import { AppError } from "../errors/app.error.js";
import type { IProduct } from "../types.js";
import type { CreateProductBody, UpdateProductBody } from "../types.js";

// ========== EXERCÍCIO 12: ProductService com injeção de dependência ==========
// Recebe um IProductRepository e aplica as regras de negócio:
// - name: trim().length >= 3
// - price: >= 0 e sem NaN
// - inStock: boolean
// - categories: array de strings
// Validação em runtime permanece aqui (o RequestHandler tipa no desenvolvimento).

export class ProductService {
  constructor(private readonly repository: IProductRepository) {}

  async getAll(): Promise<IProduct[]> {
    return this.repository.findAll();
  }

  async getById(id: number): Promise<IProduct> {
    const product: IProduct | undefined = await this.repository.findById(id);
    if (!product) {
      throw new AppError(`Produto com id ${id} não encontrado`, 404);
    }
    return product;
  }

  async create(body: CreateProductBody): Promise<IProduct> {
    return this.repository.create({
      name: validateName(body.name),
      price: validatePrice(body.price),
      inStock: validateInStock(body.inStock),
      categories: validateCategories(body.categories),
    });
  }

  // Atualização parcial: valida apenas os campos enviados, mesmas regras do create.
  async update(id: number, body: UpdateProductBody): Promise<IProduct> {
    const hasName: boolean = "name" in body;
    const hasPrice: boolean = "price" in body;
    const hasInStock: boolean = "inStock" in body;
    const hasCategories: boolean = "categories" in body;

    if (!hasName && !hasPrice && !hasInStock && !hasCategories) {
      throw new AppError(
        "Nenhum campo enviado. Envie ao menos um: { name?, price?, inStock?, categories? }",
        400,
      );
    }

    const changes: Partial<IProduct> = {};
    if (hasName) {
      changes.name = validateName(body.name);
    }
    if (hasPrice) {
      changes.price = validatePrice(body.price);
    }
    if (hasInStock) {
      changes.inStock = validateInStock(body.inStock);
    }
    if (hasCategories) {
      changes.categories = validateCategories(body.categories);
    }

    const updated: IProduct | undefined = await this.repository.update(id, changes);
    if (!updated) {
      throw new AppError(`Produto com id ${id} não encontrado`, 404);
    }
    return updated;
  }

  async delete(id: number): Promise<IProduct> {
    const removed: IProduct | undefined = await this.repository.delete(id);
    if (!removed) {
      throw new AppError(`Produto com id ${id} não encontrado`, 404);
    }
    return removed;
  }
}

function validateName(value: unknown): string {
  if (typeof value !== "string") {
    throw new AppError("O campo name deve ser uma string", 400);
  }
  if (value.trim().length < 3) {
    throw new AppError("O campo name deve ter no mínimo 3 caracteres", 400);
  }
  return value.trim();
}

function validatePrice(value: unknown): number {
  if (typeof value !== "number") {
    throw new AppError("O campo price deve ser um número", 400);
  }
  // typeof NaN === "number", por isso a checagem explícita.
  if (Number.isNaN(value)) {
    throw new AppError("O campo price não pode ser NaN", 400);
  }
  if (value < 0) {
    throw new AppError("O campo price não pode ser negativo", 400);
  }
  return value;
}

function validateInStock(value: unknown): boolean {
  if (typeof value !== "boolean") {
    throw new AppError("O campo inStock deve ser um booleano", 400);
  }
  return value;
}

function validateCategories(value: unknown): string[] {
  if (!Array.isArray(value) || !value.every((item: unknown) => typeof item === "string")) {
    throw new AppError("O campo categories deve ser um array de strings", 400);
  }
  return value;
}