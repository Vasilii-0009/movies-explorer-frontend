import "./MoviesCardList.css";
import React, { useEffect, useState } from "react";
import MoviesGeneralLIstCards from "../../MoviesGeneral/MoviesGeneralLIstCards/MoviesGeneralLIstCards";
import MoviesCard from "../MoviesCard/MoviesCard";
import BtnMore from "../BtnMore/BtnMore";
import Cards from "../../../utils/cards";
import { DataMoviesApi } from "../../../utils/MoviesApi";
import { DataAuthApi } from "../../../utils/MainApi.js";

function MoviesCardsList(props) {
  // const Films = React.useContext(FilmsContext);

  // //checkbox
  // const [isStatusCheckbox, setStatusCheckbox] = useState(null);
  // //checkbox
  // //
  const statusInput = localStorage.getItem("messageSearch");
  const statusCkeckbox = localStorage.getItem("stateCheckbox");
  const JsonStatusCkeckbox = JSON.parse(statusCkeckbox);

  const classBlockMore = "bloke-more-hiden";
  //btn-more
  const [isConditonBtn, setConditionBtn] = useState(false);

  // // let res = Films.slice(0, isCont);
  // //

  const getFilterMovies = () => {
    return props.isArrayMovies.filter((item) => {
      return item.nameRU.toLowerCase().includes(statusInput.toLowerCase());
    });
  };

  const filterMovies = getFilterMovies();

  // //checkbox
  // const getFilmCheckbox = () => {
  //   return filterMovies.filter((item) => {
  //     return item.duration <= 40;
  //   });
  // };
  // const filterMoviesCheckbox = getFilmCheckbox();

  // // checkbox
  const [isCont, setCont] = useState(12);

  let resMovies = JsonStatusCkeckbox
    ? filterMoviesCheckbox
    : filterMovies.slice(0, isCont);

  const [isFilms, setFilms] = useState(resMovies);

  // //

  // // const [isFilms, setFilms] = useState(res);

  useEffect(() => {
    // setStatusCheckbox(JsonStatusCkeckbox);
    setFilms(resMovies);
  }, [props.isArrayMovies]);

  useEffect(() => {
    if (filterMovies.length <= isFilms.length) {
      return setConditionBtn(true);
    } else {
      return setConditionBtn(false);
    }
  }, [isFilms]);

  function handleShowCardFilmsBtn() {
    setCont(isCont + 3);
    const finFilms = filterMovies.slice(0, isCont + 3);

    setFilms(finFilms);
    // if (filterMovies.length === finFilms.length) {
    //   setConditionBtn(true);
    // }
  }

  // // Tablet
  // const [isTabletCont, seTablettCont] = useState(8);

  // let resTablet = Films.slice(0, isTabletCont);

  // const [isTabletFilms, setTabletFilms] = useState(resTablet);

  // useEffect(() => {
  //   setTabletFilms(resTablet);
  // }, [Films]);

  // function handleShowCardFilmsTablet() {
  //   seTablettCont(isTabletCont + 2);

  //   const finFilmsTablet = Films.slice(0, isTabletCont + 2);
  //   setTabletFilms(finFilmsTablet);

  //   if (Films.length <= resTablet.length) {
  //     setConditionBtn(true);
  //   }
  // }

  // //Mobile
  // const [isMobilCont, setMobilCont] = useState(5);

  // let resMobil = Films.slice(0, isMobilCont);

  // const [isMobilFilms, setMobilFilms] = useState(resMobil);

  // useEffect(() => {
  //   setMobilFilms(resMobil);
  // }, [Films]);

  // function handleShowCardFilMobil() {
  //   setMobilCont(isMobilCont + 2);

  //   const finFilmsMobil = Films.slice(0, isMobilCont + 2);
  //   setMobilFilms(finFilmsMobil);

  //   if (Films.length <= resTablet.length) {
  //     setConditionBtn(true);
  //   }
  // }

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

  if (width > breakpoint) {
    return (
      <>
        <MoviesGeneralLIstCards
          isPreloader={props.isPreloader}
          // isErrorMessage={props.isErrorMessage}
        >
          {isFilms.map((card, index) => {
            return (
              <MoviesCard
                handelCreatCardMovies={props.handelCreatCardMovies}
                // isLike={props.isLike}
                // isSavedMovies={props.isSavedMovies}
                // cardsContext={props.cardsContext}
                // handelCardMovies={props.handelCardMovies}
                cardInfo={card}
                key={index}
              />
            );
          })}
        </MoviesGeneralLIstCards>
        <BtnMore
          isConditonSectionBtn={props.isConditonSectionBtn}
          isConditonBtn={isConditonBtn}
          classBlockMore={classBlockMore}
          handleShowCardFilms={handleShowCardFilmsBtn}
        />
      </>
    );
  }
  // if (width <= breakpoint && width >= breakpointMobil) {
  //   return (
  //     <>
  //       <MoviesGeneralLIstCards
  //         isConditonSection={props.isConditonSection}
  //         isPreloader={props.isPreloader}
  //         isErrorMessage={props.isErrorMessage}
  //       >
  //         {isTabletFilms.map((card, index) => {
  //           return <MoviesCard cardInfo={card} key={index} />;
  //         })}
  //       </MoviesGeneralLIstCards>

  //       <BtnMore
  //         isConditonSection={props.isConditonSection}
  //         isConditonBtn={isConditonBtn}
  //         classBlockMore={classBlockMore}
  //         handleShowCardFilms={handleShowCardFilmsTablet}
  //       />
  //     </>
  //   );
  // }

  // if (width <= breakpointMobil) {
  //   return (
  //     <>
  //       <MoviesGeneralLIstCards
  //         isPreloader={props.isPreloader}
  //         isErrorMessage={props.isErrorMessage}
  //       >
  //         {isMobilFilms.map((card, index) => {
  //           return <MoviesCard cardInfo={card} key={index} />;
  //         })}
  //       </MoviesGeneralLIstCards>

  //       <BtnMore
  //         isConditonSection={props.isConditonSection}
  //         isConditonBtn={isConditonBtn}
  //         classBlockMore={classBlockMore}
  //         handleShowCardFilms={handleShowCardFilMobil}
  //       />
  //     </>
  //   );
  // }
}

export default MoviesCardsList;
