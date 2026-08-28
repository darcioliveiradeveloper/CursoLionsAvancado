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
- [Exercicio 6.1: Consumo de API e Filtros](#exercicio-61-consumo-de-api-e-filtros)
- [Exercicio 7: Middleware com Tipagem](#exercicio-7-middleware-com-tipagem)
- [Exercicio 8: Classe UserService](#exercicio-8-classe-userservice)
- [Exercicio 9: Erros Tipados (AppError)](#exercicio-9-erros-tipados-apperror)
- [Exercicio 10: CRUD de Produtos](#exercicio-10-crud-de-produtos)

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

## Exercicio 6.1: Consumo de API e Filtros

### Objetivo

Consumir uma API externa, criar interfaces para os dados e implementar funcoes de pesquisa e filtro.

### Arquivos

- `types.ts` — interface ICountry (com nome em PT-BR via translations.pt) e Region
- `api.ts` — funcao fetchCountries()
- `filters.ts` — funcoes searchByName() e filterByRegion()
- `public/app.ts` — frontend que exibe as bandeiras via flagcdn

### Como Executar

```bash
npm run ex6
```

---

## Exercicio 7: Middleware com Tipagem

### Objetivo

Criar um middleware com a tipagem do Express `(req: Request, res: Response, next: NextFunction)` que registra cada requisicao e libera o fluxo com next().

### Arquivos

- `middlewares/logger.middleware.ts` — funcao loggerMiddleware tipada
- `server.ts` — middleware registrado com app.use antes das rotas

### Rotas

- `GET /users` - Retorna todos os usuarios
- `GET /users/:id` - Retorna usuario pelo ID
- `POST /users` - Adiciona novo usuario
- `PUT /users/:id` - Atualiza usuario existente
- `DELETE /users/:id` - Remove usuario

### Como Executar

```bash
npm run ex7
```

---

## Exercicio 8: Classe UserService

### Objetivo

Centralizar o CRUD de usuarios em uma classe com lista privada. A rota cuida do HTTP; o servico manipula os dados.

### Arquivos

- `services/user.service.ts` — classe UserService (getAll, getById, create, update com Partial, delete)
- `server.ts` — rotas usam apenas o servico e validam o corpo em runtime

### Como Executar

```bash
npm run ex8
```

---

## Exercicio 9: Erros Tipados (AppError)

### Objetivo

Distinguir erro esperado da aplicacao de erro inesperado, com um AppError que transporta o codigo HTTP e um middleware global de erros.

### Arquivos

- `errors/app.error.ts` — classe AppError extends Error com statusCode public readonly
- `middlewares/error.middleware.ts` — middleware global com ErrorRequestHandler (4 parametros), registrado depois das rotas
- `server.ts` — rotas lancam AppError em vez de espalhar res.status()

### Comportamento

- Instancia de AppError -> responde com statusCode e message
- Erro inesperado -> 500 com mensagem generica (sem stack trace)

### Como Executar

```bash
npm run ex9
```

---

## Exercicio 10: CRUD de Produtos

### Objetivo

Aplicar regras de negocio e validacao em runtime no CRUD de produtos, com a rota cuidando apenas do HTTP e o ProductService das regras.

### Regras de negocio

- Nome precisa ter no minimo 3 caracteres (apos trim)
- Preco nao pode ser negativo nem NaN (zero e aceito)
- ID gerado pela aplicacao, nunca pelo cliente
- PUT pode atualizar apenas os campos enviados

### Rotas

- `GET /products` - Lista todos os produtos
- `GET /products/:id` - Busca um produto pelo ID
- `POST /products` - Cria um produto valido (201)
- `PUT /products/:id` - Atualiza um produto existente
- `DELETE /products/:id` - Remove um produto (204)

### Como Executar

```bash
npm run ex10
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
| 6.1       | Fetch API, async/await, interfaces, filtros         |
| 7         | Middleware Express, tipagem (req, res, next)        |
| 8         | Classes, encapsulamento, camada de servico, Partial |
| 9         | Erros esperados vs inesperados, AppError, ErrorRequestHandler |
| 10        | Regras de negocio, validacao em runtime, CRUD       |

---

## Como Executar

```bash
# Instalar dependencias
npm install

# Rodar os exercicios 1 a 4
npm run ex1
npm run ex2
npm run ex3
npm run ex4

# Rodar a API REST do Exercicio 5
npm run server

# Rodar o frontend do Exercicio 6 (compila e abre a pagina)
npm run ex6

# Rodar os servidores dos exercicios 7 a 10
npm run ex7
npm run ex8
npm run ex9
npm run ex10

# Verificar qualidade do codigo
npx eslint Exercicio1 Exercicio2 Exercicio3 Exercicio4 Exercicio5 Exercicio6 Exercicio7 Exercicio8 Exercicio9 Exercicio10

# Compilar TypeScript
npm run build

# Rodar testes
npm test
```

---

## Estrutura do Projeto

```
TypeScript/
├── Exercicio1/              (Setup TypeScript + ESLint)
├── Exercicio2/              (Tipos primitivos e funcoes tipadas)
├── Exercicio3/              (Interfaces e tipos personalizados)
├── Exercicio4/              (Generics)
├── Exercicio5/              (API REST com Express - /users)
├── Exercicio6/              (Consumo de API e filtros + frontend)
├── Exercicio7/              (Middleware com tipagem)
├── Exercicio8/              (Classe UserService)
├── Exercicio9/              (AppError e middleware global de erros)
├── Exercicio10/             (CRUD de produtos)
├── node_modules/
├── package.json
├── tsconfig.json
├── eslint.config.mts
└── README.md                (Este arquivo)
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
- Exercicio 6.1: Completo
- Exercicio 7: Completo
- Exercicio 8: Completo
- Exercicio 9: Completo
- Exercicio 10: Completo

---

**Versao TypeScript:** 6.0.3
**Versao ESLint:** 10.8.1
