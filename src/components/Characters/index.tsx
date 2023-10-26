"use client";

import { useEpisode } from "@/contexts/EpisodeProvider";
import { Character, RickAndMortyAPIData } from "@/types/rickAndMortyTypes";
import styles from "./Characters.module.css";
import { use } from "react";
import { useState, useEffect } from "react";
import CharacterProfile from "../CharacterProfile";

type CharactersProps = {
  characterPromise: Promise<RickAndMortyAPIData<Character[]>>;
};

export default function Characters({ characterPromise }: CharactersProps) {
  const { selectedEpisode } = useEpisode();
  const initialCharacters = use(characterPromise).results;
  const [characters, setCharacters] = useState<Character[] | undefined>(initialCharacters);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedEpisode) {
      const getCharacterByUrl = async (url: string): Promise<Character> => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      };

      const getAllCharactersInEpisode = async () => {
        setIsLoading(true);
        const results = await Promise.allSettled(selectedEpisode.characters.map(getCharacterByUrl));
        const allCharacters = results.reduce<Character[]>((acc, result) => {
          if (result.status === "fulfilled") {
            acc.push(result.value);
          }
          return acc;
        }, []);

        setCharacters(allCharacters);
        setIsLoading(false);
      };

      getAllCharactersInEpisode();
    } else {
      setCharacters(initialCharacters);
    }
  }, [selectedEpisode, initialCharacters]);

  return (
    <div className={styles.container}>
      {selectedEpisode && (
        <p className={styles.info}>
          {selectedEpisode.characters.length} characters in episode &ldquo;{selectedEpisode.name}&rdquo;
        </p>
      )}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.characters}>
          {characters?.map(character => (
            <CharacterProfile key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  );
}
