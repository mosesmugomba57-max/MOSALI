import { createContext, useContext, useState } from "react";

const MyListContext = createContext();

export function MyListProvider({ children }) {
  const [myList, setMyList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mosali_mylist") || "[]");
    } catch {
      return [];
    }
  });

  const addToList = (movie) => {
    setMyList((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev;
      const next = [...prev, { ...movie, addedAt: Date.now() }];
      localStorage.setItem("mosali_mylist", JSON.stringify(next));
      return next;
    });
  };

  const removeFromList = (id) => {
    setMyList((prev) => {
      const next = prev.filter((m) => m.id !== id);
      localStorage.setItem("mosali_mylist", JSON.stringify(next));
      return next;
    });
  };

  const toggleList = (movie) => {
    if (myList.find((m) => m.id === movie.id)) {
      removeFromList(movie.id);
    } else {
      addToList(movie);
    }
  };

  const isInList = (id) => myList.some((m) => m.id === id);

  return (
    <MyListContext.Provider
      value={{ myList, addToList, removeFromList, toggleList, isInList }}
    >
      {children}
    </MyListContext.Provider>
  );
}

export const useMyList = () => useContext(MyListContext);
