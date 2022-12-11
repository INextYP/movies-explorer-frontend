export default class MoviesApi {
  constructor(setting) {
    // eslint-disable-next-line no-underscore-dangle
    this._baseUrl = setting.baseUrl;
    // eslint-disable-next-line no-underscore-dangle
    this._headers = setting.headers;
  }

  // eslint-disable-next-line class-methods-use-this,no-underscore-dangle
  _checkResponse(response) {
    if (!response.ok) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }

  getInitialMovies() {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      // eslint-disable-next-line no-underscore-dangle
      headers: this._headers,
      // eslint-disable-next-line no-underscore-dangle
    }).then((response) => this._checkResponse(response));
  }
}
