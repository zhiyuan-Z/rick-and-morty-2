import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import { getCharactersByPage, getEpisodesByPage } from "@/api/rickAndMortyAPI";
import EpisodeProvider from "@/contexts/EpisodeProvider";
import Characters from "@/components/Characters";
import { Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Home() {
  // fetches data on the server side without blocking rendering
  const episodeReq = getEpisodesByPage(1);
  const characterReq = getCharactersByPage(1);
  return (
    <EpisodeProvider>
      <main className={styles.main}>
        <h1 className={styles.title}>Rick and Morty Characters</h1>
        <div className={styles.container}>
          <ErrorBoundary>
            <Suspense fallback={<div>Loading episodes...</div>}>
              <Navbar episodePromise={episodeReq} />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
            <Suspense fallback={<div>Loading characters...</div>}>
              <Characters characterPromise={characterReq} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
    </EpisodeProvider>
  );
}
