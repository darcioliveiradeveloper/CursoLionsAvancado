# Exercício 9 — Perguntas de Verificação (Erros Tipados)

## Perguntas iniciais

### 1. Qual a diferença entre retornar `res.status(400)` em vários lugares e lançar um erro?

Retornar `res.status(...)` espalha a lógica de resposta de erro por todas as
rotas: cada rota precisa repetir a mesma estrutura de objeto, o mesmo tipo de
resposta e o mesmo `return`. Se amanhã o formato padrão mudar (ex: adicionar um
campo `code`), seria necessário alterar cada rota.

Lançar um `AppError` centraliza a decisão: a rota apenas indica *o que* falhou
(produto inexistente, corpo inválido) e o middleware global decide *como*
responder. Resultado: rotas mais enxutas, formato de erro consistente e um único
ponto de manutenção.

### 2. Quem deve decidir o status HTTP de uma resposta de erro?

O **`AppError`** carrega o status junto com a mensagem, e o **middleware global**
é quem aplica esse status na resposta. A rota não decide nada: ela lança o erro
com o código que representa o problema (400 para validação, 404 para recurso
ausente). O erro inesperado (não `AppError`) fica com o middleware, que responde
500. Assim, a regra de "qual status para qual situação" fica explícita e
próxima do erro, sem repetição.

## Decisões do AppError

### 3. Qual status usar para validação inválida: 400 ou 422? Escolha e justifique.

Escolhido **400 Bad Request**. Justificativa: para este nível do curso, `400` é
o status mais direto e didático — indica que o corpo enviado não é válido para a
operação. O `422 Unprocessable Entity` traz nuances (sintaxe válida, mas
semântica inválida) que acrescentam complexidade sem ganho prático aqui. A
escolha está documentada para ser discutida em sala e pode evoluir para `422`
em versões futuras da API.

### 4. Qual status usar quando um recurso não existe (produto/usuário)?

**404 Not Found** — o recurso solicitado não está disponível no servidor. É o
status canônico para ID inexistente e já estava no comportamento do Exercício 8.

### 5. Por que uma classe que estende `Error` precisa chamar `super(message)`?

`super(message)` executa o construtor de `Error`, que inicializa a propriedade
`message` e configura o erro corretamente. Sem essa chamada, `this.message`
ficaria indefinida e o erro se comportaria de forma inconsistente (ex: ao
converter para string). Além disso, `this.name = "AppError"` garante que o
identificador do tipo fique visível, e `Object.setPrototypeOf` preserva o
`instanceof` correto ao transpilar para ES5.

## Perguntas de verificação (seção 4)

### 6. Por que usar `unknown` é mais seguro que `any` no `catch`?

`any` desliga toda a checagem de tipos: o código pode acessar qualquer
propriedade sem garantia, escondendo erros que só apareceriam em execução.
`unknown` força a verificação do tipo real antes de usar o valor — por exemplo,
`error instanceof AppError` ou `typeof` — garantindo que acesso a `message`,
`statusCode` etc. só aconteça quando o tipo for conhecido. Isso transforma
erros de runtime em erros de compilação.

### 7. Por que o middleware recebe `next` mesmo que normalmente não o chame?

Porque o Express identifica um middleware de erro pela **quantidade de
parâmetros na assinatura** (quatro, começando com o erro). Se `next` fosse
removido, o Express não reconheceria a função como handler de erro. O `next`
permanece disponível para casos onde o middleware não sabe tratar a falha e
decide repassá-la adiante.

### 8. O que aconteceria se todo erro fosse retornado como 500?

O cliente não conseguiria distinguir um erro de regra de negócio (ex: preço
negativo, que deveria ser 400) de uma falha interna real (500). A correção da
requisição ficaria impossível de guiar pelo status, e erros esperados seriam
tratados como se o servidor estivesse quebrado.

### 9. O que aconteceria se a aplicação expusesse stack traces?

Vazaria informação interna: caminhos de arquivos no servidor, versões de
dependências e a estrutura do código — material valioso para um atacante.
Por isso o stack é registrado apenas no servidor (`console.error`) e a resposta
envia uma mensagem genérica.

## Erros em handlers assíncronos — o padrão `catch (error: unknown)`

Em Express (a partir da v5), erros lançados em handlers **síncronos** são
capturados automaticamente e encaminhados ao middleware de erro. Em handlers
**assíncronos**, uma estratégia explícita é capturar a falha e repassar com
`next(error)`:

```ts
app.get("/produtos", async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const produtos = await buscarProdutos();
    res.json(produtos);
  } catch (error: unknown) {
    // Antes de acessar propiedades, o TypeScript exige descobrir o tipo real.
    next(error);
  }
});
```

O `unknown` garante que o código não acesse `message` ou outras propriedades sem
antes verificar o tipo (por exemplo, com `error instanceof AppError`).

## Conclusão — por que centralizar erros melhora a API?

Centralizar erros em um `AppError` + middleware global garante consistência:
todas as respostas de erro seguem o mesmo formato `{ message }`, os status
refletem a natureza do problema (400/404 esperados, 500 inesperado) e as rotas
ficam livres de repetição. A manutenção vira ponto único e o comportamento fica
previsível para o cliente.