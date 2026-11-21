import { createContext, useContext, useState } from "react";

const ContinueWatchingContext = createContext();

export function ContinueWatchingProvider({ children }) {
  const [continueWatching, setContinueWatching] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mosali_continue") || "[]");
    } catch {
      return [];
    }
  });

  const addProgress = (movie, currentTime, duration) => {
    if (!movie || !duration) return;
    const progress = Math.min((currentTime / duration) * 100, 99);
    if (progress > 95) { removeProgress(movie.id); return; }
    setContinueWatching((prev) => {
      const filtered = prev.filter((m) => m.id !== movie.id);
      const entry = { id: movie.id, title: movie.title, poster: movie.poster_path || movie.poster, progress, currentTime, duration, timestamp: Date.now() };
      const next = [entry, ...filtered].slice(0, 20);
      localStorage.setItem("mosali_continue", JSON.stringify(next));
      return next;
    });
  };

  const removeProgress = (id) => {
    setContinueWatching((prev) => {
      const next = prev.filter((m) => m.id !== id);
      localStorage.setItem("mosali_continue", JSON.stringify(next));
      return next;
    });
  };

  const getProgress = (id) => continueWatching.find((m) => m.id === id) || null;

  return (
    <ContinueWatchingContext.Provider value={{ continueWatching, addProgress, removeProgress, getProgress }}>
      {children}
    </ContinueWatchingContext.Provider>
  );
}

export const useContinueWatching = () => useContext(ContinueWatchingContext);
