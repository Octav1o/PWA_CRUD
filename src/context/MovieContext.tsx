// src/context/MovieContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie } from '../models/Movie';

interface MovieContextType {
    movies: Movie[];
    savedMovies: Movie[];
    addMovie: (movie: Movie) => void;
    deleteMovie: (id: string) => void;
    saveToLocalStorage: (movie: Movie) => void;
    deleteFromLocalStorage: (index: number) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [savedMovies, setSavedMovies] = useState<Movie[]>(JSON.parse(localStorage.getItem('savedMovies') || '[]'));

    const addMovie = (movie: Movie) => {
        setMovies((prevMovies) => [...prevMovies, movie]);
    };

    const deleteMovie = (id: string) => {
        setMovies((prevMovies) => prevMovies.filter(movie => movie._id !== id));
    };

    const saveToLocalStorage = (movie: Movie) => {
        const updatedSavedMovies = [...savedMovies, movie];
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
    };

    const deleteFromLocalStorage = (index: number) => {
        const updatedSavedMovies = [...savedMovies];
        updatedSavedMovies.splice(index, 1);
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
    };

    return (
        <MovieContext.Provider value={{ movies, savedMovies, addMovie, deleteMovie, saveToLocalStorage, deleteFromLocalStorage }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error("useMovieContext must be used within a MovieProvider");
    }
    return context;
};
