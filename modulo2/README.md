# Módulo 2 — Técnicas de Debugging em Node.js e TypeScript

Lista prática com 3 exercícios — códigos com falhas intencionais. Em cada exercício, registrar sintoma, hipótese, evidência e correção.

- [Exercício 1: Debug básico com console.log e console.trace](./Exercicio1/)
- Exercício 2: Tratamento de erros com try/catch e AppError (a fazer)
- Exercício 3: Debugging no VS Code com launch.json e ts-node (a fazer)

## Como executar (a partir de `modulo2/`)

```bash
npm install          # a partir de TypeScript/modulo2 (reusa node_modules da raiz via hoisting)

npm run ex1          # Exercício 1 — cálculo com desconto
npx tsc --noEmit     # validação de tipos
npx eslint Exercicio1
```

## Status

- Exercício 1: Concluído — `calculateTotal` corrigido (`<`, `>=`, `*0.9`), 4 cenários OK, `debug.ts` removido
- Exercício 2: Pendente
- Exercício 3: Pendente

## Estrutura

```
TypeScript/
├── modulo1/         (Módulo 1 — 12 exercícios)
└── modulo2/         (Módulo 2 — Debugging)
    ├── Exercicio1/  (calculateTotal + RESPOSTAS.md)
    ├── Exercicio2/  (vazio)
    ├── Exercicio3/  (vazio)
    ├── package.json
    ├── tsconfig.json
    └── eslint.config.mts
```
