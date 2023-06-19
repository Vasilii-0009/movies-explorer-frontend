import "./Movies.css";
import React from "react";
import { useState, useEffect } from "react";
import { DataMoviesApi } from "../../utils/MoviesApi";
import { DataAuthApi } from "../../utils/MainApi";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardsList from "./MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies() {
  const FilmsFromLocalStorage = JSON.parse(localStorage.getItem("FilmsFromLocalStorage"))
  const [isArrayMovies, setArrayMovies] = useState([]);
  const [isSavedMovies, setSavedMovies] = useState([]);
  const [isErrorMessage, setErrorMessage] = useState("");
  const [isMessageErrorCardMovies, setMessageErrorCardMovies] = useState("Ничего не найдено");
  const [isPreloader, setPreloader] = useState(false);
  const [isConditonSectionBtn, setConditionSectionBtn] = useState(false);
  const [isGetMoviesLocalStorag, setGetMoviesLocalStorag] = useState(false)
  const [isStateForCheckLike, setStateForCheckLike] = useState(false)
  const [isStateForSaveMovies, setStateForSaveMovies] = useState(false)
  const [isDisabled, setDisabled] = useState(false)

  //Поиск фильмов
  function searchMovies() {
    setDisabled(true);
    setPreloader(true);

    DataMoviesApi.searhcMovies()
      .then((data) => {
        if (data) {
          const newArrayFilms = [];

          data.forEach((movie, index) => {
            newArrayFilms[index] = movie;

            newArrayFilms[index].movieId = movie.id;
            newArrayFilms[index]._id = null;

          });
          localStorage.setItem('FilmsFromLocalStorage', JSON.stringify(newArrayFilms))
          setArrayMovies(newArrayFilms);
          setPreloader(false);
          setConditionSectionBtn(true);
          setStateForSaveMovies(true);
          setErrorMessage('')
          setDisabled(false)
        }
      })
      .catch((err) => {
        console.log(
          `${err} - "«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»"`
        );
        setArrayMovies([]);
        setPreloader(false);
        setConditionSectionBtn(false);
        return setErrorMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      });
  }
  // получаем сохраненные фильмы
  useEffect(() => {
    if (FilmsFromLocalStorage || isStateForSaveMovies) {
      DataAuthApi.getCardMovies()
        .then((data) => {
          setSavedMovies(data);
          setStateForCheckLike(true)
          setStateForSaveMovies(false)
        })
        .catch((err) => {
          console.log(
            err,
            "ошибка  в первом юзэфекте, потому что нет сохраненных фотографий"
          );
          setPreloader(false);
          setStateForSaveMovies(false)
          setArrayMovies([])
          setMessageErrorCardMovies('')
          return setErrorMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
        });
    }
  }, [isStateForSaveMovies]);

  //проверяем карточку с фильмом есть ли у неё id польвателя и добавляем ЛАЙК
  function checkLike() {
    setStateForCheckLike(false)
    isSavedMovies.forEach((itemSava) => {
      FilmsFromLocalStorage.forEach((item) => {
        if (itemSava.movieId === item.movieId) {
          item._id = itemSava._id
        }
      })
    })
  }

  // получаем фильмы после перезагрузки страницы 
  useEffect(() => {
    if (FilmsFromLocalStorage && isStateForCheckLike) {
      setPreloader(true);
      setArrayMovies(FilmsFromLocalStorage);
      setGetMoviesLocalStorag(true);
      checkLike();
      setConditionSectionBtn(true);
      setDisabled(false)
    }
    if (isArrayMovies.length > 0) {
      return setPreloader(false);
    }
  }, [isGetMoviesLocalStorag, isStateForCheckLike, isConditonSectionBtn, isArrayMovies])


  //получаем фильмы по клику на кнонку поиска 
  function searchMoviesLocalStorag() {
    setDisabled(true)
    setPreloader(true);
    setStateForSaveMovies(true);
    return setErrorMessage('');
  }
  if (isStateForCheckLike && isStateForSaveMovies) {
    setDisabled(false)
    setPreloader(false);
    checkLike()
    setArrayMovies(FilmsFromLocalStorage)
    setDisabled(false)
  }

  //создаем карточку фильма, которая будет добавлена  в сохраненые фильмы
  function handelCreatCardMovies(data, event) {
    const likeBtn = event.target;

    const country = data.country;
    const director = data.director;
    const duration = data.duration;
    const year = data.year;
    const description = data.description;
    const image = `https://api.nomoreparties.co${data.image.url}`;
    const trailerLink = data.trailerLink;
    const thumbnail = `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`;
    const movieId = data.id;
    const nameRU = data.nameRU;
    const nameEN = data.nameEN;
    if (event.target.classList.contains("card__btn-like-active")) {
      likeBtn.classList.remove("card__btn-like-active");
      DataAuthApi.deleteMovies(data._id)
        .then((dataDelete) => {
          data._id = null;
        })
        .catch((err) => {
          console.log(`Карточка не удалена (код ошибки): ${err}`);
        });
    } else {
      likeBtn.classList.add("card__btn-like-active");
      DataAuthApi.creatCardMovies(
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
      )
        .then((dataSave) => {
          data._id = dataSave.movies._id;
        })
        .catch((err) => {
          console.log(`Карточка не сохранена  (код ошибки): ${err}`);
        });
    }
  }

  return (
    <>
      <section className="movies-box">
        <SearchForm
          searchMovies={searchMovies}
          searchMoviesLocalStorag={searchMoviesLocalStorag}
          isDisabled={isDisabled}
        />
        {isPreloader ? (
          <section className="preloader">
            <div className="container">
              <Preloader />
            </div>
          </section>
        ) : (
          <MoviesCardsList
            isArrayMovies={isArrayMovies}
            isPreloader={isPreloader}
            isConditonSectionBtn={isConditonSectionBtn}
            isErrorMessage={isErrorMessage}
            isMessageErrorCardMovies={isMessageErrorCardMovies}
            searchMovies={searchMovies}
            handelCreatCardMovies={handelCreatCardMovies}

          />
        )}
      </section>
    </>
  );
}

export default Movies;
