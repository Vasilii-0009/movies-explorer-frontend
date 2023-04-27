import React from "react";
import MoviesGenralCard from '../../MoviesGeneral/MoviesGeneralCard/MoviesGenralCard'
import './MoviesCard.css'

function SaveMoviesCard(props) {
   const cardLikeButtonClassName = (`card__btn-remove`);
   return (
      <MoviesGenralCard btn={cardLikeButtonClassName} cardInfo={props.cardInfo} />
   )
}
export default SaveMoviesCard;