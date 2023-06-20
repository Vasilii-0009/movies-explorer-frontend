import "./MoviesCardList.css";
import React, { useEffect, useState } from "react";
import MoviesGeneralLIstCards from "../../MoviesGeneral/MoviesGeneralLIstCards/MoviesGeneralLIstCards";
import MoviesCard from "../MoviesCard/MoviesCard";
import BtnMore from "../BtnMore/BtnMore";
import MyConst from "../../MyConst/MyConst"

function MoviesCardsList(props) {
  const { DURATION_SHORT_MOVIES,
    COUNT_FOR_DESKTOP,
    COUNT_FOR_TABLET,
    COUNT_FOR_MOBIL,
    BREAKPOINT,
    BREAKPOINT_MOBIL,
    ZERO,
    PLUS_CARDS_DESKTOP,
    PLUS_CARDS_TABELT,
  } = MyConst

  const [isFilms, setFilms] = useState([]);
  const [isConditonBtn, setConditionBtn] = useState(false);
  // error
  const [isErrorCardMovies, setErrorCardMovies] = useState(false);

  //cont
  const [isCont, setCont] = useState(COUNT_FOR_DESKTOP);
  const [isTabletCont, seTablettCont] = useState(COUNT_FOR_TABLET);
  const [isMobilCont, setMobilCont] = useState(COUNT_FOR_MOBIL);

  //localStorage
  const statusInput = localStorage.getItem("messageSearch");
  const statusCkeckbox = localStorage.getItem("stateCheckbox");
  const jsonStatusCkeckbox = JSON.parse(statusCkeckbox);

  //filterInput
  const getFilterMovies = () => {
    return props.isArrayMovies.filter((item) => {
      return item.nameRU.toLowerCase().includes(statusInput.toLowerCase());
    });
  };

  const filterMovies = getFilterMovies();
  //filtereCheckbox
  const getFilterCheckbox = () => {
    return filterMovies.filter((item) => {
      return item.duration <= DURATION_SHORT_MOVIES;
    });
  };
  const filterMoviesCheckbox = getFilterCheckbox();

  const generalFilterCont = jsonStatusCkeckbox
    ? filterMoviesCheckbox
    : filterMovies;

  const resMovies = jsonStatusCkeckbox ? filterMoviesCheckbox : filterMovies;

  // resize
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  // в зависимости от ширина экрана отобрашается разное количество карточек
  useEffect(() => {
    if (resMovies.length <= ZERO && props.isConditonSectionBtn) {
      setErrorCardMovies(true);
    }
    if (width > BREAKPOINT) {
      setFilms(resMovies.slice(ZERO, isCont));
    }
    if (width <= BREAKPOINT && width >= BREAKPOINT_MOBIL) {
      setFilms(resMovies.slice(ZERO, isTabletCont));
    }
    if (width <= BREAKPOINT_MOBIL) {
      setFilms(resMovies.slice(ZERO, isMobilCont));
    }
  }, [width, props.isArrayMovies]);

  // добавялем карточки по клику
  function handleShowCardFilmsBtn() {
    if (width > BREAKPOINT) {
      setCont((prev) => prev + PLUS_CARDS_DESKTOP);
      const finFilms = generalFilterCont.slice(ZERO, isCont + PLUS_CARDS_DESKTOP);

      setFilms(finFilms);
    }

    if (width <= BREAKPOINT && width >= BREAKPOINT_MOBIL) {
      seTablettCont(isTabletCont + PLUS_CARDS_TABELT);
      const finFilms = generalFilterCont.slice(ZERO, isTabletCont + PLUS_CARDS_TABELT);

      setFilms(finFilms);
    }
    if (width <= BREAKPOINT_MOBIL) {
      setMobilCont(isTabletCont + PLUS_CARDS_TABELT);
      const finFilms = generalFilterCont.slice(ZERO, isMobilCont + PLUS_CARDS_TABELT);

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
        isMessageErrorCardMovies={props.isMessageErrorCardMovies}
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
