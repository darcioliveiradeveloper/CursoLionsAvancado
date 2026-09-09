# Exercícios 11 e 12 — RequestHandler e Repository (atividade guiada)

## 1. Perguntas iniciais

### O TypeScript sabe hoje quais campos existem em `req.body`?

Sem os genéricos do `RequestHandler`, **não**. `req.body` fica como `any`
(Estrutura do Express para JSON) e nada é verificado em tempo de compilação.
Ao declarar o handler com `RequestHandler<{}, IUser, CreateUserBody, {}>`,
o editor passa a conhecer exatamente `{ name, email, isActive }` em `req.body`
e avisa se você usar um campo inexistente — sem `as` nem `any`.

### `res.json` aceita qualquer formato nas rotas atuais?

Antes, **sim** — `res.json(...)` aceitava qualquer valor e o contrato da resposta
era implícito. Depois do `RequestHandler`, o `ResBody` do genérico trava o formato:
`res.json()` que não devolva o tipo declarado vira **erro de compilação** (ex.:
mandar `IUser` onde se prometeu `DeleteUserResponse`).

### O UserService manipula diretamente um array?

**Não mais.** Anteriormente o `UserService` guardava/alterava um array em memória.
Agora ele recebe um `IUserRepository` e só envia comandos — `findAll`, `findById`,
`create`, `update`, `delete` — sem saber onde o dado mora. O array (ou o arquivo
JSON, no exercício) ficou totalmente do lado do Repository.

### O que precisaria mudar para trocar JSON por banco de dados depois?

**Quase nada da aplicação.** Basta criar `UserRepository`/`ProductRepository`
novos (ex.: `PostgresUserRepository implements IUserRepository`) usando o driver
do banco e trocar apenas a instância montada no `server.ts`. `UserService`,
handlers e o contrato `IUserRepository` não mudam — essa é a ideia da abstração
de persistência.

## 2. Exercício 11 — Rotas tipadas com RequestHandler

### A resposta de erro usa o mesmo `ResBody` da resposta de sucesso?

**Não.** O `ResBody` tipa apenas a resposta de **sucesso** (200/201/etc.).
A resposta de erro (400/404/500, `{ message }`) é produzida pelo
errorMiddleware global, fora do contrato do handler. Essa separação é
intencional: cada rota descreve o "contrato feliz", e a falha é um contrato
único tratado centralmente.

### Como modelar uma resposta que pode conter `user` ou `message`?

Em rotas como `DELETE /users/:id` escolhi um corpo de resposta explícito:
`DeleteUserResponse = { message: string; user: IUser }` — o `ResBody` do
handler é esse tipo, então o retorno nunca é ambíguo. Se quisesse "`user` **ou**
`message`" usaria uma união (`{ user: IUser } | { message: string }`). O
importante é o `ResBody` descrever fielmente o que a rota promete.

### Quais propriedades devem ser opcionais no body de atualização?

O `UpdateUserBody = Partial<CreateUserBody>` (no meu caso `Partial<CreateUserBody>`
para users e produtos). No `PUT`, o cliente pode enviar **um ou mais** campos;
todos são opcionais. Como só tipos opcionais não bastam para o corpo chegar
"vazio", o Service também rejeita o envio de corpo sem nenhum campo com 400.

### O ID no ReqBody pode substituir o ID de `req.params`?

**Não.** O `id` da URL (`params`) é o identificador **do recurso**; o `body`
representa o conteúdo. Deixar o body sobrescrever o `id` do `params` abriria
inconsistência (o mesmo handler poderia gravar com um id diferente do endereço
acessado). Por isso o Repository sempre preserva o `id` do `params` nas
atualizações — o body nunca carrega `id`.

## 3. Questões de projeto (Exercício 12)

### `create` recebe um usuário com ID pronto ou o Repository gera o ID?

O **Repository gera o ID**: ele recebe `Omit<IUser, "id">` e calcula
`maxId + 1`. Gerar o ID é uma preocupação de onde o dado vai morar (a estratégia
de contador pertence à persistência), não de negócio.

### `update` retorna o item atualizado, `boolean` ou `undefined`?

Retorna **`IUser | undefined`**: `undefined` significa "não achei o id".
Converter isso em status HTTP (404) é responsabilidade do Service, que checa o
retorno e lança `AppError`. Assim o Repository "retorna dados ou ausência de
dados; não decide status HTTP", como pede o enunciado.

### O array retornado por `findAll` pode ser alterado externamente?

Sim, mas é involuntário: `findAll` devolve a referência lida do JSON. Mitigação
natural da implementação JSON é que cada operação relê o arquivo do zero, então
uma "edição externa" não fica persistida. Documento a limitação tal como pede o
enunciado ("Questões de projeto").

### Como garantir que duas gravações no JSON não se sobrescrevam?

**Não garante — documenta.** A leitura-escrita é feita por operação e sem
fila/trava cross-process; dois `update`/`create` simultâneos podem sobrescrever
a alteração um do outro. Para este exercício, apenas documento essa limitação
(nos comentários dos repositórios), como o enunciado orienta. Em produção o
correto seria fila em processo único ou transações no banco.

## 4. Explicação própria: diferença entre Service e Repository

- **Repository** responde **como** os dados são persistidos: lê e grava o JSON
  (`fs/promises`), busca por id, gera o `id`, converte o formato armazenado.
  Ele **não conhece HTTP nem regras de negócio** — não decide se o email pode
  duplicar, se APOS nome tem tamanho mínimo e nunca devolve 400/404.
- **Service** responde **o que** a operação significa: valida o corpo recebido,
  aplica as regras da API (nome com 3+ caracteres, preço >= 0, campos obrigatórios)
  e **coordena** um ou mais repositories. Ele usa apenas o contrato
  `IUserRepository`/`IProductRepository` e lança `AppError` quando a operação não
  pode continuar (400 dados inválidos, 404 não achado). **Não usa `fs`** nem
  conhece o arquivo.
- O **Controller/rota** traduz HTTP: lê `req`, chama o Service, devolve `res`.

Fluxo: `req -> handler (RequestHandler tipado) -> Service (regras) ->
Repository (persistência) -> Service -> handler (res)`.

Exemplo prático: quando o `UserService` chama `this.repository.update(id, body)`,
ele não sabe se o dado veio de um array, de `users.json` ou do MongoDB. Para
trocar de persistência, cria-se outra classe que implementa `IUserRepository` e
muda-se **uma linha** no `server.ts` (composição das dependências, feita uma
única vez na inicialização — nunca por requisição).

## 5. Evidências de compilação e testes

- `npx tsc --noEmit` -> **sem erros**; `npx eslint Exercicio11-12` -> **sem erros**.
- **Usuários**: `GET /users` -> 200 (3); `POST /users` -> **201** com `id: 4`;
  `GET /users/999` -> **404**; `POST` com corpo faltando campo -> **400**;
  `PUT /users/1 { isActive: false }` -> 200; `DELETE /users/4` -> 200 com
  `{ message, user }`.
- **Produtos**: `POST /products` -> **201** com `id: 4`; `PUT /products/1
  { price: -1 }` -> **400** (price negativo); `PUT /products/1 { price: 399.9 }`
  -> 200.
- **Persistência**: servidor reiniciado -> `users` e `products` preservaram as
  alterações do JSON (3 usuários originais + 1 criado e 3 produtos + 1 criado);
  `GET /users/1` manteve o `isActive: false` gravado antes do restart.
- **JSON inválido**: arquivo `products.json` corrompido -> `GET /products`
  -> **500** `{ "message": "Erro interno do servidor" }` (sem stack trace); na
  sequência `GET /users` -> 200 (o servidor continuou respondendo). Arquivo
  restaurado antes da entrega.
- Falhas assíncronas encaminhadas ao middleware global (Express 5): nenhum
  handler tem `try/catch`; o corrompido provou que a rejeição do Repository
  chega ao `errorMiddleware`.

## 6. Checklist de arquitetura

- [x] Handlers tipam `Params`, `ResBody`, `ReqBody` e `Query` (via
      `RequestHandler`; tipos vazios `EmptyParams`/`EmptyQuery` explícitos).
- [x] Não há `any` para contornar erros do compilador.
- [x] `UserRepository`/`ProductRepository` não importam `Request` nem `Response`.
- [x] `UserService`/`ProductService` não usam `fs/promises` diretamente.
- [x] Repository não contém regra de negócio (gera id, busca, persiste).
- [x] Todos os métodos com I/O retornam `Promise` tipada.
- [x] O middleware global recebe falhas assíncronas.
- [x] `GET`/`POST`/`PUT`/`DELETE` de `/users` e `/products` refatorados,
      contratos das entregas anteriores mantidos.