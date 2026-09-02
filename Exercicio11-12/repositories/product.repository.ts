import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { IProductRepository } from "./iproduct.repository.js";
import type { IProduct } from "../types.js";

// ========== EXERCÍCIO 12: ProductRepository (persistência em JSON) ==========
// Implementa IProductRepository sobre um arquivo JSON. Detalhes de fs.promises
// ficam escondidos atrás da interface. Mesma limitação de gravações
// concorrentes documentada no UserRepository.

const dataFile: string = fileURLToPath(new URL("../data/products.json", import.meta.url));

export class ProductRepository implements IProductRepository {
  async findAll(): Promise<IProduct[]> {
    return this.readProducts();
  }

  async findById(id: number): Promise<IProduct | undefined> {
    const products: IProduct[] = await this.readProducts();
    return products.find((product) => product.id === id);
  }

  async create(input: Omit<IProduct, "id">): Promise<IProduct> {
    const products: IProduct[] = await this.readProducts();
    const maxId: number = products.length === 0 ? 0 : Math.max(...products.map((product) => product.id));
    const product: IProduct = { id: maxId + 1, ...input };
    await this.writeProducts([...products, product]);
    return product;
  }

  async update(id: number, changes: Partial<IProduct>): Promise<IProduct | undefined> {
    const products: IProduct[] = await this.readProducts();
    const index: number = products.findIndex((product) => product.id === id);
    if (index === -1) {
      return undefined;
    }

    const current: IProduct = products[index]!;
    const updated: IProduct = { ...current, ...changes, id };
    products[index] = updated;
    await this.writeProducts(products);
    return updated;
  }

  async delete(id: number): Promise<IProduct | undefined> {
    const products: IProduct[] = await this.readProducts();
    const index: number = products.findIndex((product) => product.id === id);
    if (index === -1) {
      return undefined;
    }

    const [removed]: IProduct[] = products.splice(index, 1);
    await this.writeProducts(products);
    return removed;
  }

  // ===== internas: escondem o formato de armazenamento =====

  private async readProducts(): Promise<IProduct[]> {
    let content: string;
    try {
      content = await readFile(dataFile, "utf-8");
    } catch (error) {
      const err: NodeJS.ErrnoException = error as NodeJS.ErrnoException;
      if (err.code === "ENOENT") {
        return [];
      }
      throw error;
    }

    const parsed: unknown = JSON.parse(content);
    if (!Array.isArray(parsed)) {
      throw new Error("Arquivo de dados de produtos está corrompido");
    }
    return parsed as IProduct[];
  }

  private async writeProducts(products: IProduct[]): Promise<void> {
    await mkdir(dirname(dataFile), { recursive: true });
    await writeFile(dataFile, JSON.stringify(products, null, 2), "utf-8");
  }
}