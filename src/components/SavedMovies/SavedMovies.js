import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  savedMovies, handleCardLike, handleCheckLikeStatusSavedMovies, onSortMovies, errorsText,
}) {
  const [sortMovies, setSortMovies] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      setSortMovies(onSortMovies(savedMovies));
    }
  }, [isChecked]);

  return (
    <main className="saved-movies">
      <SearchForm onSortMovies={setIsChecked} errorsText={errorsText} />
      <MoviesCardList movies={isChecked ? sortMovies : savedMovies} handleCardLike={handleCardLike} handleCheckLikeStatusSavedMovies={handleCheckLikeStatusSavedMovies} />
    </main>
  );
}

export default SavedMovies;
