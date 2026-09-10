function buildInstallments(total: number, quantity: number): number[] {
  if (!Number.isFinite(total) || !Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("Parametros invalidos: total deve ser numero finito e quantity inteiro > 0");
  }

  const baseValue = Number((total / quantity).toFixed(2));
  const installments: number[] = [];

  for (let number = 1; number < quantity; number++) {
    installments.push(baseValue);
  }

  const lastValue = Number((total - baseValue * (quantity - 1)).toFixed(2));
  installments.push(lastValue);

  return installments;
}

function sum(values: number[]): number {
  return Number(values.reduce((acc, cur) => acc + cur, 0).toFixed(2));
}

// === Verificacao ===
console.log("buildInstallments(100, 3) =", buildInstallments(100, 3), "| soma =", sum(buildInstallments(100, 3)));
console.log("buildInstallments(100, 2) =", buildInstallments(100, 2), "| soma =", sum(buildInstallments(100, 2)));
console.log("buildInstallments(100, 1) =", buildInstallments(100, 1), "| soma =", sum(buildInstallments(100, 1)));
console.log("buildInstallments(10, 3)  =", buildInstallments(10, 3), "| soma =", sum(buildInstallments(10, 3)));
