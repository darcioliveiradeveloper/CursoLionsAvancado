import type { Request, Response, NextFunction } from "express";

// ========== EXERCÍCIO 7: MIDDLEWARE COM TIPAGEM ==========

// Middleware: função executada entre a chegada da requisição e a resposta.
// O logger apenas observa a requisição, registra informações e libera o fluxo.

export function loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
  const timestamp: string = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
}