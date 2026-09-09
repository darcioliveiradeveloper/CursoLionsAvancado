import type { ICountry, Region } from "./types.js";

function getNamePt(country: ICountry): string {
  return country.translations?.pt ?? country.name;
}

export function searchByName(countries: ICountry[], term: string): ICountry[] {
  const lowerTerm: string = term.toLowerCase();
  return countries.filter((country) =>
    getNamePt(country).toLowerCase().includes(lowerTerm)
  );
}

export function filterByRegion(countries: ICountry[], region: Region): ICountry[] {
  return countries.filter((country) => country.region === region);
}
