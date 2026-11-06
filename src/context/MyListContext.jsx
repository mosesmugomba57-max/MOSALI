
import { createContext, useContext, useEffect, useState } from "react";

const MyListContext = createContext();

export function MyListProvider({ children }) {

    const [myList, setMyList] = useState(() => {
        try {
            const savedMovies = localStorage.getItem("mosaliMyList");
            return savedMovies ? JSON.parse(savedMovies) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("mosaliMyList", JSON.stringify(myList));
    }, [myList]);

    const addToMyList = (movie) => {
        setMyList((prev) => {
            if (prev.some((item) => item.id === movie.id)) {
                return prev;
            }

            return [...prev, movie];
        });
    };

    const removeFromMyList = (movieId) => {
        setMyList((prev) =>
            prev.filter((movie) => movie.id !== movieId)
        );
    };

    const isInMyList = (movieId) => {
        return myList.some((movie) => movie.id === movieId);
    };

    return (
        <MyListContext.Provider
            value={{
                myList,
                addToMyList,
                removeFromMyList,
                isInMyList
            }}
        >
            {children}
        </MyListContext.Provider>
    );
}

export function useMyList() {
    return useContext(MyListContext);
}
