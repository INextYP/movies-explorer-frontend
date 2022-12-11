export default class MainApi {
  constructor(setting) {
    // eslint-disable-next-line no-underscore-dangle
    this._address = setting.baseUrl;
  }

  // eslint-disable-next-line class-methods-use-this,no-underscore-dangle
  _checkResponse(response) {
    if (!response.ok) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }

  getContent() {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      // eslint-disable-next-line no-underscore-dangle
    }).then((response) => this._checkResponse(response));
  }

  getSavedMovies() {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._address}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      // eslint-disable-next-line no-underscore-dangle
    }).then((response) => this._checkResponse(response));
  }

  addSavedMovie(movieData) {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._address}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN,
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        image: `${'https://api.nomoreparties.co'}${movieData.image.url}`,
        trailerLink: movieData.trailerLink,
        thumbnail: `${'https://api.nomoreparties.co'}${movieData.image.formats.thumbnail.url}`,
        movieId: movieData.id,
      }),
      // eslint-disable-next-line no-underscore-dangle
    }).then((response) => this._checkResponse(response));
  }

  deleteSavedMovie(movie) {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._address}/movies/${movie}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      // eslint-disable-next-line no-underscore-dangle
    }).then((response) => this._checkResponse(response));
  }

  registration(name, email, password) {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._address}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password, email }),
      // eslint-disable-next-line no-underscore-dangle
    }).then((response) => this._checkResponse(response));
  }

  authorization({ email, password }) {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._address}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
      // eslint-disable-next-line no-underscore-dangle
    }).then((response) => this._checkResponse(response));
  }

  logOut() {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._address}/signout`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // eslint-disable-next-line no-underscore-dangle
    }).then((response) => this._checkResponse(response));
  }

  setUserInfo({ name, email }) {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
      // eslint-disable-next-line no-underscore-dangle
    }).then((response) => this._checkResponse(response));
  }
}
