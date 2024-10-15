import axios from "axios";
import { Movie } from "../models/Movie";

const API_URL = "http://localhost:7000/api/movies";

export const getMovies = () => axios.get<Movie[]>(API_URL);
export const getMovie = (id: string) => axios.get<Movie>(`${API_URL}/${id}`);
export const addMovie = (movie: Movie) => axios.post(API_URL, movie);
export const updateMovie = (id: string, movie: Movie) => axios.put(`${API_URL}/${id}`, movie);
export const deleteMovie = (id: string) => axios.delete(`${API_URL}/${id}`);

