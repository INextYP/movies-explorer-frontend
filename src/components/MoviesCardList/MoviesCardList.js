import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ movies }) {
  const [isLoading, setLoading] = useState(false);

  const { pathname } = useLocation();

  const handleDisplayPreloader = () => {
    setLoading(true);
  };

  return (
    <section className={`movies__section ${pathname === '/saved-movies' ? 'movies__section_place_saved-movies' : ''}`}>
      <ul className="movies__list">
        {movies.map((movie) => (
          <MoviesCard movie={movie}/>))}
      </ul>
      {isLoading ? (<Preloader />) : (pathname !== '/saved-movies'
        && <div className="movies__button-container">
            <button type="button" onClick={handleDisplayPreloader} className="movies__button">Ещё</button>
           </div>)}
    </section>
  );
}

export default MoviesCardList;
