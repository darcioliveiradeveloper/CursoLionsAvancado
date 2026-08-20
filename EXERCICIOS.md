# Exercícios de TypeScript Avançado

## Sumário

- [Exercício 1.1: Setup Inicial](#exercício-11-setup-inicial)
- [Exercício 1.2: Configurar ESLint](#exercício-12-configurar-eslint)
- [Exercício 2.1: Tipos Primitivos e Estruturados](#exercício-21-tipos-primitivos-e-estruturados)
- [Exercício 2.2: Função Tipada](#exercício-22-função-tipada)
- [Exercício 3.1: Interface e Objeto](#exercício-31-interface-e-objeto)
- [Exercício 3.2: Interfaces e Tipos Personalizados](#exercício-32-interfaces-e-tipos-personalizados)
- [Exercício 4.1: Generics](#exercício-41-generics)
- [Exercício 5.1: API REST com Express](#exercício-51-api-rest-com-express)

---

## Exercício 1.1: Setup Inicial

### Objetivo

Criar um projeto com:

- TypeScript instalado
- tsconfig configurado
- src/index.ts imprimindo "Olá, TS!"
- Rodar com `npm run dev`

### Implementacao

```bash
npm init -y
npm install -D typescript tsx
npx tsc --init
```

### Codigo

```typescript
const message: string = "Olá, TS!";
console.log(message);
```

### Resultado

```
Olá, TS!
```

---

## Exercício 1.2: Configurar ESLint

### Objetivo

- Instalar e configurar o ESLint no projeto
- Criar um erro de lint proposital (ex: variavel nao usada)
- Corrigir com base no feedback

### Instalacao

```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Configuracao

- ESLint detecta erros de qualidade do codigo
- Arquivo: `eslint.config.mts`
- Suporte a TypeScript habilitado

### Exemplo de Erro Detectado

```
'unusedVariable' is assigned a value but never used @typescript-eslint/no-unused-vars
```

### Como Corrigir

- Remover variaveis nao usadas
- Usar `npx eslint src/ --fix` para correcao automatica

---

## Exercício 2.1: Tipos Primitivos e Estruturados

### Objetivo

Declarar variaveis com tipos primitivos e estruturados, incluindo array, tupla e enum.

### Especificacoes

- String para nome do produto
- Number para preco do produto
- Boolean indicando se esta em estoque
- Array de strings para categorias
- Tupla para coordenadas (latitude e longitude)
- Enum para status de pedido

### Codigo

```typescript
const nomeProduto: string = "Teclado Mecânico";
const precoProduto: number = 450.99;
const emEstoque: boolean = true;

const categoriasProduto: string[] = [
  "Eletrônicos",
  "Periféricos",
  "Informática",
];

const coordenadas: [number, number] = [-23.5505, -46.6333];

enum StatusPedido {
  Pendente = "Pendente",
  Processando = "Processando",
  Entregue = "Entregue",
  Cancelado = "Cancelado",
}
```

### Resultado

```
Nome: Teclado Mecânico
Preço: R$ 450.99
Em Estoque: Sim
Categorias: Eletrônicos, Periféricos, Informática
Coordenadas: Lat -23.5505, Long -46.6333
Status de Pedido: Entregue
```

---

## Exercício 2.2: Funcao Tipada

### Objetivo

Criar funcoes com tipagem adequada nos parametros e no retorno.

### Especificacoes

- Criar a funcao `saudar` com parametros nome (string) e idade (number)
- Tipar o retorno da funcao como string
- Criar funcao `formatarProduto` que receba nome e preco

### Codigo

```typescript
function saudar(nome: string, idade: number): string {
  return `Bem-vindo, ${nome}! Você tem ${idade} anos.`;
}

function formatarProduto(nome: string, preco: number): string {
  return `O produto ${nome} custa R$ ${preco.toFixed(2)}`;
}

const resultado: string = saudar("Darci", 25);
console.log(resultado);
```

### Resultado

```
Bem-vindo, Darci! Você tem 25 anos.
O produto Mouse custa R$ 89.90
```

---

## Exercício 3.1: Interface e Objeto

### Objetivo

Criar uma interface para um produto e instanciar um objeto com base nela.

### Especificacoes

- Defina a interface `Produto` com:
  - `nome` (string)
  - `preco` (number)
  - `emEstoque` (boolean)
- Crie uma variavel `meuProduto` do tipo `Produto` e atribua um valor

### Codigo

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

## Exercício 3.2: Interfaces e Tipos Personalizados

### Objetivo

Criar interfaces avancadas com tipos personalizados e heranca de interfaces.

### Especificacoes

- Interface `IUser` com: `id` (number), `name` (string), `email` (string), `isActive` (boolean)
- Interface `IProduct` com: `id` (number), `name` (string), `price` (number), `inStock` (boolean), `categories` (array de strings)
- Type Alias `UserRole` que possa ser `'admin'` ou `'user'`
- Interface `IAdminUser` que estenda `IUser` e adicione `role` do tipo `UserRole`
- Instancias de `IUser`, `IProduct` e `IAdminUser`
- Funcoes que recebem objetos tipados e imprimem informacoes

### Codigo

```typescript
type UserRole = "admin" | "user";

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
--- Usuário Comum ---
ID: 1
Nome: João Silva
Email: joao@example.com
Ativo: Sim

--- Produto ---
ID: 101
Nome: Notebook Dell
Preço: R$ 3500
Em Estoque: Sim
Categorias: Eletrônicos, Computadores, Notebooks

--- Usuário Admin ---
ID: 2
Nome: Maria Santos
Email: maria@admin.com
Ativo: Sim
Role: admin
```

---

## Exercício 4.1: Generics

### Objetivo

Criar funcoes genericas reutilizaveis.

### Especificacoes

- Criar `getData<T>(items: T[]): T[]` que recebe um array e retorna o mesmo array
- Criar `getById<T extends { id: number }>(items: T[], id: number): T | undefined`
- Demonstre com arrays de strings, numbers e objetos IUser/IProduct

### Codigo

```typescript
function getData<T>(items: T[]): T[] {
  return items;
}

function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

const nomes: string[] = getData(["Alice", "Bob", "Charlie"]);
const numeros: number[] = getData([10, 20, 30]);

const usuario = getById(usuarios, 1);
const produto = getById(produtos, 102);
```

### Resultado

```
--- getData<T> ---
Strings: [ 'Alice', 'Bob', 'Charlie' ]
Numbers: [ 10, 20, 30 ]

--- getById<T> ---
Usuário encontrado: Ana (ana@example.com)
Produto encontrado: Mouse - R$ 80
Busca inexistente: undefined
```

---

## Exercício 5.1: API REST com Express

### Objetivo

Construir uma API REST basica com Express e TypeScript.

### Especificacoes

- Instalar Express e tipos: `npm install express @types/express`
- Criar arquivo `src/server.ts`
- Servidor escutando na porta 3000
- Array de usuarios em memoria usando interface `IUser`
- Rotas:
  - `GET /users` - Retorna todos os usuarios
  - `GET /users/:id` - Retorna usuario pelo ID
  - `POST /users` - Adiciona novo usuario (com validacao)
  - `PUT /users/:id` - Atualiza usuario existente
  - `DELETE /users/:id` - Remove usuario
- Tipagem do TypeScript em todas as partes

### Codigo

```typescript
import express from "express";
import type { Request, Response } from "express";
import type { IUser } from "./types.js";

const app = express();
const PORT: number = 3000;

app.use(express.json());

const users: IUser[] = [
  { id: 1, name: "João Silva", email: "joao@example.com", isActive: true },
  { id: 2, name: "Maria Santos", email: "maria@example.com", isActive: true },
];

app.get("/users", (_req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    res.status(404).json({ error: `Usuário com id ${id} não encontrado` });
    return;
  }
  res.json(user);
});

app.post("/users", (req, res) => {
  const newUser: IUser = {
    id: Math.max(...users.map((u) => u.id)) + 1,
    ...req.body,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    res.status(404).json({ error: `Usuário com id ${id} não encontrado` });
    return;
  }
  users[index] = { id, ...req.body };
  res.json(users[index]);
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    res.status(404).json({ error: `Usuário com id ${id} não encontrado` });
    return;
  }
  const deleted = users.splice(index, 1)[0];
  res.json({ message: "Usuário removido", user: deleted });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

### Como Testar

```bash
# Iniciar servidor
npm run server

# Listar usuarios
curl http://localhost:3000/users

# Buscar por ID
curl http://localhost:3000/users/1

# Criar usuario
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"Lucia","email":"lucia@test.com","isActive":true}'

# Atualizar usuario
curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"name":"João Alterado","email":"joao@test.com","isActive":false}'

# Remover usuario
curl -X DELETE http://localhost:3000/users/2
```

---

## Conceitos Abordados

| Exercicio | Conceitos                                           |
| --------- | --------------------------------------------------- |
| 1.1       | Setup TypeScript, npm scripts                       |
| 1.2       | ESLint, linting, qualidade de codigo                |
| 2.1       | Tipos primitivos, arrays, tuplas, enums             |
| 2.2       | Funcoes tipadas, parametros e retorno               |
| 3.1       | Interfaces, objetos, instanciação                   |
| 3.2       | Heranca de interfaces, type aliases, union types    |
| 4.1       | Generics, constraints, reutilizacao de tipos        |
| 5.1       | API REST, Express, rotas HTTP, validacao            |

---

## Como Executar

```bash
# Instalar dependencias
npm install

# Rodar os exercicios
npm run dev

# Rodar a API REST
npm run server

# Verificar qualidade do codigo
npx eslint src/

# Corrigir automaticamente
npx eslint src/ --fix

# Compilar TypeScript
npm run build

# Rodar testes
npm test
```

---

## Estrutura do Projeto

```
TypeScript/
├── src/
│   ├── index.ts        (Exercicios 1.1 a 4.1)
│   ├── server.ts       (Exercicio 5.1 - API REST)
│   ├── types.ts        (Interfaces compartilhadas)
│   ├── data.ts         (Dados reutilizaveis)
│   └── data.test.ts    (Testes do data.ts)
├── dist/               (Compilado JavaScript)
├── node_modules/
├── package.json
├── tsconfig.json
├── eslint.config.mts
└── EXERCICIOS.md       (Este arquivo)
```

---

## Status

- Exercicio 1.1: Completo
- Exercicio 1.2: Completo
- Exercicio 2.1: Completo
- Exercicio 2.2: Completo
- Exercicio 3.1: Completo
- Exercicio 3.2: Completo
- Exercicio 4.1: Completo
- Exercicio 5.1: Completo

---

**Versao TypeScript:** 6.0.3
**Versao ESLint:** 10.8.1
