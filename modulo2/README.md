# Módulo 2 — Técnicas de Debugging em Node.js e TypeScript

Lista prática com 3 exercícios — códigos com falhas intencionais. Em cada exercício, registrar sintoma, hipótese, evidência e correção.

- [Exercício 1: Debug básico com console.log e console.trace](./Exercicio1/) — concluído
- [Exercício 2: Tratamento de erros com try/catch e AppError](./Exercicio2/) — concluído
- [Exercício 3: Debugging no VS Code com launch.json e ts-node](./Exercicio3/) — concluído

## Como executar (a partir de `modulo2/`)

```bash
npm install          # a partir de TypeScript/modulo2 (reusa node_modules da raiz via hoisting)

npm run ex1          # Exercício 1 — cálculo com desconto
npm run ex2          # Exercício 2 — divisão com AppError
npm run ex3          # Exercício 3 — parcelas com breakpoint
npx tsc --noEmit     # validação de tipos
npx eslint Exercicio1 Exercicio2 Exercicio3
```

## Status

- Exercício 1: Concluído — `calculateTotal` corrigido (`<`, `>=`, `*0.9`), 4 cenários OK
- Exercício 2: Concluído — `AppError` + `validateInput` + `try/catch (unknown)`, `Infinity/NaN` nunca retornados
- Exercício 3: Concluído — `buildInstallments` com breakpoint, Watch `installments.length`, `launch.json` com `ts-node/register`, arredondamento da última parcela

## Estrutura

```
TypeScript/
├── modulo1/         (Módulo 1 — 12 exercícios)
└── modulo2/         (Módulo 2 — Debugging)
    ├── Exercicio1/  (calculateTotal + RESPOSTAS.md)
    ├── Exercicio2/  (AppError + RESPOSTAS.md)
    ├── Exercicio3/  (buildInstallments + launch.json + RESPOSTAS.md)
    ├── package.json
    ├── tsconfig.json
    └── eslint.config.mts
```
