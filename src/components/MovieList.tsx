
import React, { useEffect, useState } from 'react';
import { Movie } from '../models/Movie';
import { getMovies, deleteMovie } from '../services/movieService';

interface MovieListProps {
    onSaveToLocalStorage: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({onSaveToLocalStorage}) => {
    const [movies, setMovies] = useState<Movie[]>([]);

    const fetchMovies = async () => {
        try {
            const response = await getMovies();
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteMovie(id);
            setMovies(movies.filter(movie => movie._id !== id));
            fetchMovies();
        } catch (error) {
            console.error('Error deleting movie', error);
        }
    };

    const handleSaveToLocalStorage = (movie: Movie) => {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies') || '[]');
        savedMovies.push(movie);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        alert('Movie saved to localStorage!');
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Movies List</h2>
            <ul className="list-group">
                {movies.map(movie => (
                    <li key={movie._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            {movie.name} ({movie.year}) - {movie.category}
                        </div>
                        <div>
                            <button
                                className="btn btn-danger btn-sm me-2"
                                onClick={() => handleDelete(movie._id!)}
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleSaveToLocalStorage(movie)}
                            >
                                Save
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;

