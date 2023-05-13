import React from "react";
import { useState, useEffect } from "react";
import MoviesGeneralLIstCards from "../../MoviesGeneral/MoviesGeneralLIstCards/MoviesGeneralLIstCards";
import saveCards from "../../../utils/saveCards";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { DataAuthApi } from "../../../utils/MainApi";

function SaveMoviesCardList(props) {
  const cardSpace = `card-list-space`;

  //получаем карточки фильмов и добавлемя в сохраненые фильмы
  const [isSavedMovies, setSavedMovies] = useState([]);
  function handelSaveCardMovies() {
    DataAuthApi.getCardMovies().then((data) => {
      setSavedMovies(data);
      // setLike(false);
    });
  }
  useEffect(() => {
    handelSaveCardMovies();
  }, []);

  // удаление фильма
  function handelDeleteMovies(movies) {
    DataAuthApi.deleteMovies(movies._id)
      .then((data) => {
        console.log(data);
        setSavedMovies((state) =>
          state.filter((item) => {
            if (item._id !== movies._id) {
              return isSavedMovies;
            }
          })
        );
        // setConditionSection(false);
      })
      .catch((err) => {
        console.log(`Карточка не удалена (код ошибки): ${err}`);
      });
  }

  return (
    <MoviesGeneralLIstCards cardSpace={cardSpace}>
      {isSavedMovies.map((card, index) => {
        return (
          <MoviesCard
            handelDeleteMovies={handelDeleteMovies}
            cardInfo={card}
            key={index}
          />
        );
      })}
    </MoviesGeneralLIstCards>
  );

  // return (
  //   <section className={`card-list ${cardSpace}`}>
  //     <div className="container">
  //       <div className="box-preloader">
  //         {props.isPreloader && <Preloader />}
  //         <p className="error-preloader"> {props.isErrorMessage}</p>
  //       </div>
  //       <div className="card-list__box">
  //         {props.isSavedMovies.map((card, index) => {
  //           return <MoviesCard cardInfo={card} key={index} />;
  //         })}
  //       </div>
  //     </div>
  //   </section>
  // );
}

export default SaveMoviesCardList;
