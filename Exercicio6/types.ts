export type Region = "Africa" | "Americas" | "Asia" | "Europe" | "Oceania";

export interface ICountry {
  name: string;
  region: string;
  capital?: string;
  population: number;
  flag: string;
  flags: { png: string; svg: string };
}
