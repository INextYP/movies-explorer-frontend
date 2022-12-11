export default class MoviesApi {
  constructor(setting) {
    this._baseUrl = setting.baseUrl;
    this._headers = setting.headers;
  }

  _checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }

  getInitialMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }
}
