import type { IUser, IProduct, IAdminUser } from "./types.js";

/*
Exercício 1.1: Setup Inicial
Objetivo: Criar um projeto com:
● TypeScript instalado
● tsconfig configurado
● src/index.ts imprimindo "Olá, TS!"
● Rodar com npm run dev
*/

console.log("\n========== EXERCÍCIO 1.1: Setup Inicial ==========");
console.log('✓ src/index.ts imprimindo "Olá, TS!"');
console.log("✓ Rodar com npm run dev");
console.log("===================================================\n");

const message: string = "Olá, TS!";
console.log(message);

console.log("\n===================================================\n");

/*
Exercício 1.2: Configurar ESLint
Objetivo:
● Instalar e configurar o ESLint no projeto
● Criar um erro de lint proposital (ex: variável não usada)
● Corrigir com base no feedback
*/

console.log("\n========== EXERCÍCIO 1.2: Configurar ESLint ==========");
console.log("✓ ESLint instalado e configurado");
console.log("✓ Erro proposital criado e corrigido");
console.log("=====================================================\n");

/*
Exercício 2.1: Tipos Primitivos e Estruturados
Objetivo: Declarar variáveis com tipos primitivos e estruturados:
● String para nome do produto
● Number para preço do produto
● Boolean indicando estoque
● Array de strings para categorias
● Tupla para coordenadas (latitude e longitude)
● Enum para status de pedido
*/

const nomeProdutoLocal: string = "Teclado Mecânico";
const precoProdutoLocal: number = 450.99;
const emEstoqueLocal: boolean = true;
const categoriasLocal: string[] = ["Eletrônicos", "Periféricos", "Informática"];
const coordenadasLocal: [number, number] = [-23.5505, -46.6333];

enum StatusPedidoLocal {
  Pendente = "Pendente",
  Processando = "Processando",
  Entregue = "Entregue",
  Cancelado = "Cancelado",
}

console.log("\n========== EXERCÍCIO 2.1: Tipos Primitivos e Estruturados ==========");
console.log(`Nome: ${nomeProdutoLocal}`);
console.log(`Preço: R$ ${precoProdutoLocal}`);
console.log(`Em Estoque: ${emEstoqueLocal ? "Sim" : "Não"}`);
console.log(`Categorias: ${categoriasLocal.join(", ")}`);
console.log(`Coordenadas: Lat ${coordenadasLocal[0]}, Long ${coordenadasLocal[1]}`);
console.log(`Status de Pedido: ${StatusPedidoLocal.Entregue}`);
console.log("=====================================================================\n");

/*
Exercício 2.2: Função Tipada
Objetivo: Criar funções com tipagem adequada nos parâmetros e no retorno.
📝 Especificações:
● Crie a função saudar com parâmetros nome (string) e idade (number)
● Tipar o retorno da função como string
● Crie uma função formatarProduto que receba nome e preço
*/

function saudar(nome: string, idade: number): string {
  return `Bem-vindo, ${nome}! Você tem ${idade} anos.`;
}

function formatarProdutoLocal(nome: string, preco: number): string {
  return `O produto ${nome} custa R$ ${preco.toFixed(2)}`;
}

const resultadoSaudacao: string = saudar("Darci", 25);
const resultadoFormatado: string = formatarProdutoLocal("Mouse", 89.9);

console.log("\n========== EXERCÍCIO 2.2: Função Tipada ==========");
console.log("✓ Parâmetros e retorno tipados");
console.log("\nMensagem de boas-vindas:");
console.log(resultadoSaudacao);
console.log("\nProduto formatado:");
console.log(resultadoFormatado);
console.log("===================================================\n");

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

/*
Exercício 4.1: Generics
Objetivo: Criar funções genéricas reutilizáveis.
📝 Especificações:
● Crie getData<T>(items: T[]): T[] que recebe um array e retorna o mesmo array
● Crie getById<T extends { id: number }>(items: T[], id: number): T | undefined
● Demonstre com arrays de strings, numbers e objetos IUser/IProduct
*/

function getData<T>(items: T[]): T[] {
  return items;
}

function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

const nomesGenericos: string[] = getData(["Alice", "Bob", "Charlie"]);
const numerosGenericos: number[] = getData([10, 20, 30]);
const usuariosGenericos: IUser[] = getData([
  { id: 1, name: "Ana", email: "ana@example.com", isActive: true },
  { id: 2, name: "Bruno", email: "bruno@example.com", isActive: false },
]);

const usuarioEncontrado: IUser | undefined = getById(usuariosGenericos, 1);
const produtoEncontrado: IProduct | undefined = getById(
  [
    { id: 101, name: "Notebook", price: 3500, inStock: true, categories: ["TI"] },
    { id: 102, name: "Mouse", price: 80, inStock: false, categories: ["Periféricos"] },
  ],
  102,
);

console.log("\n========== EXERCÍCIO 4.1: Generics ==========");

console.log("\n--- getData<T> ---");
console.log("Strings:", nomesGenericos);
console.log("Numbers:", numerosGenericos);
console.log("Usuarios:", usuariosGenericos);

console.log("\n--- getById<T> ---");
if (usuarioEncontrado) {
  console.log(`Usuário encontrado: ${usuarioEncontrado.name} (${usuarioEncontrado.email})`);
}
if (produtoEncontrado) {
  console.log(`Produto encontrado: ${produtoEncontrado.name} - R$ ${produtoEncontrado.price}`);
}

const inexistente: IUser | undefined = getById(usuariosGenericos, 999);
console.log(`Busca inexistente: ${inexistente === undefined ? "undefined" : inexistente}`);
console.log("================================================\n");
