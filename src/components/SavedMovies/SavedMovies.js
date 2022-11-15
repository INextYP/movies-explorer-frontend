import SearchForm from '../SearchForm/SearchForm';
import defaultSavedMovies from '../../utils/initialSavedMovies';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={defaultSavedMovies} />
      <Footer />
    </div>
  );
}

export default SavedMovies;
