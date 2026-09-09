import express from "express";
import type { RequestHandler } from "express";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { AppError } from "./errors/app.error.js";
import { UserRepository } from "./repositories/user.repository.js";
import { ProductRepository } from "./repositories/product.repository.js";
import { UserService } from "./services/user.service.js";
import { ProductService } from "./services/product.service.js";
import type { IUser, IProduct, CreateUserBody, UpdateUserBody, CreateProductBody, UpdateProductBody, IdParams, DeleteUserResponse, EmptyParams, EmptyQuery } from "./types.js";

// ========== EXERCÍCIOS 11 e 12: RequestHandler e Repository ==========

const app = express();
const PORT: number = 3000;

app.use(express.json());
app.use(loggerMiddleware);

// ========== COMPOSIÇÃO DAS DEPENDÊNCIAS ==========
// Repositórios são criados UMA vez na inicialização (nunca por requisição)
// e injetados nos serviços via construtor.

const userRepository = new UserRepository();
const productRepository = new ProductRepository();
const userService = new UserService(userRepository);
const productService = new ProductService(productRepository);

// ========== HELPER ==========

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

// ========== ROTAS TIPADAS COM RequestHandler ==========
// RequestHandler<Params, ResBody, ReqBody, Query> descreve o contrato completo
// da entrada e da resposta. A ordem importa: Params, ResBody, ReqBody, Query.

// --- USUÁRIOS ---

const getUsersHandler: RequestHandler<EmptyParams, IUser[], void, EmptyQuery> = async (_req, res) => {
  res.json(await userService.getAll());
};

const getUserHandler: RequestHandler<IdParams, IUser, void, EmptyQuery> = async (req, res) => {
  res.json(await userService.getById(parseId(req.params.id)));
};

const createUserHandler: RequestHandler<EmptyParams, IUser, CreateUserBody, EmptyQuery> = async (req, res) => {
  res.status(201).json(await userService.create(req.body));
};

const updateUserHandler: RequestHandler<IdParams, IUser, UpdateUserBody, EmptyQuery> = async (req, res) => {
  res.json(await userService.update(parseId(req.params.id), req.body));
};

const deleteUserHandler: RequestHandler<IdParams, DeleteUserResponse, void, EmptyQuery> = async (req, res) => {
  const removed: IUser = await userService.delete(parseId(req.params.id));
  res.json({ message: "Usuário removido com sucesso", user: removed });
};

// --- PRODUTOS ---

const getProductsHandler: RequestHandler<EmptyParams, IProduct[], void, EmptyQuery> = async (_req, res) => {
  res.json(await productService.getAll());
};

const getProductHandler: RequestHandler<IdParams, IProduct, void, EmptyQuery> = async (req, res) => {
  res.json(await productService.getById(parseId(req.params.id)));
};

const createProductHandler: RequestHandler<EmptyParams, IProduct, CreateProductBody, EmptyQuery> = async (req, res) => {
  res.status(201).json(await productService.create(req.body));
};

const updateProductHandler: RequestHandler<IdParams, IProduct, UpdateProductBody, EmptyQuery> = async (req, res) => {
  res.json(await productService.update(parseId(req.params.id), req.body));
};

const deleteProductHandler: RequestHandler<IdParams, void, void, EmptyQuery> = async (req, res) => {
  await productService.delete(parseId(req.params.id));
  res.status(204).end();
};

// ========== REGISTRO DAS ROTAS ==========

app.get("/users", getUsersHandler);
app.get("/users/:id", getUserHandler);
app.post("/users", createUserHandler);
app.put("/users/:id", updateUserHandler);
app.delete("/users/:id", deleteUserHandler);

app.get("/products", getProductsHandler);
app.get("/products/:id", getProductHandler);
app.post("/products", createProductHandler);
app.put("/products/:id", updateProductHandler);
app.delete("/products/:id", deleteProductHandler);

// ========== MIDDLEWARE DE ERRO (REGISTRADO DEPOIS DAS ROTAS) ==========
// Em Express 5, rejeições de handlers async chegam automaticamente aqui.

app.use(errorMiddleware);

// ========== INICIAR SERVIDOR ==========

app.listen(PORT, (): void => {
  console.log(`\n========== EXERCÍCIOS 11 e 12: RequestHandler + Repository ==========`);
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`\nRotas disponíveis:`);
  console.log(`  GET    http://localhost:${PORT}/users`);
  console.log(`  GET    http://localhost:${PORT}/users/:id`);
  console.log(`  POST   http://localhost:${PORT}/users`);
  console.log(`  PUT    http://localhost:${PORT}/users/:id`);
  console.log(`  DELETE http://localhost:${PORT}/users/:id`);
  console.log(`  GET    http://localhost:${PORT}/products`);
  console.log(`  GET    http://localhost:${PORT}/products/:id`);
  console.log(`  POST   http://localhost:${PORT}/products`);
  console.log(`  PUT    http://localhost:${PORT}/products/:id`);
  console.log(`  DELETE http://localhost:${PORT}/products/:id`);
  console.log("=======================================================================\n");
});
