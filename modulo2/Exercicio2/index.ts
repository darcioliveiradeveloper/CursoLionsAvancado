interface DivisionInput {
  numerator: number;
  denominator: number;
}

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

function validateInput(rawInput: unknown): DivisionInput {
  if (typeof rawInput !== "object" || rawInput === null) {
    throw new AppError("Entrada deve ser um objeto com numerator e denominator", 400);
  }

  const input = rawInput as Record<string, unknown>;

  if (!("numerator" in input) || !("denominator" in input)) {
    throw new AppError("Campos obrigatorios: numerator e denominator", 400);
  }

  if (!isValidNumber(input.numerator)) {
    throw new AppError("numerator deve ser um numero valido e finito", 400);
  }

  if (!isValidNumber(input.denominator)) {
    throw new AppError("denominator deve ser um numero valido e finito", 400);
  }

  if (input.denominator === 0) {
    throw new AppError("Denominador nao pode ser zero", 400);
  }

  return { numerator: input.numerator, denominator: input.denominator };
}

function divide(input: DivisionInput): number {
  const result = input.numerator / input.denominator;

  if (!Number.isFinite(result)) {
    throw new AppError("Resultado invalido (Infinity/NaN)", 400);
  }

  return result;
}

function execute(rawInput: unknown): void {
  try {
    const input = validateInput(rawInput);
    const result = divide(input);
    console.log(`Sucesso: ${input.numerator} / ${input.denominator} = ${result}`);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      // Erro esperado: mensagem segura para o usuario, statusCode, sem stack
      console.log(`[AppError ${error.statusCode}] ${error.message}`);
    } else {
      // Erro inesperado: resposta generica ao usuario + log interno completo
      console.log("[ERRO INESPERADO] Erro interno do servidor");
      console.error(error);
    }
  }
}

// === Verificacao: 4+ cenarios ===
console.log("=== CENARIOS ===");

console.log("\n[1] denominador zero {10, 0} -> deve ser AppError 400:");
execute({ numerator: 10, denominator: 0 });

console.log("\n[2] entrada undefined -> AppError 400:");
execute(undefined);

console.log("\n[3] tipos incorretos {numerator: '10', denominator: 2} -> AppError 400:");
execute({ numerator: "10", denominator: 2 });

console.log("\n[4] denominador null -> AppError 400:");
execute({ numerator: 10, denominator: null });

console.log("\n[5] numerator NaN -> AppError 400:");
execute({ numerator: NaN, denominator: 2 });

console.log("\n[6] valido {10, 2} -> 5:");
execute({ numerator: 10, denominator: 2 });

console.log("\n[7] valido {7, 2} -> 3.5:");
execute({ numerator: 7, denominator: 2 });
