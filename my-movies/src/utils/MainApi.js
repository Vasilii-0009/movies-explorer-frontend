const configAuthApi = {
  // url: "http://localhost:3000",
   url: "https://api.my-movies.nomoredomains.monster",
  headers: {
    "Content-Type": "application/json",
  },
};

class ApiAuth {
  constructor(configAuthApi) {
    this.url = configAuthApi.url;
    this.headers = configAuthApi.headers;
  }
  _checkResponse(item) {
    return item.then((item) => {
      if (item.ok) {
        return item.json();
      }
      return Promise.reject(`${item.status}`);
    });
  }
  // регестрация пользовтвеля и вход в систему
  registerUser(name, email, password) {
    const registerUser = fetch(`${this.url}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name, email, password }),
    });
    return this._checkResponse(registerUser);
  }

  //signin вход пользовтеля на сайт и получения token
  loginUser(email, password) {
    const loginUser = fetch(`${this.url}/signin`, {
      method: "POST",
      headers: this.headers,

      body: JSON.stringify({ email, password }),
    });
    return this._checkResponse(loginUser);
  }

  // проверяем есть ли токен пользовтеля на сайте
  getTokenUser() {
    const token = localStorage.getItem("token");
    const getTokenUser = fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return this._checkResponse(getTokenUser);
  }

  //обновляем данные пользователя
  upDateInfoUser(name, email) {
    const token = localStorage.getItem("token");
    const upDateInfoUser = fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });
    return this._checkResponse(upDateInfoUser);
  }

  //создаем картчку фильма, которая будет добавлена  в сохраненые филмы
  creatCardMovies(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN
  ) {
    const token = localStorage.getItem("token");
    const creatCardMovies = fetch(`${this.url}/movies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      }),
    });
    return this._checkResponse(creatCardMovies);
  }
  // получаем карточки фильмов и добавлемя в сохраненые фильмы
  getCardMovies() {
    const token = localStorage.getItem("token");
    const getCardMovies = fetch(`${this.url}/movies`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return this._checkResponse(getCardMovies);
  }

  // удаление фильма
  deleteMovies(id) {
    const token = localStorage.getItem("token");
    const deleteMovies = fetch(`${this.url}/movies/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return this._checkResponse(deleteMovies);
  }
}

const DataAuthApi = new ApiAuth(configAuthApi);

export { DataAuthApi };
