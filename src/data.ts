// ========== TIPOS PRIMITIVOS ==========

// String para nome do produto
export const nomeProduto: string = "Teclado Mecânico";

// Number para preço do produto
export const precoProduto: number = 450.99;

// Boolean indicando se está em estoque
export const emEstoque: boolean = true;

// Array de strings para categorias
export const categoriasProduto: string[] = [
  "Eletrônicos",
  "Periféricos",
  "Informática",
];

// Tupla para coordenadas (latitude, longitude)
export const coordenadas: [number, number] = [-23.5505, -46.6333];

// ========== ENUM PARA STATUS DE PEDIDO ==========
export enum StatusPedido {
  Pendente = "Pendente",
  Processando = "Processando",
  Entregue = "Entregue",
  Cancelado = "Cancelado",
}

// ========== FUNÇÃO COM TIPOS ==========
export function formatarProduto(nome: string, preco: number): string {
  return `O produto ${nome} custa R$ ${preco.toFixed(2)}`;
}
