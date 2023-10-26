import { Character } from "@/types/rickAndMortyTypes";
import Image from "next/image";
import styles from "./CharacterProfile.module.css";

export default function CharacterProfile({ character }: { character: Character }) {
  return (
    <div key={character.id} className={styles.container}>
      <Image
        className={styles.image}
        src={character.image}
        width={200}
        height={200}
        alt={`avatar of ${character.name}`}
      />
      <p className={styles.name}>{character.name}</p>
    </div>
  );
}
