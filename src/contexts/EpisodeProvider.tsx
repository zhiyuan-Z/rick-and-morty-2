"use client";

import { Episode } from "@/types/rickAndMortyTypes";
import { ReactNode, createContext, useContext, useState } from "react";

export type EpisodeContextType = {
  selectedEpisode: Episode | null,
  setSelectedEpisode: (episode: Episode | null) => void
}

const EpisodeContext = createContext<EpisodeContextType | undefined>(undefined);

export const useEpisode = () => {
  const context = useContext(EpisodeContext);
  if (!context) throw new Error("useEpisode must be used in EpisodeProvider");
  return context;
};

const EpisodeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  return (
    <EpisodeContext.Provider value={{selectedEpisode, setSelectedEpisode}}>
      {children}
    </EpisodeContext.Provider>
  );
};

export default EpisodeProvider;
