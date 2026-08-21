import type { ICountry, Region } from "./types.js"; // Importa os tipos ICountry e Region do arquivo types.js

export function searchByName(countries: ICountry[], term: string): ICountry[] { // Função que busca países pelo nome, recebendo um array de países e um termo de busca
  const lowerTerm: string = term.toLowerCase(); // Converte o termo de busca para minúsculas para permitir uma busca case-insensitive
  return countries.filter((country) => // Filtra os países cujo nome inclui o termo de busca (case-insensitive)
    country.name.toLowerCase().includes(lowerTerm) // Converte o nome do país para minúsculas e verifica se inclui o termo de busca
  ); // Retorna o array de países que correspondem à busca
} // Função que filtra países por região, recebendo um array de países e uma região específica
// Retorna um array de países que pertencem à região especificada
export function filterByRegion(countries: ICountry[], region: Region): ICountry[] { // Função que filtra países por região, recebendo um array de países e uma região específica
  return countries.filter((country) => country.region === region); // Filtra os países cujo campo region é igual à região especificada
} // Retorna um array de países que pertencem à região especificada

