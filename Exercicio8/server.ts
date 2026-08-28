import express from "express";
import type { Request, Response } from "express";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { UserService } from "./services/user.service.js";
import type { IUser } from "./types.js";

// ========== EXERCÍCIO 8: API REST + Middleware + UserService ==========

const app = express();
const PORT: number = 3000;

app.use(express.json());
app.use(loggerMiddleware);

const userService = new UserService();

// ========== HELPER: VALIDAR IUser ==========

function isValidUser(body: Record<string, unknown>): body is Omit<IUser, "id"> {
  return (
    typeof body.name === "string" &&
    typeof body.email === "string" &&
    typeof body.isActive === "boolean"
  );
}

// Valida corpo de atualização parcial: aceita um ou mais campos de IUser
// (ex: somente name, somente email, etc.) — tipos corretos quando presentes.
function isValidPartialUser(body: Record<string, unknown>): body is Partial<IUser> {
  const hasName: boolean = "name" in body && typeof body.name === "string";
  const hasEmail: boolean = "email" in body && typeof body.email === "string";
  const hasIsActive: boolean = "isActive" in body && typeof body.isActive === "boolean";

  const allFieldsValid: boolean =
    (!("name" in body) || hasName) &&
    (!("email" in body) || hasEmail) &&
    (!("isActive" in body) || hasIsActive);

  return allFieldsValid && (hasName || hasEmail || hasIsActive);
}

// ========== ROTAS ==========

// GET /users - Retorna todos os usuários
app.get("/users", (_req: Request, res: Response): void => {
  res.json(userService.getAll());
});

// GET /users/:id - Retorna um usuário pelo ID
app.get("/users/:id", (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const user: IUser | undefined = userService.getById(id);

  if (!user) {
    res.status(404).json({ error: `Usuário com id ${id} não encontrado` });
    return;
  }

  res.json(user);
});

// POST /users - Adiciona um novo usuário
app.post("/users", (req: Request, res: Response): void => {
  if (!isValidUser(req.body)) {
    res.status(400).json({
      error: "Dados inválidos. Envie: { name: string, email: string, isActive: boolean }",
    });
    return;
  }

  const newUser: IUser = userService.create(req.body);
  res.status(201).json(newUser);
});

// PUT /users/:id - Atualiza um usuário existente (aceita atualização parcial)
app.put("/users/:id", (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);

  if (!isValidPartialUser(req.body)) {
    res.status(400).json({
      error: "Dados inválidos. Envie ao menos um campo: { name?, email?, isActive? }",
    });
    return;
  }

  const updated: IUser | undefined = userService.update(id, req.body);

  if (!updated) {
    res.status(404).json({ error: `Usuário com id ${id} não encontrado` });
    return;
  }

  res.json(updated);
});

// DELETE /users/:id - Remove um usuário
app.delete("/users/:id", (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const deleted: IUser | undefined = userService.delete(id);

  if (!deleted) {
    res.status(404).json({ error: `Usuário com id ${id} não encontrado` });
    return;
  }

  res.json({ message: "Usuário removido com sucesso", user: deleted });
});

// ========== INICIAR SERVIDOR ==========

app.listen(PORT, (): void => {
  console.log(`\n========== EXERCÍCIO 8: API REST + Middleware + UserService ==========`);
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`\nRotas disponíveis:`);
  console.log(`  GET    http://localhost:${PORT}/users`);
  console.log(`  GET    http://localhost:${PORT}/users/:id`);
  console.log(`  POST   http://localhost:${PORT}/users`);
  console.log(`  PUT    http://localhost:${PORT}/users/:id`);
  console.log(`  DELETE http://localhost:${PORT}/users/:id`);
  console.log("=======================================================================\n");
});