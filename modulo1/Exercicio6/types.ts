export type Region = "Africa" | "Americas" | "Asia" | "Europe" | "Oceania";

export interface ICountry {
  name: string;
  region: string;
  capital?: string;
  population: number;
  alpha2Code: string;
  translations: { pt: string };
  flags: { png: string; svg: string };
}
