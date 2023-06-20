import React from "react";
import "./MoviesCardList.css";
import MoviesGeneralLIstCards from "../../MoviesGeneral/MoviesGeneralLIstCards/MoviesGeneralLIstCards";
import MoviesCard from "../MoviesCard/MoviesCard";
import ErrorMessage from "../../ErrorMessage/ErrorMessage"


function SaveMoviesCardList(props) {
  const cardSpace = `card-list-space`
  return (
    <>
      {props.isError ? <ErrorMessage /> : ""}
      <MoviesGeneralLIstCards cardSpace={cardSpace}>
        <>
          {props.arrMovies.map((card, index) => {
            return (
              <MoviesCard
                handelDeleteMovies={props.handelDeleteMovies}
                cardInfo={card}
                key={index}
              />
            );
          })}
        </>

      </MoviesGeneralLIstCards>

    </>


  );
}

export default SaveMoviesCardList;
