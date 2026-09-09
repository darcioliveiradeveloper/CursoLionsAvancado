# Exercício 1 — Debug básico com console.log e console.trace

## Registro obrigatório

**Sintoma:**
`calculateTotal([40, 60])` retorna `NaN` em vez de `90`. A função deveria somar o subtotal (100) e aplicar 10% de desconto quando `subtotal >= 100`, retornando `90`. Qualquer entrada (inclusive `[]` e `[20,30]`) também retorna `NaN`.

**Passos para reproduzir:**
1. Criar `Exercicio1/index.ts` com a função exatamente como no enunciado (buggy).
2. Executar `npx tsx Exercicio1/index.ts` (que faz `console.log(calculateTotal([40,60]))`).
3. Observar saída no terminal.

**Resultado esperado:**
`90` para `[40,60]` (100 com 10% de desconto).

**Resultado obtido:**
`NaN`.

**Hipótese (antes de investigar):**
Off-by-one no `for` (`<= prices.length` lê um índice além do último). `prices[index]` vira `undefined` na última iteração e `subtotal += undefined` contamina o acumulador com `NaN`. Há também suspeita na regra de desconto (retornar `*0.1` em vez de total com desconto) e na condição `>100` que exclui exatamente `100`.

**Ferramenta utilizada:**
`console.log` para `index`, `prices[index]`, `subtotal` antes/depois; `console.trace` no primeiro `prices[index] === undefined` para capturar stack trace.

**Causa encontrada:**
3 erros lógicos independentes (+1 consequência):
1. `index <= prices.length` — deveria ser `index < prices.length`. Último índice válido é `length -1`. Confirmado: `length=2`, índices 0 e 1 são válidos, 2 é `undefined`.
2. `subtotal += undefined` → `NaN` (regra JS: `number + undefined = NaN`). Todo retorno vira `NaN`.
3. `if (subtotal > 100) return subtotal * 0.1` — retorna apenas o valor do desconto (ex.: `12` para 120) em vez do total com desconto (`108`). Correto: `subtotal * 0.9`.
4. `> 100` exclui exatamente `100`. Especificação pede `>= 100`.

**Como a correção foi validada:**
Arquivo instrumentado `debug.ts` executado, observados `index=2 | prices[2]=undefined | subtotal=NaN` e trace:
```
Trace: [TRACE] Valor inesperado detectado em index=2
    at calculateTotal (Exercicio1/debug.ts:11:15)
```
Após corrigir (`<`, `>=`, `*0.9`) e remover logs temporários, reexecutado `npx tsx Exercicio1/index.ts` com os 4 cenários mínimos:
- `[20,30]` → `50` (abaixo do limite, sem desconto) OK
- `[40,60]` → `90` (exatamente 100, com desconto) OK
- `[80,40]` → `108` (acima do limite, com desconto) OK
- `[]` → `0` (lista vazia) OK
`npx tsc --noEmit` e `npx eslint Exercicio1` sem erros.

---

## Etapas seguidas (orientação de investigação)

| Etapa | O que foi feito |
|-------|-----------------|
| **1. Reproduzir** | Executado código original com `[40,60]` → `NaN` |
| **2. Observar** | Lido stack inexistente (sem erro lançado, apenas valor `NaN` silencioso) |
| **3. Hipótese** | `<= length` causa `undefined`, `*0.1` e `>100` suspeitos |
| **4. Investigar** | `debug.ts` com `console.log({index, value, subtotal})` + `console.trace` em `undefined` |
| **5. Corrigir** | Menor mudança: `<=`→`<`, `>100`→`>=100`, `*0.1`→`*0.9` |
| **6. Verificar** | 4 cenários + `tsc` + `eslint`, logs temporários removidos |

---

## Evidência da investigação

### Código instrumentado (temporário, já removido)
```typescript
for (let index = 0; index <= prices.length; index++) {
  console.log(`index=${index} | prices[index]=${String(prices[index])} | subtotal antes=${subtotal}`);
  if (prices[index] === undefined) {
    console.trace(`Valor inesperado em index=${index}`);
  }
  subtotal += prices[index]!;
}
```

### Saída
```
[DEBUG] index=0 | prices[index]=40 | subtotal antes=0
[DEBUG] subtotal depois=40
[DEBUG] index=1 | prices[index]=60 | subtotal antes=40
[DEBUG] subtotal depois=100
[DEBUG] index=2 | prices[index]=undefined | subtotal antes=100
Trace: [TRACE] Valor inesperado detectado em index=2
    at calculateTotal (debug.ts:11:15)
[DEBUG] subtotal depois=NaN | isNaN=true
[DEBUG] subtotal final=NaN | condicao (subtotal > 100)=false
Resultado: NaN
```

### Justificativa por pista
- **Compare `prices.length` com o último índice válido:** `length=2` → últimos índices `0,1`; `index=2` é inválido → `undefined`.
- **Resultado de soma com `undefined`:** `100 + undefined = NaN` (JS coercion); contaminou todo cálculo.
- **Valor do desconto vs total após desconto:** `120*0.1=12` (só desconto) ≠ `120*0.9=108` (total correto).
- **Condição inclui exatamente 100?** Original `>100` → `100` não entra; especificação pede `>=100`.

---

## Código corrigido (`Exercicio1/index.ts:1`)

```typescript
function calculateTotal(prices: number[]): number {
  let subtotal = 0;

  for (let index = 0; index < prices.length; index++) {
    subtotal += prices[index]!;
  }

  if (subtotal >= 100) {
    return subtotal * 0.9;
  }

  return subtotal;
}
```

Diferença mínima: 3 tokens alterados. Sem `any`, sem apagar validação, sem `console.log` como correção.

---

## Testes de verificação

```
[20, 30] = 50  | esperado 50                      → compra abaixo do limite
[40, 60] = 90  | esperado 90 (100 -10%)           → exatamente no limite
[80, 40] = 108 | esperado 108 (120 -10%)          → acima do limite
[]       = 0   | esperado 0                       → lista vazia
```

Todos conferem. `npx tsc --noEmit` sem erros, `npx eslint Exercicio1` sem erros, logs temporários removidos.
