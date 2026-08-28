# Exercício 7 — Perguntas de Verificação (Middleware)

### 1. Por que `Response` faz parte da assinatura mesmo que o logger não o utilize?

Porque essa é a assinatura padrão de um middleware no Express: o framework sempre
chama a função com `(req, res, next)`, independentemente de quantos parâmetros o
middleware usa. `Response` está presente porque qualquer middleware pode precisar
responder ou encerrar o fluxo da requisição. Manter os três parâmetros garantem
interoperabilidade com o Express e tipagem correta em `Request`,
`Response` e `NextFunction`.

### 2. O que acontece se `next()` for removido?

A requisição fica "presa" no middleware. O Express não avança para a próxima
função ou rota, e a resposta nunca é enviada — o cliente fica aguardando até
estourar o timeout. Como o logger é apenas um observador (não encerra a
resposta), ele precisa chamar `next()` para liberar o fluxo.

### 3. A posição de `app.use(loggerMiddleware)` muda quais rotas serão registradas?

Sim. O Express executa os middlewares na ordem em que são registrados. Com
`app.use(loggerMiddleware)` **antes** das rotas, o logger captura todas as
chamadas seguintes — inclusive as de rotas inexistentes (404). Se fosse
registrado **depois** das rotas, ele só capturaria requisições que passassem
pelo fluxo até ele.

### 4. Qual a diferença entre `console.log` e `res.json()`?

`console.log` escreve no terminal do servidor e não afeta a resposta HTTP.
`res.json()` envia um corpo JSON ao cliente e encerra o ciclo da requisição.
No middleware de log, usar `res.json()` enviaria uma resposta própria antes da
rota real, impedindo que ela respondesse ao cliente.

---

## Desafio opcional (não obrigatório)

Medir a duração de cada requisição e mostrar o status da resposta pode ser feito
com o evento `finish` do `Response`:

```ts
export function loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
  const inicio: number = Date.now();
  res.on("finish", () => {
    const duracaoMs: number = Date.now() - inicio;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} (${duracaoMs}ms)`);
  });
  next();
}
```