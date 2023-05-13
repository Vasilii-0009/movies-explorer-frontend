const configMoviesApi = {
  //url: "http://localhost:3000",
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
};

class ApiMovies {
  constructor(configMoviesApi) {
    this.url = configMoviesApi.url;
    this.headers = configMoviesApi.headers;
  }
  _checkResponse(item) {
    return item.then((item) => {
      if (item.ok) {
        return item.json();
      }
      return Promise.reject(`${item.status}`);
    });
  }
  searhcMovies() {
    const searhcMovies = fetch(`${this.url}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return this._checkResponse(searhcMovies);
  }
}

const DataMoviesApi = new ApiMovies(configMoviesApi);

export { DataMoviesApi };
