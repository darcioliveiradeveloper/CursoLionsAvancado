# Exercício 2 — Tratamento com try/catch

## Registro obrigatório

**Sintoma:**
`divide({10,0})` retorna `Infinity` sem lançar erro; `execute(undefined)` lança `TypeError: Cannot read properties of undefined` com stack exposto; `divide({numerator:"10", denominator:2})` retorna `5` por coerção silenciosa — todas falhas silenciosas ou vazamento de detalhes internos, violando o critério de não resultar em `Infinity`, `NaN` ou stack trace ao usuário.

**Passos para reproduzir:**
1. Criar `Exercicio2/index.ts` com `divide` direto `return numerator/denominator` e `execute` sem validação (`rawInput as DivisionInput`).
2. Executar `npx tsx Exercicio2/index.ts` com 4 entradas: `{10,0}`, `undefined`, `{numerator:"10",denominator:2}`, `{10,2}`.

**Resultado esperado:**
Entradas inválidas devem gerar `AppError 400` com mensagem segura (sem stack); entrada válida `10/2=5`.

**Resultado obtido (versão buggy):**
```
[1] {10,0}                → Resultado: Infinity
[2] undefined             → TypeError: Cannot read properties of undefined (reading 'numerator') + stack
[3] {"10",2}              → Resultado: 5 (coerção)
[4] {10,2}                → Resultado: 5
```
Sem distinção entre erro esperado e inesperado, `catch` inexistente.

**Hipótese:**
JavaScript não lança exceção em divisão por zero (retorna `Infinity`); `unknown` sem guard deixa passar tipos errados; ausência de `AppError` e `try/catch (unknown)` impede separar erro de domínio de falha interna.

**Ferramenta utilizada:**
`console.log`/`console.error` para reproduzir, `try/catch` com `error: unknown` + `instanceof AppError` para investigar/separar; `Number.isFinite` e `typeof` para detectar `Infinity`/`NaN`.

**Causa encontrada:**
- `divide` sem validação → `10/0 = Infinity` não detectado.
- `execute` faz `as DivisionInput` (força `any` implícito) → `undefined` e `"10"` passam sem barreira.
- Sem `AppError` (sem `statusCode`) e sem `try/catch` tipado `unknown` → `TypeError` vaza stack; sem separação.
- `isValidNumber` inexistente → `NaN`, `Infinity`, `null`, `string` não rejeitados.

**Como a correção foi validada:**
Após implementar `AppError`, `isValidNumber` (`typeof === "number" && Number.isFinite`), `validateInput` e `divide` com `!Number.isFinite(result)`, e `execute` com `try/catch (error: unknown)`:
```
[1] {10,0}       → [AppError 400] Denominador nao pode ser zero
[2] undefined    → [AppError 400] Entrada deve ser um objeto...
[3] {"10",2}     → [AppError 400] numerator deve ser um numero valido...
[4] {null}       → [AppError 400] denominator deve ser um numero valido...
[5] {NaN,2}      → [AppError 400] numerator deve ser um numero...
[6] {10,2}       → Sucesso: 10 / 2 = 5
```
Nenhum `Infinity`/`NaN` retornado; erros esperados mostram só `message`+`statusCode`; `TypeError` original não exposto. `npx tsc --noEmit` e `npx eslint Exercicio2` OK; sem `any`, sem `catch` vazio, logs temporários removidos.

---

## Respostas às perguntas orientadoras

**Divisão por zero lança exceção automaticamente no JavaScript?**
Não. `10/0 → Infinity`, `0/0 → NaN`. É falha silenciosa; precisa validar antes e lançar `AppError`.

**Como detectar `Infinity` ou `NaN`?**
`Number.isFinite(value)` retorna `false` para `Infinity`, `-Infinity` e `NaN`; `Number.isNaN(value)` só para `NaN`. No código: `!isValidNumber(x)` e `!Number.isFinite(result)` após divisão.

**Por que `unknown` é mais seguro que `any`?**
`any` desliga o type checker (permite `rawInput.numerator` sem checagem). `unknown` obriga narrowing (`typeof`, `in`, `instanceof`) antes de usar; impede `as DivisionInput` silencioso.

**O catch deve retornar sucesso depois de encontrar uma falha?**
Não. Deve registrar/encaminhar o erro e não seguir fluxo de sucesso. Nosso `catch` não retorna valor de sucesso, apenas loga `AppError` ou `ERRO INESPERADO` genérico.

**Qual informação pertence ao usuário e qual ao log?**
Usuário: `AppError.message` + `statusCode` (400, sem stack). Log interno: stack trace completo de `error` inesperado (`console.error(error)`). Nunca expor `error.stack` ao usuário final.

---

## Critério atendido

Entradas inválidas nunca resultam em `Infinity`, `NaN` ou falhas silenciosas — todas viram `AppError 400`. `catch (error: unknown)` separa `AppError` (esperado) de `Error` inesperado com resposta genérica.

## Código corrigido (`Exercicio2/index.ts:6`)

```typescript
class AppError extends Error {
  public readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}
function isValidNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
function validateInput(rawInput: unknown): DivisionInput { /* typeof object, in, isValidNumber, denominator===0 */ }
function divide(input: DivisionInput): number {
  const result = input.numerator / input.denominator;
  if (!Number.isFinite(result)) throw new AppError("Resultado invalido (Infinity/NaN)", 400);
  return result;
}
function execute(rawInput: unknown): void {
  try { const input = validateInput(rawInput); console.log(`Sucesso: ${divide(input)}`); }
  catch (error: unknown) {
    if (error instanceof AppError) console.log(`[AppError ${error.statusCode}] ${error.message}`);
    else { console.log("[ERRO INESPERADO] Erro interno do servidor"); console.error(error); }
  }
}
```

Sem `any`, sem `catch` vazio, sem `console.log` como “correção” — `console.log` apenas evidencia resultado após validação.
