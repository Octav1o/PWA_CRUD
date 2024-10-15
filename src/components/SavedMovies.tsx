import React, { useEffect, useState } from "react";
import { Movie } from "../models/Movie";

const SavedMovies: React.FC = () => {
    
    const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

    const loadSavedMovies = () => {
        const movies = JSON.parse(localStorage.getItem('savedMovies') || '[]');
        setSavedMovies(movies);
    }
    
    useEffect(() => {
        loadSavedMovies();
    }, []);



    const handleDelete = (index: number) => {
        const updateMovies = [...savedMovies];
        updateMovies.splice(index,1);
        localStorage.setItem('savedMovies', JSON.stringify(updateMovies));
        setSavedMovies(updateMovies);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Saved Movies</h2>
            {savedMovies.length === 0 ? (
                <p>No movies saved.</p>
            ): (
                <ul className="list-group">
                    {savedMovies.map((movie, index) => (
                        <li key={index} className="list-group-item">
                            <div>
                            {movie.name} ({movie.year}) - {movie.category}
                            </div>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SavedMovies;

