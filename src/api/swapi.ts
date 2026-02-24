import type { Person, Film, Planet, Vehicle, Starship, PaginatedResponse } from '../types/swapi';

const BASE_URL = 'https://swapi.dev/api';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`SWAPI error: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function fetchPeople(page = 1, search?: string): Promise<PaginatedResponse<Person>> {
  const params = new URLSearchParams();
  params.set('page', String(page));
  if (search) params.set('search', search);
  const url = `${BASE_URL}/people/?${params}`;
  return fetchJson<PaginatedResponse<Person>>(url);
}

export async function fetchPlanets(page = 1): Promise<PaginatedResponse<Planet>> {
  const url = `${BASE_URL}/planets/?page=${page}`;
  return fetchJson<PaginatedResponse<Planet>>(url);
}

export async function fetchFilms(): Promise<Film[]> {
  const data = await fetchJson<PaginatedResponse<Film>>(`${BASE_URL}/films/`);
  return data.results.sort((a, b) => a.episode_id - b.episode_id);
}

export async function fetchVehicles(page = 1): Promise<PaginatedResponse<Vehicle>> {
  const url = `${BASE_URL}/vehicles/?page=${page}`;
  return fetchJson<PaginatedResponse<Vehicle>>(url);
}

export async function fetchStarships(page = 1): Promise<PaginatedResponse<Starship>> {
  const url = `${BASE_URL}/starships/?page=${page}`;
  return fetchJson<PaginatedResponse<Starship>>(url);
}

export async function fetchPlanet(url: string): Promise<Planet> {
  return fetchJson<Planet>(url);
}
