# Exercício 10 — Perguntas de Verificação (CRUD de Produtos)

## Decisões de arquitetura

### 1. Validação de tipo vs regra de negócio — qual a diferença?

- **Validação de tipo**: verifica *a forma* do dado recebido (é uma `string`? é um
  `number`? é um array?). Exemplo: `typeof value !== "number"` rejeita `price`
  enviado como texto.
- **Regra de negócio**: verifica *o significado* do dado dentro das regras da
  aplicação. Exemplo: `price < 0` ou `name.trim().length < 3`.

Importante: `typeof NaN === "number"` — o NaN passa na validação de tipo, então
a regra de negócio precisa checá-lo explicitamente (`Number.isNaN`).

### 2. Onde as regras de nome e preço devem ser verificadas?

No **`ProductService`**. A rota é responsável apenas pelo HTTP (status, formato
da resposta, leitura do `req.body`). O serviço concentra as regras de produto —
nome curto, preço negativo/NaN — e lança `AppError` quando violadas. Assim a
mesma regra vale para `create`, `update` e qualquer outra entrada futura.

### 3. Na atualização, validar somente campos enviados ou o produto completo?

Decidido: **somente os campos enviados** (atualização parcial). O `PUT` aceita
um ou mais campos de `IProduct`, valida cada um com a mesma regra do `create`
(e.g. se enviar `name`, ele precisa ter no mínimo 3 caracteres) e preserva o `id`.
Se nenhum campo for enviado, responde 400.

### 4. Quem gera o `id` do produto?

A **aplicação** (`ProductService.nextId()`), nunca o cliente. O corpo de `POST`
não deve conter `id`; o serviço calcula o próximo id a partir do maior existente
(ou 1 quando a lista está vazia).

### 5. Qual status para DELETE?

**204 No Content**, sem corpo — convenção REST: o recurso foi removido e não há
nada mais a retornar. A confirmação vem do próprio status; excluir um item e
buscá-lo depois deve retornar 404.

## Mapa de erros da API

| Situação                              | Status | Mensagem (exemplo)                                   |
| ------------------------------------- | ------ | ---------------------------------------------------- |
| Nome com menos de 3 caracteres        | 400    | O campo name deve ter no mínimo 3 caracteres         |
| Preço negativo                        | 400    | O campo price não pode ser negativo                  |
| Preço NAO numero                      | 400    | O campo price deve ser um número                     |
| Preço NaN                             | 400    | O campo price não pode ser NaN                       |
| `categories` fora do formato          | 400    | O campo categories deve ser um array de strings      |
| PUT sem nenhum campo                  | 400    | Nenhum campo enviado. Envie ao menos um ...          |
| ID inválido (`/products/abc`)         | 400    | ID inválido                                          |
| Produto inexistente                   | 404    | Produto com id N não encontrado                      |
| Erro inesperado                       | 500    | Erro interno do servidor                             |

## Cenário de execução testado

- Servidor iniciado com `npm run ex10` (rota de log do Exercício 7 registrando tudo).
- `POST /products` válido -> **201** e id gerado pela aplicação (`4`).
- `POST` com nome `AB`, nome `"   "`, preço `-5`, preço texto, `inStock` texto,
  `categories` fora do formato e corpo sem todos os campos -> **400**.
- `GET /products/1`, `PUT` parcial `{ price }` e `PUT` parcial `{ name }` -> **200**.
- `PUT` com id inexistente -> **404**; `PUT` sem campos -> **400**.
- `DELETE /products/1` -> **204** e `GET /products/1` depois -> **404**.
- `GET /products/999` -> **404**; `GET /products/abc` -> **400**.
- `npx tsc --noEmit` e `npx eslint Exercicio10` sem erros.

## Conclusão — por que centralizar erros melhora a API?

Centralizar erros (no `AppError` + middleware global) mantém as rotas curtas,
garante o mesmo formato de resposta (`{ message }`) e separa o que é HTTP do que
é regra de produto. Validação de tipo (forma do dado) e regra de negócio
(significado do dado) ficam explicitamente no `ProductService`, aplicadas de
forma idêntica em `create` e `update`.