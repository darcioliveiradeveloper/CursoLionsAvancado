"use strict";
// ========== TYPES ==========
// ========== API ==========
const API_URL = "https://countries.dev/countries";
async function fetchCountries() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erro na requisicao: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            console.error("Resposta da API nao e um array:", typeof data);
            return [];
        }
        return data;
    }
    catch (error) {
        console.error("Falha ao buscar paises:", error);
        return [];
    }
}
// ========== HELPERS ==========
function getFlagUrl(country) {
    return `https://flagcdn.com/w320/${country.alpha2Code.toLowerCase()}.png`;
}
function getNamePt(country) {
    return country.translations?.pt ?? country.name;
}
// ========== FILTROS ==========
function searchByName(countries, term) {
    const lowerTerm = term.toLowerCase();
    return countries.filter((country) => getNamePt(country).toLowerCase().includes(lowerTerm));
}
function filterByRegion(countries, region) {
    return countries.filter((country) => country.region === region);
}
// ========== DOM ==========
function renderCountries(countries) {
    const container = document.getElementById("countries");
    const info = document.getElementById("info");
    if (!container || !info)
        return;
    if (countries.length === 0) {
        container.innerHTML = '<div class="error">Nenhum pais encontrado</div>';
        info.textContent = "";
        return;
    }
    info.textContent = `${countries.length} pais(es) encontrado(s)`;
    container.innerHTML = countries
        .map((country) => `
    <div class="country">
      <img class="flag" src="${getFlagUrl(country)}" alt="Bandeira de ${getNamePt(country)}" width="80" height="50">
      <h3>${getNamePt(country)}</h3>
      <p><strong>Regiao:</strong> ${country.region}</p>
      <p><strong>Capital:</strong> ${country.capital ?? "N/A"}</p>
      <p><strong>Populacao:</strong> ${country.population.toLocaleString("pt-BR")}</p>
    </div>
  `)
        .join("");
}
// ========== INICIALIZACAO ==========
let allCountries = [];
function applyFilters() {
    const searchInput = document.getElementById("searchInput");
    const regionSelect = document.getElementById("regionSelect");
    let filtered = allCountries;
    if (searchInput?.value) {
        filtered = searchByName(filtered, searchInput.value);
    }
    if (regionSelect?.value) {
        filtered = filterByRegion(filtered, regionSelect.value);
    }
    renderCountries(filtered);
}
function clearFilters() {
    const searchInput = document.getElementById("searchInput");
    const regionSelect = document.getElementById("regionSelect");
    if (searchInput)
        searchInput.value = "";
    if (regionSelect)
        regionSelect.value = "";
    renderCountries(allCountries);
}
async function init() {
    const container = document.getElementById("countries");
    if (container) {
        container.innerHTML = '<div class="loading">Carregando paises...</div>';
    }
    allCountries = await fetchCountries();
    renderCountries(allCountries);
    const searchBtn = document.getElementById("searchBtn");
    const clearBtn = document.getElementById("clearBtn");
    searchBtn?.addEventListener("click", applyFilters);
    clearBtn?.addEventListener("click", clearFilters);
}
init();
