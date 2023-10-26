export type CharacterLocation = {
  name: string;
  url: string;
};

export type Character = {
  id: number;
  name: string;
  url: string;
  created: string;
  status: "Dead" | "Alive" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
};

export type Episode = {
  id: number;
  name: string;
  url: string;
  created: string;
  air_date: string;
  episode: string;
  characters: string[];
};

export type RickAndMortyAPIData<T> = {
  info?: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results?: T;
};
