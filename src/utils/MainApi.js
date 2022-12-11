export default class MainApi {
  constructor(setting) {
    this._address = setting.baseUrl;
  }

  _checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }

  getContent() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => this._checkResponse(response));
  }

  getSavedMovies() {
    return fetch(`${this._address}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => this._checkResponse(response));
  }

  addSavedMovie(movieData) {
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
    }).then((response) => this._checkResponse(response));
  }

  deleteSavedMovie(movie) {
    return fetch(`${this._address}/movies/${movie}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => this._checkResponse(response));
  }

  registration(name, email, password) {
    return fetch(`${this._address}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password, email }),
    }).then((response) => this._checkResponse(response));
  }

  authorization({ email, password }) {
    return fetch(`${this._address}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
    }).then((response) => this._checkResponse(response));
  }

  logOut() {
    return fetch(`${this._address}/signout`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => this._checkResponse(response));
  }

  setUserInfo({ name, email }) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    }).then((response) => this._checkResponse(response));
  }
}
