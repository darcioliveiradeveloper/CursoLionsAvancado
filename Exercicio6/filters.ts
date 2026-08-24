import type { ICountry, Region } from "./types.js";

export function searchByName(countries: ICountry[], term: string): ICountry[] {
  const lowerTerm: string = term.toLowerCase();
  return countries.filter((country) =>
    country.name.toLowerCase().includes(lowerTerm)
  );
}

export function filterByRegion(countries: ICountry[], region: Region): ICountry[] {
  return countries.filter((country) => country.region === region);
}
