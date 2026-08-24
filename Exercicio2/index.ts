/*
Exercício 2.1: Tipos Primitivos e Estruturados
Objetivo: Declarar variáveis com tipos primitivos e estruturados:
● String para nome do produto
● Number para preço do produto
● Boolean indicando estoque
● Array de strings para categorias
● Tupla para coordenadas (latitude e longitude)
● Enum para status de pedido
*/

const nomeProduto: string = "Teclado Mecânico";
const precoProduto: number = 450.99;
const emEstoque: boolean = true;
const categorias: string[] = ["Eletrônicos", "Periféricos", "Informática"];
const coordenadas: [number, number] = [-23.5505, -46.6333];

enum StatusPedido {
  Pendente = "Pendente",
  Processando = "Processando",
  Entregue = "Entregue",
  Cancelado = "Cancelado",
}

console.log("\n========== EXERCÍCIO 2.1: Tipos Primitivos e Estruturados ==========");
console.log(`Nome: ${nomeProduto}`);
console.log(`Preço: R$ ${precoProduto}`);
console.log(`Em Estoque: ${emEstoque ? "Sim" : "Não"}`);
console.log(`Categorias: ${categorias.join(", ")}`);
console.log(`Coordenadas: Lat ${coordenadas[0]}, Long ${coordenadas[1]}`);
console.log(`Status de Pedido: ${StatusPedido.Entregue}`);
console.log("=====================================================================\n");

/*
Exercício 2.2: Função Tipada
Objetivo: Criar funções com tipagem adequada nos parâmetros e no retorno.
📝 Especificações:
● Crie a função saudar com parâmetros nome (string) e idade (number)
● Tipar o retorno da função como string
● Crie uma função formatarProduto que receba nome e preço
*/

function saudar(nome: string, idade: number): string {
  return `Bem-vindo, ${nome}! Você tem ${idade} anos.`;
}

function formatarProduto(nome: string, preco: number): string {
  return `O produto ${nome} custa R$ ${preco.toFixed(2)}`;
}

const resultadoSaudacao: string = saudar("Darci", 25);
const resultadoFormatado: string = formatarProduto("Mouse", 89.9);

console.log("\n========== EXERCÍCIO 2.2: Função Tipada ==========");
console.log("✓ Parâmetros e retorno tipados");
console.log("\nMensagem de boas-vindas:");
console.log(resultadoSaudacao);
console.log("\nProduto formatado:");
console.log(resultadoFormatado);
console.log("===================================================\n");
