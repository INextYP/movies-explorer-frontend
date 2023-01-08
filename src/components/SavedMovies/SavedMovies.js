import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  savedMovies,
  handleCardLike, handleCheckLikeStatusSavedMovies,
  onSortMovies,
  errorsText,
  onSubmitSearch,
  searchSavedMovies,
  setSearchSavedMovies,
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
      <SearchForm onSearchMovie={onSubmitSearch}
                  onSortMovies={setIsChecked}
                  errorsText={errorsText}
                  setSearchSavedMovies={setSearchSavedMovies}
      />
      <MoviesCardList
        // eslint-disable-next-line no-nested-ternary
        movies={isChecked ? sortMovies
          : searchSavedMovies.length > 0
            ? searchSavedMovies
            : savedMovies}
        handleCardLike={handleCardLike}
        handleCheckLikeStatusSavedMovies={handleCheckLikeStatusSavedMovies}/>
    </main>
  );
}

export default SavedMovies;
