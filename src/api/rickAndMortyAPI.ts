import { RickAndMortyAPIData, Character, Episode } from "@/types/rickAndMortyTypes";

const baseUrl = "https://rickandmortyapi.com/api/";

export async function getCharactersByPage(page: number): Promise<RickAndMortyAPIData<Character[]>> {
  try {
    const response = await fetch(`${baseUrl}/character/?page=${page}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getEpisodesByPage(page: number): Promise<RickAndMortyAPIData<Episode[]>> {
  try {
    const response = await fetch(`${baseUrl}/episode?page=${page}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
