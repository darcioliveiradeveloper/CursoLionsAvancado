# 📚 Exercícios de TypeScript Avançado

## 📝 Sumário

- [Exercício 1: Setup Inicial](#exercício-1-setup-inicial)
- [Exercício 2: Configurar ESLint](#exercício-2-configurar-eslint)
- [Exercício 3: Função Tipada](#exercício-3-função-tipada)
- [Exercício 4: Interface e Objeto](#exercício-4-interface-e-objeto)
- [Exercício 5: Tipos Primitivos e Estruturados](#exercício-5-tipos-primitivos-e-estruturados)
- [Exercício 6: Interfaces e Tipos Personalizados](#exercício-6-interfaces-e-tipos-personalizados)

---

## Exercício 1: Setup Inicial

### Objetivo

Criar um projeto com:

- ✅ TypeScript instalado
- ✅ tsconfig configurado
- ✅ src/index.ts imprimindo "Olá, TS!"
- ✅ Rodar com `npm run dev`

### Implementação

```bash
npm init -y
npm install -D typescript ts-node
npx tsc --init
```

### Código

```typescript
const message: string = "Olá, TS!";
console.log(message);
```

### Resultado

```
Olá, TS!
```

---

## Exercício 2: Configurar ESLint

### Objetivo

- ✅ Instalar e configurar o ESLint no projeto
- ✅ Criar um erro de lint proposital (ex: variável não usada)
- ✅ Corrigir com base no feedback

### Instalação

```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --legacy-peer-deps
npx eslint --init
```

### Configuração

- ESLint detecta erros de qualidade do código
- Arquivo: `eslint.config.mts`
- Suporte a TypeScript habilitado

### Exemplo de Erro Detectado

```
'unusedVariable' is assigned a value but never used @typescript-eslint/no-unused-vars
```

### Como Corrigir

- Remover variáveis não usadas
- Usar `eslint --fix` para correção automática

---

## Exercício 3: Função Tipada

### Objetivo

Criar uma função que receba nome e idade e retorne uma mensagem de boas-vindas, com tipagem adequada nos parâmetros e no retorno.

### Especificações

- ✅ Crie a função `saudar`
- ✅ Tipar os parâmetros: `nome` (string) e `idade` (number)
- ✅ Tipar o retorno da função como string

### Código

```typescript
function saudar(nome: string, idade: number): string {
  return `Bem-vindo, ${nome}! Você tem ${idade} anos.`;
}

const resultado: string = saudar("Darci", 25);
console.log(resultado);
```

### Resultado

```
Bem-vindo, Darci! Você tem 25 anos.
```

---

## Exercício 4: Interface e Objeto

### Objetivo

Criar uma interface para um produto e instanciar um objeto com base nela.

### Especificações

- ✅ Defina a interface `Produto` com:
  - `nome` (string)
  - `preco` (number)
  - `emEstoque` (boolean)
- ✅ Crie uma variável `meuProduto` do tipo `Produto` e atribua um valor

### Código

```typescript
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
```

### Resultado

```
Dados do Produto:
Nome: Notebook
Preço: R$ 3500
Em Estoque: Sim
```

---

## Exercício 5: Tipos Primitivos e Estruturados

### Objetivo

Declarar variáveis com tipos primitivos e estruturados, incluindo array, tupla e enum.

### Especificações

- ✅ String para nome do produto
- ✅ Number para preço do produto
- ✅ Boolean indicando se está em estoque
- ✅ Array de strings para categorias
- ✅ Tupla para coordenadas (latitude e longitude)
- ✅ Enum para status de pedido
- ✅ Função que aceite esses tipos como parâmetros

### Código

#### Tipos Primitivos

```typescript
const nomeProduto: string = "Teclado Mecânico";
const precoProduto: number = 450.99;
const emEstoque5: boolean = true;
```

#### Array

```typescript
const categoriasProduto: string[] = [
  "Eletrônicos",
  "Periféricos",
  "Informática",
];
```

#### Tupla

```typescript
const coordenadas: [number, number] = [-23.5505, -46.6333];
```

#### Enum

```typescript
enum StatusPedido {
  Pendente = "Pendente",
  Processando = "Processando",
  Entregue = "Entregue",
  Cancelado = "Cancelado",
}
```

#### Função Tipada

```typescript
function formatarProduto(nome: string, preco: number): string {
  return `O produto ${nome} custa R$ ${preco.toFixed(2)}`;
}
```

### Resultado

```
Dados Tipados:
Nome: Teclado Mecânico
Preço: R$ 450.99
Em Estoque: Sim
Categorias: Eletrônicos, Periféricos, Informática
Coordenadas: Lat -23.5505, Long -46.6333
Status de Pedido (exemplo): Entregue
Mensagem Formatada: O produto Teclado Mecânico custa R$ 450.99
```

---

## Exercício 6: Interfaces e Tipos Personalizados

### Objetivo

Criar interfaces avançadas com tipos personalizados e herança de interfaces.

### Especificações

- ✅ Interface `IUser` com: `id` (number), `name` (string), `email` (string), `isActive` (boolean)
- ✅ Interface `IProduct` com: `id` (number), `name` (string), `price` (number), `inStock` (boolean), `categories` (array de strings)
- ✅ Type Alias `UserRole` que possa ser `'admin'` ou `'user'`
- ✅ Interface `IAdminUser` que estenda `IUser` e adicione `role` do tipo `UserRole`
- ✅ Instâncias de `IUser`, `IProduct` e `IAdminUser`
- ✅ Funções que recebem objetos tipados e imprimem informações

### Código

#### Type Alias

```typescript
type UserRole = "admin" | "user";
```

#### Interfaces

```typescript
interface IUser {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

interface IProduct {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  categories: string[];
}

interface IAdminUser extends IUser {
  role: UserRole;
}
```

#### Funções

```typescript
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
```

#### Instâncias

```typescript
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
```

### Resultado

```
--- Informações do Usuário Comum ---
ID: 1
Nome: João Silva
Email: joao@example.com
Ativo: Sim

--- Informações do Produto ---
ID: 101
Nome: Notebook Dell
Preço: R$ 3500
Em Estoque: Sim
Categorias: Eletrônicos, Computadores, Notebooks

--- Informações do Usuário Admin ---
ID: 2
Nome: Maria Santos
Email: maria@admin.com
Ativo: Sim
Role: admin
```

---

## 🎯 Conceitos Abordados

| Exercício | Conceitos                                        |
| --------- | ------------------------------------------------ |
| 1         | Setup TypeScript, npm scripts                    |
| 2         | ESLint, linting, qualidade de código             |
| 3         | Funções tipadas, parâmetros e retorno            |
| 4         | Interfaces, objetos, instanciação                |
| 5         | Tipos primitivos, arrays, tuplas, enums          |
| 6         | Herança de interfaces, type aliases, union types |

---

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Rodar o projeto
npm run dev

# Verificar qualidade do código
npx eslint src/

# Corrigir automaticamente
npx eslint src/ --fix

# Compilar TypeScript
npm run build
```

---

## 📂 Estrutura do Projeto

```
Inicio/
├── src/
│   ├── index.ts          (Arquivo principal com os 6 exercícios)
│   └── data.ts           (Arquivo de dados reutilizáveis)
├── dist/                 (Compilado JavaScript)
├── node_modules/
├── package.json
├── tsconfig.json
├── eslint.config.mts
└── EXERCICIOS.md         (Este arquivo)
```

---

## ✅ Status

- ✅ Exercício 1: Completo
- ✅ Exercício 2: Completo
- ✅ Exercício 3: Completo
- ✅ Exercício 4: Completo
- ✅ Exercício 5: Completo
- ✅ Exercício 6: Completo
- ⏳ Exercício 7: Aguardando

---

**Criado em:** 2026-08-18  
**Versão TypeScript:** 6.0.3  
**Versão ESLint:** 10.8.1
