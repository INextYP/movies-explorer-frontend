import MoviesApi from './MoviesApi';
import MainApi from './MainApi';

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
});

const mainApi = new MainApi({
  baseUrl: 'https://api.react.movies.nomoredomains.icu',
});

export { moviesApi, mainApi };
