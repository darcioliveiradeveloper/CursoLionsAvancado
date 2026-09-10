# Exercício 3 — Debugging com VS Code

## Registro obrigatório

**Sintoma:**
`buildInstallments(100, 3)` retorna `[33.33, 33.33]` (2 parcelas) em vez de 3 parcelas que somem `100`.

**Passos para reproduzir:**
1. Criar `Exercicio3/index.ts` com a função exatamente como no enunciado (`for (number=1; number < quantity; number++)`).
2. Executar `npx tsx Exercicio3/index.ts` (ou `node -r ts-node/register Exercicio3/index.ts` via `launch.json`).
3. Observar `console.log(buildInstallments(100,3))`.

**Resultado esperado:**
`[33.33, 33.33, 33.34]` (ou 3 parcelas que somem 100).

**Resultado obtido:**
`[33.33, 33.33]` length `2`, soma `66.66`.

**Hipótese:**
Loop `number < quantity` com início `1` itera `1..quantity-1` → para `quantity=3` só 2 iterações. Falta uma parcela. Suspeita adicional de erro de centavos após corrigir quantidade (`33.33*3=99.99`).

**Ferramenta utilizada:**
VS Code Debugger (launch.json `Debug TypeScript` com `ts-node/register`), breakpoint dentro do `for`, painel **Watch** (`installments.length`), **Step Over** e **Call Stack**.

**Causa encontrada:**
`for (let number = 1; number < quantity; number++)` → condição `<` exclui o último valor. Com `quantity=3`, valores `1,2` (2 iterações) em vez de `1,2,3` (3). Após corrigir para produzir `quantity` parcelas, segundo erro: `33.33*3 = 99.99` difere de `100` por `0.01` devido a `toFixed(2)`.

**Como a correção foi validada:**
Alterado para `for (n=1; n < quantity; n++) push(base)` + `push(last = total - base*(quantity-1))` (última parcela ajustada). Executado:
```
buildInstallments(100,3) = [33.33,33.33,33.34] soma=100
buildInstallments(100,2) = [50,50] soma=100
buildInstallments(100,1) = [100] soma=100
buildInstallments(10,3)  = [3.33,3.33,3.34] soma=10
```
`npx tsc --noEmit` e `npx eslint Exercicio3` OK; `node -r ts-node/register` via `launch.json` executa; logs temporários (`debug.ts`) removidos.

---

## Preparação

Instalado `ts-node@10.9.2` (`npm install -D ts-node`) ao lado de `typescript` e `@types/node` já presentes. Criado `.vscode/launch.json` na raiz (`TypeScript/.vscode/launch.json:1`):

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug TypeScript",
      "runtimeArgs": ["-r", "ts-node/register"],
      "args": ["${workspaceFolder}/modulo2/Exercicio3/index.ts"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

`runtimeArgs: ["-r","ts-node/register"]` carrega `ts-node` no processo Node antes de executar; `args` aponta o arquivo TS a depurar; `cwd` é `workspaceFolder` (`TypeScript/`).

---

## Investigação com breakpoint

**Breakpoint:** linha `installments.push(installmentValue);` dentro do `for` (`Exercicio3/index.ts:8` na versão buggy).

**Execução:** `Run and Debug > Debug TypeScript` (F5). O debugger para na linha a cada iteração.

**Valores observados (duas iterações):**

| Iteração | `number` | `quantity` | `installmentValue` | `installments` antes | `installments.length` (Watch) | `number < quantity` |
|----------|----------|------------|--------------------|----------------------|-------------------------------|---------------------|
| 1ª       | 1        | 3          | 33.33              | []                   | 0                             | true → push |
| 2ª       | 2        | 3          | 33.33              | [33.33]              | 1                             | true → push |
| (fim)    | 3        | 3          | —                  | [33.33,33.33]        | 2                             | false → não entra |

**Step Over (F10):** avança uma linha por vez sem entrar dentro de `push`; permitiu ver `installments.length` mudar `0→1→2` e parar. Se usado **Step Into** (F11) entraria dentro de `Array.prototype.push`; **Step Out** (Shift+F11) sairia da função atual.

**Watch:** `installments.length` adicionado ao painel Watch — atualiza a cada parada, evidenciou que nunca chegou a `3`.

**Call Stack durante o exercício:**
```
buildInstallments (Exercicio3/index.ts:1)
  <anonymous> (Exercicio3/index.ts:12)
```
Sem chamadas aninhadas; mostra a pilha única da função em execução.

**Vantagem do breakpoint sobre vários `console.log`:**
Inspeciona estado completo sem poluir código, sem reexecutar para cada log, permite alterar variáveis em tempo real, ver histórico de chamadas e watch dinâmico; `console.log` exige editar, recarregar e deixa lixo se esquecido.

---

## Correção aplicada

**Erro 1 — quantidade:** trocar lógica para produzir exatamente `quantity` parcelas. Mínimo seria `number <= quantity`, mas isso ainda deixa erro de centavos. Correção completa incorpora desafio monetário:

```typescript
function buildInstallments(total: number, quantity: number): number[] {
  if (!Number.isFinite(total) || !Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("Parametros invalidos");
  }
  const baseValue = Number((total / quantity).toFixed(2));
  const installments: number[] = [];
  for (let number = 1; number < quantity; number++) {
    installments.push(baseValue); // quantity-1 vezes
  }
  const lastValue = Number((total - baseValue * (quantity - 1)).toFixed(2));
  installments.push(lastValue); // ajusta centavos
  return installments;
}
```

**Erro 2 — arredondamento monetário:** `100/3=33.333... → toFixed(2)=33.33`; `33.33*3=99.99`. Regra proposta: todas as parcelas recebem `baseValue` exceto a última, que recebe `total - base*(quantity-1)`, absorvendo o resíduo de centavos. Alternativa equivalente em centavos inteiros (`Math.round(total*100/quantity)/100`). Garante `soma === total` e `length === quantity`.

Evidência pós-correção:
```
buildInstallments(100, 3) = [33.33,33.33,33.34] soma=100
buildInstallments(10, 3)  = [3.33,3.33,3.34]   soma=10
buildInstallments(100, 2) = [50,50]           soma=100
```

---

## Respostas às 5 perguntas

**Step Into, Step Over, Step Out?**
- **Step Into (F11):** entra dentro da próxima chamada (ex.: dentro de `push`).
- **Step Over (F10):** executa a linha atual inteira sem entrar, pausa na próxima linha da mesma função (usado no `for`).
- **Step Out (Shift+F11):** termina a função atual e pausa no chamador.

**Para que serve o painel Watch?**
Avalia expressões arbitrárias a cada parada (`installments.length`, `total/quantity`, `number < quantity`). Mostra evolução sem precisar pairar sobre variáveis; ideal para invariantes como tamanho do array.

**O que aparece na Call Stack?**
`buildInstallments` no topo, abaixo `ModuleJob.run` / `<anonymous>` do entry point (`index.ts:12`). Sem recursão; confirma que estamos dentro da função alvo.

**Vantagem do breakpoint sobre `console.log`?**
Não modifica código, não exige rebuild a cada inspeção, mostra todas as variáveis locais/escopo, permite edição em tempo de depuração e navegação por pilha; `console.log` é estático, poluente e esquecido.

**Por que arredondamento monetário merece regra própria?**
`toFixed(2)` por parcela introduz erro acumulado de centavos (`0.01` em `100/3`). Dinheiro exige soma exata; regra de “última parcela = total - soma das anteriores” (ou cálculo em centavos inteiros) evita diferença que, em faturamento, gera divergência contábil.

---

## Checklist entregue

- `launch.json` com `runtimeArgs: ["-r","ts-node/register"]` e `args` para `Exercicio3/index.ts`
- Breakpoint dentro do `for`, 2 iterações documentadas, Watch `installments.length`
- Correção de quantidade + ajuste de centavos, 4 testes com soma verificada
