import { describe, it, expect } from "vitest";
import {
  nomeProduto,
  precoProduto,
  emEstoque,
  categoriasProduto,
  coordenadas,
  StatusPedido,
  formatarProduto,
} from "./data.js";

describe("data.ts", () => {
  it("nomeProduto deve ser uma string", () => {
    expect(typeof nomeProduto).toBe("string");
    expect(nomeProduto).toBe("Teclado Mecânico");
  });

  it("precoProduto deve ser um number", () => {
    expect(typeof precoProduto).toBe("number");
    expect(precoProduto).toBe(450.99);
  });

  it("emEstoque deve ser um boolean", () => {
    expect(typeof emEstoque).toBe("boolean");
    expect(emEstoque).toBe(true);
  });

  it("categoriasProduto deve ser um array de strings", () => {
    expect(Array.isArray(categoriasProduto)).toBe(true);
    expect(categoriasProduto).toHaveLength(3);
    categoriasProduto.forEach((cat: string) => {
      expect(typeof cat).toBe("string");
    });
  });

  it("coordenadas deve ser uma tupla [number, number]", () => {
    expect(coordenadas).toHaveLength(2);
    expect(typeof coordenadas[0]).toBe("number");
    expect(typeof coordenadas[1]).toBe("number");
    expect(coordenadas).toEqual([-23.5505, -46.6333]);
  });

  it("StatusPedido deve ter os valores corretos", () => {
    expect(StatusPedido.Pendente).toBe("Pendente");
    expect(StatusPedido.Processando).toBe("Processando");
    expect(StatusPedido.Entregue).toBe("Entregue");
    expect(StatusPedido.Cancelado).toBe("Cancelado");
  });

  it("formatarProduto deve formatar corretamente", () => {
    const resultado = formatarProduto("Mouse", 99.9);
    expect(resultado).toBe("O produto Mouse custa R$ 99.90");
  });

  it("formatarProduto deve formatar com 2 casas decimais", () => {
    const resultado = formatarProduto("Teclado", 50);
    expect(resultado).toBe("O produto Teclado custa R$ 50.00");
  });
});
