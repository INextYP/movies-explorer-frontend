import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
  movies,
  savedMovies,
  onSubmitSearch,
  onClick,
  isLoading,
  onSortMovies,
  handleCardLike,
  handleCheckLikeStatus,
  errorsText,
}) {
  const [sortMovies, setSortMovies] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      setSortMovies(onSortMovies(movies));
    }
  }, [isChecked]);

  return (
    <main className="movies">
      <SearchForm
        onSearchMovie={onSubmitSearch}
        onSortMovies={setIsChecked}
        errorsText={errorsText} />
      {errorsText.searchError.length > 0 ? <h2 className='movies__error-text'>{errorsText.searchError}</h2> : (<MoviesCardList
        movies={isChecked ? sortMovies : movies}
        savedMovies={savedMovies}
        onClick={onClick}
        isLoading={isLoading}
        handleCheckLikeStatus={handleCheckLikeStatus}
        handleCardLike={handleCardLike} />) }
    </main>
  );
}

export default Movies;
