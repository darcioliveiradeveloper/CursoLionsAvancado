// ========== EXERCÍCIO 9: AppError ==========
// Representa uma falha conhecida pela aplicação (ex: produto inexistente,
// preço inválido). Diferente de Error, transporta o código HTTP que será
// usado na resposta.

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    // Garante que instanceof funcione corretamente ao transpilar para ES5.
    Object.setPrototypeOf(this, new.target.prototype);
  }
}