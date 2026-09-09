import type { ICountry } from "./types.js";

const API_URL: string = "https://countries.dev/countries";

export async function fetchCountries(): Promise<ICountry[]> {
  try {
    const response: Response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      console.error("Resposta da API não é um array:", typeof data);
      return [];
    }

    return data as ICountry[];
  } catch (error) {
    console.error("Falha ao buscar países:", error);
    return [];
  }
}
