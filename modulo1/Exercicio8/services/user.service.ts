import type { IUser } from "../types.js";

// ========== EXERCÍCIO 8: CLASSE UserService ==========
// Responsabilidade: conhecer o array e manipular usuários.
// A rota continua responsável pelos detalhes HTTP (req, res, status).

const initialUsers: IUser[] = [
  { id: 1, name: "João Silva", email: "joao@example.com", isActive: true },
  { id: 2, name: "Maria Santos", email: "maria@example.com", isActive: true },
  { id: 3, name: "Pedro Oliveira", email: "pedro@example.com", isActive: false },
];

export class UserService {
  private users: IUser[] = [...initialUsers];

  getAll(): IUser[] {
    return this.users;
  }

  getById(id: number): IUser | undefined {
    return this.users.find((u) => u.id === id);
  }

  create(user: Omit<IUser, "id">): IUser {
    const maxId: number =
      this.users.length > 0 ? Math.max(...this.users.map((u) => u.id)) : 0;
    const newUser: IUser = { id: maxId + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, data: Partial<IUser>): IUser | undefined {
    const index: number = this.users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;

    const current: IUser = this.users[index]!;
    const updated: IUser = { ...current, ...data, id };
    this.users[index] = updated;
    return updated;
  }

  delete(id: number): IUser | undefined {
    const index: number = this.users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;

    return this.users.splice(index, 1)[0];
  }
}