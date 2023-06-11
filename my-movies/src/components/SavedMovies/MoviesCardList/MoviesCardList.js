import React from "react";
import { useState, useEffect } from "react";
import MoviesGeneralLIstCards from "../../MoviesGeneral/MoviesGeneralLIstCards/MoviesGeneralLIstCards";
import saveCards from "../../../utils/saveCards";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { DataAuthApi } from "../../../utils/MainApi";

function SaveMoviesCardList(props) {
  const cardSpace = `card-list-space`
  return (
    <MoviesGeneralLIstCards cardSpace={cardSpace}>
      {props.arrMovies.map((card, index) => {
        return (
          <MoviesCard
            handelDeleteMovies={props.handelDeleteMovies}
            cardInfo={card}
            key={index}
          />
        );
      })}
    </MoviesGeneralLIstCards>
  );
}

export default SaveMoviesCardList;
