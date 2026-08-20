# Exercicios de TypeScript Avançado

## Sumario

- [Exercicio 1.1: Setup Inicial](#exercicio-11-setup-inicial)
- [Exercicio 1.2: Configurar ESLint](#exercicio-12-configurar-eslint)
- [Exercicio 2.1: Tipos Primitivos e Estruturados](#exercicio-21-tipos-primitivos-e-estruturados)
- [Exercicio 2.2: Funcao Tipada](#exercicio-22-funcao-tipada)
- [Exercicio 3.1: Interface e Objeto](#exercicio-31-interface-e-objeto)
- [Exercicio 3.2: Interfaces e Tipos Personalizados](#exercicio-32-interfaces-e-tipos-personalizados)
- [Exercicio 4.1: Generics](#exercicio-41-generics)
- [Exercicio 5.1: API REST com Express](#exercicio-51-api-rest-com-express)

---

## Exercicio 1.1: Setup Inicial

### Objetivo

Criar um projeto com:

- TypeScript instalado
- tsconfig configurado
- src/index.ts imprimindo "Ola, TS!"
- Rodar com `npm run dev`

### Codigo

```typescript
const message: string = "Ola, TS!";
console.log(message);
```

---

## Exercicio 1.2: Configurar ESLint

### Objetivo

- Instalar e configurar o ESLint no projeto
- Criar um erro de lint proposital (ex: variavel nao usada)
- Corrigir com base no feedback

### Codigo

```typescript
// Variavel proposital para demonstrar erro de lint
const unusedVariable = "teste";
```

---

## Exercicio 2.1: Tipos Primitivos e Estruturados

### Objetivo

Declarar variaveis com tipos primitivos e estruturados.

### Codigo

```typescript
const nomeProduto: string = "Teclado Mecanico";
const precoProduto: number = 450.99;
const emEstoque: boolean = true;

const categoriasProduto: string[] = [
  "Eletronicos",
  "Perifericos",
  "Informatica",
];

const coordenadas: [number, number] = [-23.5505, -46.6333];

enum StatusPedido {
  Pendente = "Pendente",
  Processando = "Processando",
  Entregue = "Entregue",
  Cancelado = "Cancelado",
}
```

---

## Exercicio 2.2: Funcao Tipada

### Objetivo

Criar funcoes com tipagem adequada nos parametros e no retorno.

### Codigo

```typescript
function saudar(nome: string, idade: number): string {
  return `Bem-vindo, ${nome}! Voce tem ${idade} anos.`;
}

function formatarProduto(nome: string, preco: number): string {
  return `O produto ${nome} custa R$ ${preco.toFixed(2)}`;
}
```

---

## Exercicio 3.1: Interface e Objeto

### Objetivo

Criar uma interface para um produto e instanciar um objeto com base nela.

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

---

## Exercicio 3.2: Interfaces e Tipos Personalizados

### Objetivo

Criar interfaces avancadas com tipos personalizados e heranca de interfaces.

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
  console.log(`Ativo: ${user.isActive ? "Sim" : "Nao"}`);
}
```

---

## Exercicio 4.1: Generics

### Objetivo

Criar funcoes genericas reutilizaveis.

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
```

---

## Exercicio 5.1: API REST com Express

### Objetivo

Construir uma API REST basica com Express e TypeScript.

### Rotas

- `GET /users` - Retorna todos os usuarios
- `GET /users/:id` - Retorna usuario pelo ID
- `POST /users` - Adiciona novo usuario
- `PUT /users/:id` - Atualiza usuario existente
- `DELETE /users/:id` - Remove usuario

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
curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"name":"Joao Alterado","email":"joao@test.com","isActive":false}'

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
└── README.md           (Este arquivo)
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
