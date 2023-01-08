import { useLocation } from 'react-router-dom';

function MoviesCard({
  movie, handleCardLike, handleCheckLikeStatus, handleCheckLikeStatusSavedMovies,
}) {
  const { pathname } = useLocation();

  const isLiked = pathname === '/saved-movies' ? handleCheckLikeStatusSavedMovies(movie) : handleCheckLikeStatus(movie);

  const movieFavoriteAddButtonClassName = `movie__button-favorite-add ${isLiked ? 'movie__button-favorite-add_active' : 'movie__button-favorite-add'}`;

  const movieLink = pathname !== '/saved-movies' ? `${'https://api.nomoreparties.co'}${movie.image.url}` : `${movie.image}`;

  function handleMovieFavoriteClick() {
    handleCardLike(movie, isLiked);
  }

  return (
    <li className='movie movie_type_visible'>
      <a className='movie__img-link' href={movie.trailerLink} target='_blank' rel="noreferrer">
        <img src={movieLink} alt={movie.nameRU} className="movie__img" />
      </a>
      <div className="movie__description">
        <h2 className="movie__name">{movie.nameRU}</h2>
          {pathname !== '/saved-movies' && <button className={movieFavoriteAddButtonClassName} type="button" onClick={handleMovieFavoriteClick}></button>}
          {pathname === '/saved-movies' && <button className="movie__button-favorite-delete" type="button" onClick={handleMovieFavoriteClick}></button>}
      </div>
      <p className="movie__duration">{`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м `}</p>
    </li>
  );
}

export default MoviesCard;
