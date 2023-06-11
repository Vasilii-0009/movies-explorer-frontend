import React from "react";
import { useState, useEffect } from "react";
import { DataAuthApi } from "../../utils/MainApi";
import MoviesCardList from './MoviesCardList/MoviesCardList'
import SearchFormSaved from "./SearchFormSaved/SearchFromSaved";

const  saveMovies =  (textSearch, arrMovies) =>  {
 if(!textSearch) {
   return arrMovies
 }

 return arrMovies.filter((item) => {
 return  item.nameRU.toLowerCase().includes(textSearch.toLowerCase())
 })
}

const saveMoviesCheckbox = (statusCheckbox, arrMovies) => {

  console.log('сначала получучаю знвчение чекбокс а затем эту функцию')
  if(statusCheckbox) {
    return arrMovies.filter((item) => {
      return item.duration <= 40;
    });
  } 
  return arrMovies

 }

function SavedMovies () {
   const [isAllSavedMovies, setAllSavedMovies] = useState([]);
   const [isFilterSavedMovies, setFilterSavedMovies] = useState([])
   const [isStateFilter, setStateFilter] = useState(false)

   //локалсторадж
  //  const jsonStatusCkeckboxSave = JSON.parse(localStorage.getItem('stateCheckboxSave'));
  //  console.log( jsonStatusCkeckboxSave, 'сначала получаю значение с локал jsonStatusCkeckboxSave')

 

 //получаем все сохраненные карточки фильмов
  useEffect(() => {
    console.log('1-получаем все карточки')
   DataAuthApi.getCardMovies()
   .then((data) => {
      setStateFilter(true)
      setAllSavedMovies(data);
   })
   .catch((err) => {
     console.log(err, "ошибка потому что нет сохраненных фотографий");
   });
  }, []);

// функция фильтр
  function handelMoviesFilter () {
  const  statusInputSave = localStorage.getItem("messageSearchSave")
   if(isStateFilter) {
         const resFilter = saveMovies(statusInputSave, isAllSavedMovies)
         setFilterSavedMovies(resFilter)
   }
  // const resFilter = saveMovies(statusInputSave, isAllSavedMovies)
  // setFilterSavedMovies(resFilter)
  }

  // useEffect(() => {
  //   console.log('2-функция фильтр текс')
  //  handelMoviesFilter()
  // },[isStateFilter])

  //функция фильтр чекбокс
  function handelMoviesFilterCheckbox () {
     const jsonStatusCkeckboxSave = JSON.parse(localStorage.getItem('stateCheckboxSave'));
     console.log( jsonStatusCkeckboxSave, 'сначала получаю значение с локал jsonStatusCkeckboxSave')
    const resFilter = saveMoviesCheckbox(jsonStatusCkeckboxSave, isAllSavedMovies)
    setFilterSavedMovies(resFilter)

  }

  useEffect(() => {
    console.log('вызываем useEffect')
    setStateFilter(false)
    const jsonStatusCkeckboxSave = JSON.parse(localStorage.getItem('stateCheckboxSave'));

    const res = jsonStatusCkeckboxSave ? handelMoviesFilterCheckbox() :     handelMoviesFilter()
    return res

  },[isStateFilter])

  //test
  function test () {
    setStateFilter(true)
  }
  //test

  // удаление фильма
  function handelDeleteMovies(movies) {
   DataAuthApi.deleteMovies(movies._id)
     .then((data) => {
       setFilterSavedMovies((state) =>
         state.filter((item) => {
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

   return(
      <>
      <SearchFormSaved
      handelMoviesFilter={handelMoviesFilter}
      handelMoviesFilterCheckbox={handelMoviesFilterCheckbox}
      test={test}
      />
      <MoviesCardList
      arrMovies={isFilterSavedMovies}
      handelDeleteMovies={handelDeleteMovies}
      />
      </>
   )
}

export default SavedMovies;