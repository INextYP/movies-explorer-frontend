import SearchForm from '../SearchForm/SearchForm';
import defaultSavedMovies from '../../utils/initialSavedMovies';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={defaultSavedMovies} />
    </main>
  );
}

export default SavedMovies;
