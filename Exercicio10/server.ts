import express from "express";
import type { Request, Response } from "express";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { AppError } from "./errors/app.error.js";
import { ProductService } from "./services/product.service.js";

// ========== EXERCÍCIO 10: API REST + ProductService ==========
// A rota só decide HTTP (status, formato). As regras de negócio (nome curto,
// preço negativo/NaN, id gerado pela aplicação) vivem no ProductService.

const app = express();
const PORT: number = 3000;

app.use(express.json());
app.use(loggerMiddleware);

const productService = new ProductService();

// Converte o parâmetro :id em número ou rejeita com AppError.
function parseId(rawId: string | string[] | undefined): number {
  if (typeof rawId !== "string" || rawId.trim() === "") {
    throw new AppError("ID inválido", 400);
  }
  const id: number = Number(rawId);
  if (Number.isNaN(id)) {
    throw new AppError("ID inválido", 400);
  }
  return id;
}

// ========== ROTAS ==========

// GET /products - Retorna todos os produtos
app.get("/products", (_req: Request, res: Response): void => {
  res.json(productService.getAll());
});

// GET /products/:id - Retorna um produto pelo ID
app.get("/products/:id", (req: Request, res: Response): void => {
  const id: number = parseId(req.params.id);
  res.json(productService.getById(id));
});

// POST /products - Adiciona um novo produto (id gerado pela aplicação)
app.post("/products", (req: Request, res: Response): void => {
  const product = productService.create(req.body);
  res.status(201).json(product);
});

// PUT /products/:id - Atualiza um produto existente (atualização parcial)
app.put("/products/:id", (req: Request, res: Response): void => {
  const id: number = parseId(req.params.id);
  const updated = productService.update(id, req.body);
  res.json(updated);
});

// DELETE /products/:id - Remove um produto (204 não possui corpo)
app.delete("/products/:id", (req: Request, res: Response): void => {
  const id: number = parseId(req.params.id);
  productService.delete(id);
  res.status(204).end();
});

// ========== MIDDLEWARE DE ERRO (REGISTRADO DEPOIS DAS ROTAS) ==========

app.use(errorMiddleware);

// ========== INICIAR SERVIDOR ==========

app.listen(PORT, (): void => {
  console.log(`\n========== EXERCÍCIO 10: API REST + ProductService ==========`);
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`\nRotas disponíveis:`);
  console.log(`  GET    http://localhost:${PORT}/products`);
  console.log(`  GET    http://localhost:${PORT}/products/:id`);
  console.log(`  POST   http://localhost:${PORT}/products`);
  console.log(`  PUT    http://localhost:${PORT}/products/:id`);
  console.log(`  DELETE http://localhost:${PORT}/products/:id`);
  console.log("=======================================================================\n");
});