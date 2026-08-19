// ========== TIPOS PRIMITIVOS ==========

// String para nome do produto
const nomeProduto: string = "Teclado Mecânico";

// Number para preço do produto
const precoProduto: number = 450.99;

// Boolean indicando se está em estoque
const emEstoque: boolean = true;

// Array de strings para categorias
const categoriasProduto: string[] = [
  "Eletrônicos",
  "Periféricos",
  "Informática",
];

// Tupla para coordenadas (latitude, longitude)
const coordenadas: [number, number] = [-23.5505, -46.6333];

// ========== ENUM PARA STATUS DE PEDIDO ==========
enum StatusPedido {
  Pendente = "Pendente",
  Processando = "Processando",
  Entregue = "Entregue",
  Cancelado = "Cancelado",
}

// ========== FUNÇÃO COM TIPOS ==========
function formatarProduto(nome: string, preco: number): string {
  return `O produto ${nome} custa R$ ${preco.toFixed(2)}`;
}

// Exportar para uso no index.ts usando CommonJS
module.exports = {
  nomeProduto,
  precoProduto,
  emEstoque,
  categoriasProduto,
  coordenadas,
  StatusPedido,
  formatarProduto,
};
