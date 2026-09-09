// ========== TYPES ==========

type Region = "Africa" | "Americas" | "Asia" | "Europe" | "Oceania";

interface ICountry {
  name: string;
  region: string;
  capital?: string;
  population: number;
  alpha2Code: string;
  translations: { pt: string };
  flags: { png: string; svg: string };
}

// ========== API ==========

const API_URL: string = "https://countries.dev/countries";

async function fetchCountries(): Promise<ICountry[]> {
  try {
    const response: Response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Erro na requisicao: ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      console.error("Resposta da API nao e um array:", typeof data);
      return [];
    }

    return data as ICountry[];
  } catch (error) {
    console.error("Falha ao buscar paises:", error);
    return [];
  }
}

// ========== HELPERS ==========

function getFlagUrl(country: ICountry): string {
  return `https://flagcdn.com/w320/${country.alpha2Code.toLowerCase()}.png`;
}

function getNamePt(country: ICountry): string {
  return country.translations?.pt ?? country.name;
}

// ========== FILTROS ==========

function searchByName(countries: ICountry[], term: string): ICountry[] {
  const lowerTerm: string = term.toLowerCase();
  return countries.filter((country) =>
    getNamePt(country).toLowerCase().includes(lowerTerm)
  );
}

function filterByRegion(countries: ICountry[], region: Region): ICountry[] {
  return countries.filter((country) => country.region === region);
}

// ========== DOM ==========

function renderCountries(countries: ICountry[]): void {
  const container: HTMLElement | null = document.getElementById("countries");
  const info: HTMLElement | null = document.getElementById("info");

  if (!container || !info) return;

  if (countries.length === 0) {
    container.innerHTML = '<div class="error">Nenhum pais encontrado</div>';
    info.textContent = "";
    return;
  }

  info.textContent = `${countries.length} pais(es) encontrado(s)`;

  container.innerHTML = countries
    .map(
      (country) => `
    <div class="country">
      <img class="flag" src="${getFlagUrl(country)}" alt="Bandeira de ${getNamePt(country)}" width="80" height="50">
      <h3>${getNamePt(country)}</h3>
      <p><strong>Regiao:</strong> ${country.region}</p>
      <p><strong>Capital:</strong> ${country.capital ?? "N/A"}</p>
      <p><strong>Populacao:</strong> ${country.population.toLocaleString("pt-BR")}</p>
    </div>
  `
    )
    .join("");
}

// ========== INICIALIZACAO ==========

let allCountries: ICountry[] = [];

function applyFilters(): void {
  const searchInput: HTMLInputElement | null = document.getElementById("searchInput") as HTMLInputElement | null;
  const regionSelect: HTMLSelectElement | null = document.getElementById("regionSelect") as HTMLSelectElement | null;

  let filtered: ICountry[] = allCountries;

  if (searchInput?.value) {
    filtered = searchByName(filtered, searchInput.value);
  }

  if (regionSelect?.value) {
    filtered = filterByRegion(filtered, regionSelect.value as Region);
  }

  renderCountries(filtered);
}

function clearFilters(): void {
  const searchInput: HTMLInputElement | null = document.getElementById("searchInput") as HTMLInputElement | null;
  const regionSelect: HTMLSelectElement | null = document.getElementById("regionSelect") as HTMLSelectElement | null;

  if (searchInput) searchInput.value = "";
  if (regionSelect) regionSelect.value = "";

  renderCountries(allCountries);
}

async function init(): Promise<void> {
  const container: HTMLElement | null = document.getElementById("countries");

  if (container) {
    container.innerHTML = '<div class="loading">Carregando paises...</div>';
  }

  allCountries = await fetchCountries();
  renderCountries(allCountries);

  const searchBtn: HTMLElement | null = document.getElementById("searchBtn");
  const clearBtn: HTMLElement | null = document.getElementById("clearBtn");

  searchBtn?.addEventListener("click", applyFilters);
  clearBtn?.addEventListener("click", clearFilters);
}

init();
