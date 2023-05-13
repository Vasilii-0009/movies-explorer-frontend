import React from "react";
import { useState, useEffect } from "react";
import { DataMoviesApi } from "../../utils/MoviesApi";
import { DataAuthApi } from "../../utils/MainApi";
import SearchForm from "./SearchForm/SearchForm";
import BtnMore from "./BtnMore/BtnMore";
import MoviesCard from "./MoviesCard/MoviesCard";
import MoviesCardsList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";

function Movies() {
  const [isArrayMovies, setArrayMovies] = useState([]);
  const [isPreloader, setPreloader] = useState(false);
  const [isConditonSectionBtn, setConditionSection] = useState(false);
  // Поиск фильмов
  const [isSavedMovies, setSavedMovies] = useState([]);
  const [isLike, setLike] = useState(false);
  //Поиск фильмов
  function searchMovies() {
    setPreloader(true);
    DataMoviesApi.searhcMovies()
      .then((data) => {
        if (data) {
          const newArrayFilms = [];

          data.forEach((movie, index) => {
            newArrayFilms[index] = movie;

            // newArrayFilms[index]._id = null;
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
          //  setErrorMessage("");
          setConditionSection(true);
        }
      })
      .catch((err) => {
        console.log(
          `${err} - "«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»"`
        );
        setPreloader(false);
        setArrayMovies([]);
        // return setErrorMessage(
        //   "«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»"
        // );
      });
  }

  useEffect(() => {
    const messageSearch = localStorage.getItem("messageSearch");
    if (messageSearch) {
      searchMovies();
    }
  }, [isLike]);
  //создаем картчку фильма, которая будет добавлена  в сохраненые фильмы
  function handelCreatCardMovies(data) {
    setLike(true);
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
    if (data._id === null) {
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
          console.log(dataSave);

          const res = isArrayMovies.filter((item) => {
            const resArray = item.movieId === dataSave.movies.movieId;
            return resArray;
          });
          res.map((item) => {
            item._id = dataSave.movies._id;
          });
          console.log(isArrayMovies);
        })
        .catch((err) => {
          console.log(`Карточка не сохранена  (код ошибки): ${err}`);
        });
    } else {
      DataAuthApi.deleteMovies(data._id)
        .then((dataDelete) => {
          console.log(dataDelete);
          data._id = null;
        })
        .catch((err) => {
          console.log(`Карточка не удалена (код ошибки): ${err}`);
        });
    }
  }

  //получаем карточки фильмов и добавлемя в сохраненые фильмы
  function handelSaveCardMovies() {
    DataAuthApi.getCardMovies().then((data) => {
      setSavedMovies(data);
      setLike(false);
    });
  }
  useEffect(() => {
    handelSaveCardMovies();
  }, []);

  return (
    <>
      <SearchForm searchMovies={searchMovies} />
      <MoviesCardsList
        isArrayMovies={isArrayMovies}
        isPreloader={isPreloader}
        isConditonSectionBtn={isConditonSectionBtn}
        handelCreatCardMovies={handelCreatCardMovies}
      />
    </>
  );
}

export default Movies;
