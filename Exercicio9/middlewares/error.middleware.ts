import type { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error.js";

// ========== EXERCÍCIO 9: MIDDLEWARE GLOBAL DE ERROS ==========
// O Express reconhece um middleware de erro pela presença de 4 parâmetros.
// Mesmo quando um parâmetro não é usado, ele deve permanecer na assinatura.

export const errorMiddleware: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  console.error("Erro inesperado:", err);
  res.status(500).json({ message: "Erro interno do servidor" });
};