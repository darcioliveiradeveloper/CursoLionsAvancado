import express from "express";
import type { Request, Response } from "express";
import type { IUser } from "./types.js";

// ========== EXERCÍCIO 5.1: API REST BÁSICA COM EXPRESS E TYPESCRIPT ==========

const app = express();
const PORT: number = 3000;

app.use(express.json());

// ========== DADOS EM MEMÓRIA ==========

const users: IUser[] = [
  { id: 1, name: "João Silva", email: "joao@example.com", isActive: true },
  { id: 2, name: "Maria Santos", email: "maria@example.com", isActive: true },
  { id: 3, name: "Pedro Oliveira", email: "pedro@example.com", isActive: false },
];

// ========== HELPER: VALIDAR IUser ==========

function isValidUser(body: Record<string, unknown>): body is Omit<IUser, "id"> {
  return (
    typeof body.name === "string" &&
    typeof body.email === "string" &&
    typeof body.isActive === "boolean"
  );
}

// ========== ROTAS ==========

// GET /users - Retorna todos os usuários
app.get("/users", (_req: Request, res: Response): void => {
  res.json(users);
});

// GET /users/:id - Retorna um usuário pelo ID
app.get("/users/:id", (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const user: IUser | undefined = users.find((u) => u.id === id);

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

  const maxId: number = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
  const newUser: IUser = {
    id: maxId + 1,
    name: req.body.name,
    email: req.body.email,
    isActive: req.body.isActive,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id - Atualiza um usuário existente
app.put("/users/:id", (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const index: number = users.findIndex((u) => u.id === id);

  if (index === -1) {
    res.status(404).json({ error: `Usuário com id ${id} não encontrado` });
    return;
  }

  if (!isValidUser(req.body)) {
    res.status(400).json({
      error: "Dados inválidos. Envie: { name: string, email: string, isActive: boolean }",
    });
    return;
  }

  users[index] = {
    id,
    name: req.body.name,
    email: req.body.email,
    isActive: req.body.isActive,
  };

  res.json(users[index]);
});

// DELETE /users/:id - Remove um usuário
app.delete("/users/:id", (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const index: number = users.findIndex((u) => u.id === id);

  if (index === -1) {
    res.status(404).json({ error: `Usuário com id ${id} não encontrado` });
    return;
  }

  const deleted: IUser = users.splice(index, 1)[0]!;
  res.json({ message: "Usuário removido com sucesso", user: deleted });
});

// ========== INICIAR SERVIDOR ==========

app.listen(PORT, (): void => {
  console.log(`\n========== EXERCÍCIO 5.1: API REST com Express + TypeScript ==========`);
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`\nRotas disponíveis:`);
  console.log(`  GET    http://localhost:${PORT}/users`);
  console.log(`  GET    http://localhost:${PORT}/users/:id`);
  console.log(`  POST   http://localhost:${PORT}/users`);
  console.log(`  PUT    http://localhost:${PORT}/users/:id`);
  console.log(`  DELETE http://localhost:${PORT}/users/:id`);
  console.log("=======================================================================\n");
});
