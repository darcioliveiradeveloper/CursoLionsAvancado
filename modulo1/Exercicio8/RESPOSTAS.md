# Exercício 8 — Perguntas de Verificação (UserService)

## Questões para orientar os retornos

### 1. `getAll` sempre retorna um array? Qual seria seu tipo?

Sim. `getAll()` sempre devolve a coleção mantida pelo serviço. O tipo é
`IUser[]` (um array de usuários). Mesmo que o array esteja vazio, o retorno
continua sendo um array — nunca `null` ou `undefined`.

### 2. `getById` pode não encontrar nada? Como representar isso no TypeScript?

Pode. Quando nenhum usuário tem o `id` informado, representamos com o tipo
`IUser | undefined`. O `undefined` comunica claramente a ausência do item e o
TypeScript obriga a rota a tratar esse caso antes de usar o resultado.

### 3. `create` deve retornar o usuário criado?

Sim. `create(user: Omit<IUser, "id">): IUser` retorna o usuário completo já com
o `id` gerado pelo serviço. Isso permite que a rota responda `201` com o objeto
criado, incluindo o novo `id`.

### 4. `update` pode falhar quando o ID não existe?

Sim. Se o `id` não existe, `update(id, data)` retorna `undefined`
(`IUser | undefined`). A rota é quem decide responder `404`. Com
`Partial<IUser>` como segundo parâmetro, o `update` aceita somente os campos que
serão alterados (atualização parcial).

### 5. `delete` deve retornar o item removido, `true/false` ou `undefined`?

Foi escolhido retornar `IUser | undefined`: o serviço devolve o usuário removido
quando encontra o `id`, ou `undefined` quando não existe. A rota decide então
responder `200` com o item removido ou `404`. Essa escolha mantém consistência
com `getById` e `update`, todos usando `IUser | undefined`.

## Entrega do aluno

### Qual problema o middleware resolve e por que UserService melhora a organização?

- **O middleware resolve o problema do código repetido e transversal.**
  O logging (e futuramente autenticação, validação etc.) é uma preocupação que
  se aplica a todas as requisições. Centralizar em um único middleware
  executado com `app.use()` evita copiar a mesma lógica dentro de cada rota e
  garante que nenhuma chamada fique sem registro.

- **O `UserService` melhora a organização separando responsabilidades.**
  As regras de manipulação dos dados (procurar, criar, atualizar, remover no
  array) ficam encapsuladas em uma classe com array `private`. As rotas deixam
  de manipular o array diretamente e passam a se preocupar apenas com o
  protocolo HTTP: converter `id`, validar o corpo e escolher o status. Com
  responsabilidade única, o código fica mais fácil de entender, testar e evoluir
  (por exemplo, trocar a fonte de dados no futuro sem alterar as rotas).

## Observação: PUT vs PATCH

Em muitos projetos, `PUT` representa substituição completa e `PATCH` uma
alteração parcial. **O enunciado usa `PUT` com `Partial<IUser>`** (atualização
parcial), então seguimos o exercício. Vale registrar essa diferença para
discussões futuras — o comportamento implementado aqui se assemelha
conceitualmente a um `PATCH`.