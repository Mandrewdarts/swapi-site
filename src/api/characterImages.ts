/**
 * Fetches character images from akabab/starwars-api (Fandom CDN).
 * starwars-visualguide.com is no longer available (domain redirects elsewhere).
 */

const AKABAB_ALL = 'https://akabab.github.io/starwars-api/api/all.json';

export interface AkababCharacter {
  id: number;
  name: string;
  image: string;
  [key: string]: unknown;
}

let cachedMap: Map<string, string> | null = null;

export async function fetchCharacterImageMap(): Promise<Map<string, string>> {
  if (cachedMap) return cachedMap;
  const res = await fetch(AKABAB_ALL);
  if (!res.ok) throw new Error(`Failed to fetch character images: ${res.status}`);
  const data = (await res.json()) as AkababCharacter[];
  cachedMap = new Map(data.map((c) => [c.name, c.image]));
  return cachedMap;
}

export function getCharacterImageUrl(name: string, map: Map<string, string> | null): string {
  if (!map) return 'https://placehold.co/400x500/1a1a2e/4a5568?text=Loading';
  const url = map.get(name);
  return url ?? 'https://placehold.co/400x500/1a1a2e/4a5568?text=No+Image';
}
