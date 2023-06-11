import "./Movies.css";
import React from "react";
import { useState, useEffect } from "react";
import { DataMoviesApi } from "../../utils/MoviesApi";
import { DataAuthApi } from "../../utils/MainApi";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardsList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";

function Movies() {
  const [isArrayMovies, setArrayMovies] = useState([]);
  const [isSavedMovies, setSavedMovies] = useState([]);
  const [isPreloader, setPreloader] = useState(false);
  const [isConditonSectionBtn, setConditionSectionBtn] = useState(false);
  const [isShowFilms, setShowFilms] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState("");

  //Поиск фильмов
  function searchMovies() {
    setPreloader(true);

    DataMoviesApi.searhcMovies()
      .then((data) => {
        if (data) {
          const newArrayFilms = [];

          data.forEach((movie, index) => {
            newArrayFilms[index] = movie;

            newArrayFilms[index].movieId = movie.id;
            newArrayFilms[index]._id = null;

            isSavedMovies.length > 0
              ? isSavedMovies.forEach((savedMovie) => {
                  // сравниваем movieId

                  if (savedMovie.movieId === newArrayFilms[index].movieId) {
                    // если одинаковые, то устанавливаем _id
                    newArrayFilms[index]._id = savedMovie._id;
                  }
                })
              : (newArrayFilms[index]._id = null);
          });

          setArrayMovies(newArrayFilms);
          setPreloader(false);
          setConditionSectionBtn(true);
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
    DataAuthApi.getCardMovies()
      .then((data) => {
        setSavedMovies(data);
        setShowFilms(true);
      })
      .catch((err) => {
        console.log(
          err,
          "ошибка  в первом юзэфекте, потому что нет сохраненных фотографий"
        );
      });
  }, []);

  useEffect(() => {
    const messageSearch = localStorage.getItem("messageSearch");
    if (messageSearch && isShowFilms) {
      searchMovies();
    }
  }, [isShowFilms]);

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
      console.log("удаляем карточку");

      likeBtn.classList.remove("card__btn-like-active");
      DataAuthApi.deleteMovies(data._id)
        .then((dataDelete) => {
          data._id = null;
        })
        .catch((err) => {
          console.log(`Карточка не удалена (код ошибки): ${err}`);
        });
    } else {
      console.log("сохраняем карточку");
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
        <SearchForm searchMovies={searchMovies} />
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
            searchMovies={searchMovies}
            handelCreatCardMovies={handelCreatCardMovies}
          />
        )}
      </section>
    </>
  );
}

export default Movies;
