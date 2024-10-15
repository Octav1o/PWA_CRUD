import React from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import SavedMovies from './components/SavedMovies';
import { Movie } from './models/Movie';

const App: React.FC = () =>   {

  const handleSaveToLocalStorage = (movie: Movie) => {
    const currentSavedMovies = JSON.parse(localStorage.getItem('savedMovies') || '[]');
    const updateSavedMovies = [...currentSavedMovies, movie];
    localStorage.setItem('savedMovies', JSON.stringify(updateSavedMovies));
  }
  return (
    <div className="App">
      <h1>Movies App</h1>
      <MovieForm/>
      <MovieList onSaveToLocalStorage={handleSaveToLocalStorage}/>
      <SavedMovies/>
    </div>
  );
}

export default App;


