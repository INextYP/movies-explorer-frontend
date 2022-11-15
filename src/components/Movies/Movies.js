import movies from '../../utils/initialMovies';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies() {
  return (
    <div className="movies">
      <SearchForm/>
      <MoviesCardList movies={movies} />
      <Footer />
    </div>
  );
}

export default Movies;
