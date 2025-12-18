"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface WatchlistContextType {
  watchlist: any[];
  watched: any[];
  toggleWatchlist: (movie: any) => void;
  toggleWatched: (movie: any) => void;
  isInWatchlist: (id: number) => boolean;
  isWatched: (id: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [watched, setWatched] = useState<any[]>([]);

  // Load from LocalStorage
  useEffect(() => {
    const savedWatch = localStorage.getItem("tamo-watchlist");
    const savedWatched = localStorage.getItem("tamo-watched");
    if (savedWatch) setWatchlist(JSON.parse(savedWatch));
    if (savedWatched) setWatched(JSON.parse(savedWatched));
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("tamo-watchlist", JSON.stringify(watchlist));
    localStorage.setItem("tamo-watched", JSON.stringify(watched));
  }, [watchlist, watched]);

  const toggleWatchlist = (movie: any) => {
    setWatchlist(prev => {
      const exists = prev.find(m => m.id === movie.id);
      if (exists) return prev.filter(m => m.id !== movie.id);
      return [movie, ...prev];
    });
  };

  const toggleWatched = (movie: any) => {
    setWatched(prev => {
      const exists = prev.find(m => m.id === movie.id);
      if (exists) return prev.filter(m => m.id !== movie.id);
      
      // If adding to watched, auto-remove from watchlist
      setWatchlist(prevW => prevW.filter(m => m.id !== movie.id));
      return [movie, ...prev];
    });
  };

  return (
    <WatchlistContext.Provider value={{ 
      watchlist, watched, toggleWatchlist, toggleWatched, 
      isInWatchlist: (id) => watchlist.some(m => m.id === id),
      isWatched: (id) => watched.some(m => m.id === id)
    }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) throw new Error("useWatchlist must be used within WatchlistProvider");
  return context;
};