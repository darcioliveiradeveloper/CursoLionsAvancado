import type { IUser, IProduct, IAdminUser } from "./types.js";

/*
Exercício 3.1: Interface e Objeto
Objetivo: Criar uma interface para um produto e instanciar um objeto com base nela.
📝 Especificações:
● Defina a interface Produto com:
  ○ nome (string)
  ○ preco (number)
  ○ emEstoque (boolean)
● Crie uma variável meuProduto do tipo Produto e atribua um valor
*/

interface Produto {
  nome: string;
  preco: number;
  emEstoque: boolean;
}

const meuProduto: Produto = {
  nome: "Notebook",
  preco: 3500.0,
  emEstoque: true,
};

console.log("\n========== EXERCÍCIO 3.1: Interface e Objeto ==========");
console.log("\nDados do Produto:");
console.log(`Nome: ${meuProduto.nome}`);
console.log(`Preço: R$ ${meuProduto.preco}`);
console.log(`Em Estoque: ${meuProduto.emEstoque ? "Sim" : "Não"}`);
console.log("=======================================================\n");

/*
Exercício 3.2: Interfaces e Tipos Personalizados
Objetivo: Criar interfaces avançadas com tipos personalizados e herança.
📝 Especificações:
● Interface IUser com: id, name, email, isActive
● Interface IProduct com: id, name, price, inStock, categories
● Type Alias UserRole ('admin' | 'user')
● Interface IAdminUser que estende IUser e adiciona role
● Funções que recebem objetos tipados e imprimem informações
*/

function imprimirUsuario(user: IUser): void {
  console.log(`ID: ${user.id}`);
  console.log(`Nome: ${user.name}`);
  console.log(`Email: ${user.email}`);
  console.log(`Ativo: ${user.isActive ? "Sim" : "Não"}`);
}

function imprimirProduto(produto: IProduct): void {
  console.log(`ID: ${produto.id}`);
  console.log(`Nome: ${produto.name}`);
  console.log(`Preço: R$ ${produto.price}`);
  console.log(`Em Estoque: ${produto.inStock ? "Sim" : "Não"}`);
  console.log(`Categorias: ${produto.categories.join(", ")}`);
}

const usuario: IUser = {
  id: 1,
  name: "João Silva",
  email: "joao@example.com",
  isActive: true,
};

const produto: IProduct = {
  id: 101,
  name: "Notebook Dell",
  price: 3500.0,
  inStock: true,
  categories: ["Eletrônicos", "Computadores", "Notebooks"],
};

const adminUser: IAdminUser = {
  id: 2,
  name: "Maria Santos",
  email: "maria@admin.com",
  isActive: true,
  role: "admin",
};

console.log("\n========== EXERCÍCIO 3.2: Interfaces e Tipos Personalizados ==========");

console.log("\n--- Usuário Comum ---");
imprimirUsuario(usuario);

console.log("\n--- Produto ---");
imprimirProduto(produto);

console.log("\n--- Usuário Admin ---");
imprimirUsuario(adminUser);
console.log(`Role: ${adminUser.role}`);
console.log("========================================================================\n");
