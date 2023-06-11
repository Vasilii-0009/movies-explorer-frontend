import "./MoviesCardList.css";
import React, { useEffect, useState } from "react";
import MoviesGeneralLIstCards from "../../MoviesGeneral/MoviesGeneralLIstCards/MoviesGeneralLIstCards";
import MoviesCard from "../MoviesCard/MoviesCard";
import BtnMore from "../BtnMore/BtnMore";

function MoviesCardsList(props) {
  const [isFilms, setFilms] = useState([]);
  const [isConditonBtn, setConditionBtn] = useState(false);
  // error
  const [isErrorCardMovies, setErrorCardMovies] = useState(false);
  const [isMessageErrorCardMovies, setMessageErrorCardMovies] =
    useState("Ничего не найдено");

  //cont
  const [isCont, setCont] = useState(12);
  const [isTabletCont, seTablettCont] = useState(8);
  const [isMobilCont, setMobilCont] = useState(5);

  //localStorage
  const statusInput = localStorage.getItem("messageSearch");
  const statusCkeckbox = localStorage.getItem("stateCheckbox");
  const jsonStatusCkeckbox = JSON.parse(statusCkeckbox);
  console.log(jsonStatusCkeckbox)

  //filterInput
  const getFilterMovies = () => {
    return props.isArrayMovies.filter((item) => {
      return item.nameRU.toLowerCase().includes(statusInput.toLowerCase());
    });
  };

  const filterMovies = getFilterMovies();

  //filtereCheckbox
  const getFilterCheckbox = () => {
    console.log('jsonStatusCkeckbox',jsonStatusCkeckbox)
    return filterMovies.filter((item) => {
      return item.duration <= 40;
    });
  };
  const filterMoviesCheckbox = getFilterCheckbox();

  const generalFilterCont = jsonStatusCkeckbox
    ? filterMoviesCheckbox
    : filterMovies;

  const resMovies = jsonStatusCkeckbox ? filterMoviesCheckbox : filterMovies;

  // resize

  const [width, setWidth] = useState(window.innerWidth);

  const breakpoint = 768;
  const breakpointMobil = 420;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  // в зависимости от ширина экрана отобрашается разное количество карточек
  useEffect(() => {
    if (resMovies.length <= 0 && props.isConditonSectionBtn) {
      setErrorCardMovies(true);
    }
    if (width > breakpoint) {
      setFilms(resMovies.slice(0, isCont));
    }
    if (width <= breakpoint && width >= breakpointMobil) {
      setFilms(resMovies.slice(0, isTabletCont));
    }
    if (width <= breakpointMobil) {
      setFilms(resMovies.slice(0, isMobilCont));
    }
  }, [width]);

  // добавялем карточки по клику
  function handleShowCardFilmsBtn() {
    if (width > breakpoint) {
      setCont((prev) => prev + 3);
      const finFilms = generalFilterCont.slice(0, isCont + 3);

      setFilms(finFilms);
    }

    if (width <= breakpoint && width >= breakpointMobil) {
      seTablettCont(isTabletCont + 2);
      const finFilms = generalFilterCont.slice(0, isTabletCont + 2);

      setFilms(finFilms);
    }
    if (width <= breakpointMobil) {
      setMobilCont(isTabletCont + 2);
      const finFilms = generalFilterCont.slice(0, isMobilCont + 2);

      setFilms(finFilms);
    }
  }

  // удаляем копнку ЕЩЁ если на страницы и в массиве одниковое количество карточек
  useEffect(() => {
    if (isFilms.length >= resMovies.length) {
      return setConditionBtn(true);
    } else {
      return setConditionBtn(false);
    }
  }, [isFilms]);

  return (
    <>
      <MoviesGeneralLIstCards
        isPreloader={props.isPreloader}
        isErrorCardMovies={isErrorCardMovies}
        isMessageErrorCardMovies={isMessageErrorCardMovies}
        isErrorMessage={props.isErrorMessage}
      >
        {isFilms.map((card, index) => {
          return (
            <MoviesCard
              handelCreatCardMovies={props.handelCreatCardMovies}
              cardInfo={card}
              key={index}
            />
          );
        })}
      </MoviesGeneralLIstCards>
      <BtnMore
        isConditonSectionBtn={props.isConditonSectionBtn}
        isConditonBtn={isConditonBtn}
        handleShowCardFilms={handleShowCardFilmsBtn}
      />
    </>
  );
}

export default MoviesCardsList;
