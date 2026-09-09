import type { IUser, IProduct } from "./types.js";

/*
Exercício 4.1: Generics
Objetivo: Criar funções genéricas reutilizáveis.
📝 Especificações:
● Crie getData<T>(items: T[]): T[] que recebe um array e retorna o mesmo array
● Crie getById<T extends { id: number }>(items: T[], id: number): T | undefined
● Demonstre com arrays de strings, numbers e objetos IUser/IProduct
*/

function getData<T>(items: T[]): T[] {
  return items;
}

function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

const nomesGenericos: string[] = getData(["Alice", "Bob", "Charlie"]);
const numerosGenericos: number[] = getData([10, 20, 30]);
const usuariosGenericos: IUser[] = getData([
  { id: 1, name: "Ana", email: "ana@example.com", isActive: true },
  { id: 2, name: "Bruno", email: "bruno@example.com", isActive: false },
]);

const usuarioEncontrado: IUser | undefined = getById(usuariosGenericos, 1);
const produtoEncontrado: IProduct | undefined = getById(
  [
    { id: 101, name: "Notebook", price: 3500, inStock: true, categories: ["TI"] },
    { id: 102, name: "Mouse", price: 80, inStock: false, categories: ["Periféricos"] },
  ],
  102,
);

console.log("\n========== EXERCÍCIO 4.1: Generics ==========");

console.log("\n--- getData<T> ---");
console.log("Strings:", nomesGenericos);
console.log("Numbers:", numerosGenericos);
console.log("Usuarios:", usuariosGenericos);

console.log("\n--- getById<T> ---");
if (usuarioEncontrado) {
  console.log(`Usuário encontrado: ${usuarioEncontrado.name} (${usuarioEncontrado.email})`);
}
if (produtoEncontrado) {
  console.log(`Produto encontrado: ${produtoEncontrado.name} - R$ ${produtoEncontrado.price}`);
}

const inexistente: IUser | undefined = getById(usuariosGenericos, 999);
console.log(`Busca inexistente: ${inexistente === undefined ? "undefined" : inexistente}`);
console.log("================================================\n");
