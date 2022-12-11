import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  movies, handleCardLike, handleCheckLikeStatus, handleCheckLikeStatusSavedMovies,
}) {
  const { pathname } = useLocation();

  const [isWindowSize, setIsWindowSize] = useState(window.innerWidth);

  const [isMovieCount, setIsMovieCount] = useState(0);

  const [currentClickCount, setCurrentClickCount] = useState(0);

  const [renderMovies, setRenderMovies] = useState(isMovieCount);

  const [isLoading, setIsLoading] = useState(false);

  const defaultMovies = movies.slice(0, renderMovies);

  const handleDisplayPreloader = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleTimeout = () => {
    setTimeout(handleResize, 3000);
  };

  const handleResize = () => {
    setIsWindowSize(window.innerWidth);
  };

  const handleClickButton = () => {
    handleDisplayPreloader();
    setRenderMovies(renderMovies + currentClickCount);
  };

  const getCount = () => {
    if (isWindowSize > 768) {
      setIsMovieCount(12);
      setCurrentClickCount(3);
    } else if (isWindowSize > 660 && isWindowSize <= 768) {
      setIsMovieCount(8);
      setCurrentClickCount(2);
    } else {
      setIsMovieCount(5);
      setCurrentClickCount(2);
    }
  };

  useEffect(() => {
    setRenderMovies(isMovieCount);
    getCount();
  }, [isMovieCount, isWindowSize]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleTimeout);
    handleResize();
    return () => window.removeEventListener('resize', handleTimeout);
  }, []);

  return (
    <section className={`movies__section ${pathname === '/saved-movies' ? 'movies__section_place_saved-movies' : ''}`}>
        <ul className="movies__list">
          {pathname === '/movies' && defaultMovies.map((movie) => (
            <MoviesCard key={movie.id}
                        movie={movie}
                        handleCardLike={handleCardLike}
                        handleCheckLikeStatus={handleCheckLikeStatus}
            />))}
          {pathname === '/saved-movies' && movies.map((movie) => (
            <MoviesCard key={movie.movieId}
                        movie={movie}
                        visibleMovies={true}
                        handleCardLike={handleCardLike}
                        handleCheckLikeStatusSavedMovies={handleCheckLikeStatusSavedMovies}/>))}
        </ul>
          {(movies.length > isMovieCount && movies.length > renderMovies) && isLoading ? (<Preloader/>) : <div className="movies__button-container">
            <button type="button" onClick={handleClickButton} className="movies__button">Ещё</button>
          </div>}
      </section>
  );
}

export default MoviesCardList;
