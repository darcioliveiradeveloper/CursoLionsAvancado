function calculateTotal(prices: number[]): number {
  let subtotal = 0;

  for (let index = 0; index < prices.length; index++) {
    subtotal += prices[index]!;
  }

  if (subtotal >= 100) {
    return subtotal * 0.9;
  }

  return subtotal;
}

// Cenarios minimos + verificacao
console.log("[20, 30] =", calculateTotal([20, 30]), "| esperado 50");
console.log("[40, 60] =", calculateTotal([40, 60]), "| esperado 90 (100 -10%)");
console.log("[80, 40] =", calculateTotal([80, 40]), "| esperado 108 (120 -10%)");
console.log("[] =", calculateTotal([]), "| esperado 0");
