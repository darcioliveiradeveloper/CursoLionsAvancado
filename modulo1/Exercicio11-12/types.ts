// Exercícios 11 e 12: RequestHandler e Repository.
// Contratos de dados e os corpos/parâmetros usados pelas rotas.

export interface IUser {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  categories: string[];
}

// ========== CONTRATOS DAS ROTAS (RequestHandler) ==========

// Params: parâmetros presentes na URL (/users/:id)
export type IdParams = { id: string };

// Rotas sem params ou sem query usam tipos vazios explícitos.
export type EmptyParams = Record<string, never>;
export type EmptyQuery = Record<string, never>;

// ReqBody: corpo recebido nas criações/atualizações
export type CreateUserBody = { name: string; email: string; isActive: boolean };
export type UpdateUserBody = Partial<CreateUserBody>;

export type CreateProductBody = { name: string; price: number; inStock: boolean; categories: string[] };
export type UpdateProductBody = Partial<CreateProductBody>;

// ResBody: formato de sucesso das respostas
export type DeleteUserResponse = { message: string; user: IUser };