import React from "react";
import { useState, useEffect } from "react";
import { DataAuthApi } from "../../utils/MainApi";
import MoviesCardList from './MoviesCardList/MoviesCardList'
import SearchFormSaved from "./SearchFormSaved/SearchFromSaved";
import Preloader from "../Preloader/Preloader";
const saveMovies = (textSearch, arrMovies) => {
  if (!textSearch) {
    return arrMovies
  }
  return arrMovies.filter((item) => {
    return item.nameRU.toLowerCase().includes(textSearch.toLowerCase())
  })
}

const saveMoviesCheckbox = (statusCheckbox, arrMovies) => {
  if (statusCheckbox) {
    return arrMovies.filter((item) => {
      return item.duration <= 40;
    });
  }
  return arrMovies;
}

function SavedMovies() {
  const [isAllSavedMovies, setAllSavedMovies] = useState([]);
  const [isFilterSavedMovies, setFilterSavedMovies] = useState([])
  const [isStateFilter, setStateFilter] = useState(false)
  const [isRequestRednerSaveMovies, setisRequestRednerSaveMovies] = useState(false)
  const [isPreloader, setPreloader] = useState(false);
  const [isError, setError] = useState(false)

  //локалсторадж
  const jsonStatusCkeckboxSave = JSON.parse(localStorage.getItem('stateCheckboxSave'));

  //получаем все сохраненные карточки фильмов
  useEffect(() => {
    setisRequestRednerSaveMovies(false)
    DataAuthApi.getCardMovies()
      .then((data) => {
        setStateFilter(true)
        setAllSavedMovies(data);
        setPreloader(true)
      })
      .catch((err) => {
        console.log(err, "ошибка потому что нет сохраненных фотографий");
      });
  }, [isRequestRednerSaveMovies]);

  // фильтрация с помощью чекбокса по определеному слову 
  function filterMoviesCheckbox(statusInputSave, allSavedMovies) {
    const resFilterMovies = saveMovies(statusInputSave, allSavedMovies)
    const jsonStatusCkeckboxSave = JSON.parse(localStorage.getItem('stateCheckboxSave'));
    const resFilter = saveMoviesCheckbox(jsonStatusCkeckboxSave, resFilterMovies)
    setFilterSavedMovies(resFilter)
    if (resFilter.length === 0) {
      setError(true)
    } else {
      setError(false)
    }
  }

  // фильтрация  по определеному слову 
  function filterMovies(statusInputSave, allSavedMovies) {
    const resFilter = saveMovies(statusInputSave, allSavedMovies)
    setFilterSavedMovies(resFilter)
    if (resFilter.length === 0) {
      setError(true)
    } else {
      setError(false)
    }
  }

  // функция фильтр
  function handelMoviesFilter() {
    const statusInputSave = localStorage.getItem("messageSearchSave")
    if (isStateFilter) {
      if (jsonStatusCkeckboxSave) {
        filterMoviesCheckbox(statusInputSave, isAllSavedMovies)
      } else {
        filterMovies(statusInputSave, isAllSavedMovies)
      }
    }
  }

  //функция фильтр чекбокс
  function handelMoviesFilterCheckbox() {
    const statusInputSave = localStorage.getItem("messageSearchSave")
    const jsonStatusCkeckboxSave = JSON.parse(localStorage.getItem('stateCheckboxSave'));
    const resFilter = saveMoviesCheckbox(jsonStatusCkeckboxSave, isAllSavedMovies)
    setFilterSavedMovies(resFilter)
    if (jsonStatusCkeckboxSave) {
      filterMoviesCheckbox(statusInputSave, isAllSavedMovies)
    } else {
      filterMovies(statusInputSave, isAllSavedMovies)
    }
  }
  //useEffect - отвечает чтобы после перезагрузки страницы отображались сохраненные фильмы
  useEffect(() => {
    localStorage.setItem("stateCheckboxSave", false);
    localStorage.setItem("messageSearchSave", '');
    if (isPreloader) {
      setFilterSavedMovies(isAllSavedMovies)
    }
  }, [isPreloader])

  function startFilter() {
    setStateFilter(true)
  }

  // удаление фильма
  function handelDeleteMovies(movies) {
    DataAuthApi.deleteMovies(movies._id)
      .then((data) => {
        setFilterSavedMovies((state) =>
          state.filter((item) => {
            setisRequestRednerSaveMovies(true)
            if (item._id !== movies._id) {
              return isFilterSavedMovies;
            }
          })
        );

      })
      .catch((err) => {
        console.log(`Карточка не удалена (код ошибки): ${err}`);
      });
  }

  return (
    <>
      <section className="movies-box">
        <SearchFormSaved
          handelMoviesFilter={handelMoviesFilter}
          handelMoviesFilterCheckbox={handelMoviesFilterCheckbox}
          startFilter={startFilter}
        />
        {!isPreloader ? <Preloader /> : <MoviesCardList
          arrMovies={isFilterSavedMovies}
          handelDeleteMovies={handelDeleteMovies}
          isError={isError}
        />}
      </section >
    </>
  )
}

export default SavedMovies;