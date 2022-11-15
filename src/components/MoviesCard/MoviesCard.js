import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie }) {
  const [isFavorite, setFavorite] = useState(false);

  const { pathname } = useLocation();

  const movieFavoriteAddButtonClassName = `movie__button-favorite-add ${isFavorite ? 'movie__button-favorite-add_active' : 'movie__button-favorite-add'}`;

  function handleMovieFavoriteClick() {
    setFavorite(!isFavorite);
  }

  return (
    <li className="movie">
      <img src={movie.image} alt={movie.title} className="movie__img" />
      <div className="movie__description">
        <h2 className="movie__name">{movie.title}</h2>
          {pathname !== '/saved-movies' && <button className={movieFavoriteAddButtonClassName} type="button" onClick={handleMovieFavoriteClick}></button>}
          {pathname === '/saved-movies' && <button className="movie__button-favorite-delete" type="button"></button>}
      </div>
      <p className="movie__duration">{movie.duration}</p>
    </li>
  );
}

export default MoviesCard;
