import { fetchCountries } from "./api.js";
import { searchByName, filterByRegion } from "./filters.js";
import type { ICountry } from "./types.js";

// ========== EXERCÍCIO 6.1: CONSUMO DE API E FILTROS ==========

async function main(): Promise<void> {
  console.log("\n========== EXERCÍCIO 6.1: Consumo de API ==========");

  console.log("\nBuscando países na API...");
  const countries: ICountry[] = await fetchCountries();

  if (countries.length === 0) {
    console.log("Nenhum país encontrado.");
    return;
  }

  console.log(`Total de países carregados: ${countries.length}`);

  // Pesquisa por nome
  const searchTerm: string = "bra";
  const searchResults: ICountry[] = searchByName(countries, searchTerm);
  console.log(`\n--- Pesquisa por "${searchTerm}" (${searchResults.length} resultado(s)) ---`);
  searchResults.forEach((c) => {
    console.log(`  ${c.name} - Região: ${c.region}`);
  });

  // Filtro por região
  const regionFilter: ICountry[] = filterByRegion(countries, "Europe");
  console.log(`\n--- Países da Europa (${regionFilter.length} resultado(s)) ---`);
  regionFilter.slice(0, 5).forEach((c) => {
    console.log(`  ${c.name} - Capital: ${c.capital ?? "N/A"}`);
  });
  console.log("  ... (mostrando apenas 5)");

  console.log("\n================================================\n");
}

main();
