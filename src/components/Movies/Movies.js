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
  setSearchSavedMovies,
}) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked === true) {
      localStorage.setItem('sortResult', JSON.stringify(onSortMovies(movies)));
      localStorage.setItem('sortStatus', JSON.stringify(true));
    }
  }, [isChecked]);

  return (
    <main className="movies">
      <SearchForm
        onSearchMovie={onSubmitSearch}
        onSortMovies={setIsChecked}
        errorsText={errorsText}
        setSearchSavedMovies={setSearchSavedMovies}
      />
      {errorsText.searchError.length > 0 ? <h2 className='movies__error-text'>{errorsText.searchError}</h2> : (<MoviesCardList
        movies={isChecked ? movies.filter((movie) => movie.duration <= 40) : movies}
        savedMovies={savedMovies}
        onClick={onClick}
        isLoading={isLoading}
        handleCheckLikeStatus={handleCheckLikeStatus}
        handleCardLike={handleCardLike} />) }
    </main>
  );
}

export default Movies;
