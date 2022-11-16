import movies from '../../utils/initialMovies';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <main className="movies">
      <SearchForm/>
      <MoviesCardList movies={movies} />
    </main>
  );
}

export default Movies;
