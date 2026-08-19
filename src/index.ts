/*
Exercicio 1:
Objetivo: Criar um projeto com:
● TypeScript instalado
● tsconfig configurado
● src/index.ts imprimindo "Olá, TS!"
● Rodar com npm run dev
*/

console.log("\n========== EXERCICIO 1 ==========");
console.log("✓ TypeScript instalado");
console.log("✓ tsconfig configurado");
console.log('✓ src/index.ts imprimindo "Olá, TS!"');
console.log("✓ Rodar com npm run dev");
console.log("================================\n");

const message: string = "Olá, TS!";
console.log(message);

console.log("\n================================\n");

/*
Exercicio 2:
Objetivo: Configurar ESLint
● Instalar e configurar o ESLint no projeto
● Criar um erro de lint proposital (ex: variável não usada)
● Corrigir com base no feedback
*/

console.log("\n========== EXERCICIO 2 ==========");
console.log("✓ ESLint instalado");
console.log("✓ ESLint configurado");
console.log("✓ Erro proposital criado: variável não usada");
console.log("✓ Erro corrigido!");
console.log("================================\n");

/*
Exercicio 3:
Objetivo: Função Tipada
Criar uma função que receba nome e idade e retorne uma
mensagem de boas-vindas, com tipagem adequada nos parâmetros
e no retorno.
📝 Especificações:
● Crie a função saudar
● Tipar os parâmetros nome (string) e idade (number)
● Tipar o retorno da função como string
*/

function saudar(nome: string, idade: number): string {
  return `Bem-vindo, ${nome}! Você tem ${idade} anos.`;
}

const resultado: string = saudar("Darci", 25);

console.log("\n========== EXERCICIO 3 ==========");
console.log("✓ Função saudar criada");
console.log("✓ Parâmetro nome tipado como string");
console.log("✓ Parâmetro idade tipado como number");
console.log("✓ Retorno da função tipado como string");
console.log("\nMensagem de boas-vindas:");
console.log(resultado);
console.log("================================\n");

/*
Exercicio 4:
Objetivo: Interface e Objeto
Criar uma interface para um produto e instanciar um objeto com base nela.
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

console.log("\n========== EXERCICIO 4 ==========");
console.log("✓ Interface Produto criada");
console.log("✓ Propriedade nome (string) definida");
console.log("✓ Propriedade preco (number) definida");
console.log("✓ Propriedade emEstoque (boolean) definida");
console.log("✓ Variável meuProduto instanciada");
console.log("\nDados do Produto:");
console.log(`Nome: ${meuProduto.nome}`);
console.log(`Preço: R$ ${meuProduto.preco}`);
console.log(`Em Estoque: ${meuProduto.emEstoque ? "Sim" : "Não"}`);
console.log("================================\n");

/*
Exercicio 5:
Objetivo: Tipos Primitivos e Estruturados
Declarar variáveis com tipos primitivos e estruturados:
● String para nome do produto
● Number para preço do produto
● Boolean indicando estoque
● Array de strings para categorias
● Tupla para coordenadas (latitude e longitude)
● Enum para status de pedido
● Função que aceite esses tipos como parâmetros
*/

// ========== TIPOS PRIMITIVOS ==========

// String para nome do produto
const nomeProduto: string = "Teclado Mecânico";

// Number para preço do produto
const precoProduto: number = 450.99;

// Boolean indicando se está em estoque
const emEstoque5: boolean = true;

// Array de strings para categorias
const categoriasProduto: string[] = [
  "Eletrônicos",
  "Periféricos",
  "Informática",
];

// Tupla para coordenadas (latitude, longitude)
const coordenadas: [number, number] = [-23.5505, -46.6333];

// ========== ENUM PARA STATUS DE PEDIDO ==========
enum StatusPedido {
  Pendente = "Pendente",
  Processando = "Processando",
  Entregue = "Entregue",
  Cancelado = "Cancelado",
}

// ========== FUNÇÃO COM TIPOS ==========
function formatarProduto(nome: string, preco: number): string {
  return `O produto ${nome} custa R$ ${preco.toFixed(2)}`;
}

// Usar as variáveis e a função
const descricaoProduto: string = formatarProduto(nomeProduto, precoProduto);

console.log("\n========== EXERCICIO 5 ==========");
console.log("✓ String (nome do produto) declarada");
console.log("✓ Number (preço) declarado");
console.log("✓ Boolean (emEstoque) declarado");
console.log("✓ Array de strings (categorias) declarado");
console.log("✓ Tupla (coordenadas) declarada");
console.log("✓ Enum (StatusPedido) declarado");
console.log("✓ Função com tipagem criada");
console.log("\nDados Tipados:");
console.log(`Nome: ${nomeProduto}`);
console.log(`Preço: R$ ${precoProduto}`);
console.log(`Em Estoque: ${emEstoque5 ? "Sim" : "Não"}`);
console.log(`Categorias: ${categoriasProduto.join(", ")}`);
console.log(`Coordenadas: Lat ${coordenadas[0]}, Long ${coordenadas[1]}`);
console.log(`Status de Pedido (exemplo): ${StatusPedido.Entregue}`);
console.log(`\nMensagem Formatada: ${descricaoProduto}`);
console.log("================================\n");

/*
Exercicio 6:
Objetivo: Interfaces e Tipos Personalizados
● Criar interface IUser
● Criar interface IProduct
● Criar Type Alias UserRole
● Criar interface IAdminUser que estende IUser
● Criar instâncias de cada tipo
● Criar funções para imprimir informações
*/

// ========== TYPE ALIAS ==========
type UserRole = "admin" | "user";

// ========== INTERFACES ==========

// Interface para usuário comum
interface IUser {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Interface para produto
interface IProduct {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  categories: string[];
}

// Interface que estende IUser
interface IAdminUser extends IUser {
  role: UserRole;
}

// ========== FUNÇÕES PARA IMPRIMIR ==========

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

// ========== INSTÂNCIAS ==========

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

console.log("\n========== EXERCICIO 6 ==========");
console.log("✓ Interface IUser criada");
console.log("✓ Interface IProduct criada");
console.log("✓ Type Alias UserRole criado");
console.log("✓ Interface IAdminUser criada (estende IUser)");
console.log("✓ Instâncias criadas");
console.log("✓ Funções de impressão criadas");

console.log("\n--- Informações do Usuário Comum ---");
imprimirUsuario(usuario);

console.log("\n--- Informações do Produto ---");
imprimirProduto(produto);

console.log("\n--- Informações do Usuário Admin ---");
imprimirUsuario(adminUser);
console.log(`Role: ${adminUser.role}`);

console.log("\n================================\n");
