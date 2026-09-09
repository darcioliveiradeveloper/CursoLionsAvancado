import { AppError } from "../errors/app.error.js";
import type { IProduct } from "../types.js";

// ========== EXERCÍCIO 10: CLASSE ProductService ==========
// Responsável por manipular os produtos e aplicar as regras de negócio:
// - name: string com trim().length >= 3
// - price: number, sem NaN e >= 0 (zero é permitido)
// - inStock: boolean
// - categories: array de strings
// - id gerado pela aplicação (o cliente não decide)

const initialProducts: IProduct[] = [
  { id: 1, name: "Teclado Mecânico", price: 450.99, inStock: true, categories: ["Eletrônicos", "Periféricos"] },
  { id: 2, name: "Mouse Gamer", price: 150, inStock: true, categories: ["Periféricos"] },
  { id: 3, name: "Monitor 24", price: 899.9, inStock: false, categories: ["Eletrônicos"] },
];

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

export class ProductService {
  private products: IProduct[] = [...initialProducts];

  getAll(): IProduct[] {
    return this.products;
  }

  getById(id: number): IProduct {
    const product: IProduct | undefined = this.products.find((item: IProduct) => item.id === id);
    if (!product) {
      throw new AppError(`Produto com id ${id} não encontrado`, 404);
    }
    return product;
  }

  create(data: Record<string, unknown>): IProduct {
    const product: IProduct = {
      id: this.nextId(),
      name: validateName(data.name),
      price: validatePrice(data.price),
      inStock: validateInStock(data.inStock),
      categories: validateCategories(data.categories),
    };
    this.products.push(product);
    return product;
  }

  // Atualização parcial: valida apenas os campos enviados.
  update(id: number, data: Record<string, unknown>): IProduct {
    const index: number = this.products.findIndex((item: IProduct) => item.id === id);
    const current: IProduct | undefined = this.products[index];

    if (index === -1) {
      throw new AppError(`Produto com id ${id} não encontrado`, 404);
    }

    const hasName: boolean = "name" in data;
    const hasPrice: boolean = "price" in data;
    const hasInStock: boolean = "inStock" in data;
    const hasCategories: boolean = "categories" in data;

    if (!hasName && !hasPrice && !hasInStock && !hasCategories) {
      throw new AppError(
        "Nenhum campo enviado. Envie ao menos um: { name?, price?, inStock?, categories? }",
        400,
      );
    }

    const updated: IProduct = { ...current! };
    if (hasName) {
      updated.name = validateName(data.name);
    }
    if (hasPrice) {
      updated.price = validatePrice(data.price);
    }
    if (hasInStock) {
      updated.inStock = validateInStock(data.inStock);
    }
    if (hasCategories) {
      updated.categories = validateCategories(data.categories);
    }

    this.products[index] = updated;
    return updated;
  }

  delete(id: number): IProduct {
    const index: number = this.products.findIndex((item: IProduct) => item.id === id);

    if (index === -1) {
      throw new AppError(`Produto com id ${id} não encontrado`, 404);
    }

    return this.products.splice(index, 1)[0]!;
  }

  private nextId(): number {
    return this.products.length === 0
      ? 1
      : Math.max(...this.products.map((item: IProduct) => item.id)) + 1;
  }
}