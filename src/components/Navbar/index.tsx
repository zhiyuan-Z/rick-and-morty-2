"use client";

import { Episode, RickAndMortyAPIData } from "@/types/rickAndMortyTypes";
import { use, useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import { useEpisode } from "@/contexts/EpisodeProvider";
import { getEpisodesByPage } from "@/api/rickAndMortyAPI";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

type NavbarProps = {
  episodePromise: Promise<RickAndMortyAPIData<Episode[]>>;
};

export default function Navbar({ episodePromise }: NavbarProps) {
  // resolve the promise from the server side
  const initialEpisodes = use(episodePromise);
  const [episodes, setEpisodes] = useState<Episode[]>(
    initialEpisodes.results ? initialEpisodes.results : []
  );
  const { selectedEpisode, setSelectedEpisode } = useEpisode();

  const [page, setPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);

  const handleClick = (episode: Episode) => {
    if (episode.id !== selectedEpisode?.id) {
      setSelectedEpisode(episode);
    } else {
      setSelectedEpisode(null);
    }
  };

  const fetchEpisodes = async () => {
    const data = await getEpisodesByPage(page + 1);
    setEpisodes(prev => [...prev, ...(data.results ? data.results : [])]);
    setPage(prev => prev + 1);
    if (data.info?.next === null) {
      setReachedEnd(true);
    }
  };

  const { observerTarget, observerRoot, isLoading, errorMessage } =
    useInfiniteScroll({
      page,
      reachedEnd,
      fetchFunction: fetchEpisodes,
    });

  return (
    <nav className={styles.navbar}>
      <p className={styles.title}>Episodes</p>
      <hr className={styles.divider} />
      <ul ref={observerRoot} className={styles.list}>
        {episodes?.map(episode => (
          <li
            key={episode.id}
            onClick={() => handleClick(episode)}
            className={`${styles.item} ${
              selectedEpisode === episode ? styles.selected : ""
            }`}
          >
            {episode.name}
          </li>
        ))}
        {isLoading && <div>Loading episodes...</div>}
        {errorMessage && <p>Error loading episodes: {errorMessage}</p>}
        <div ref={observerTarget}></div>
      </ul>
    </nav>
  );
}
