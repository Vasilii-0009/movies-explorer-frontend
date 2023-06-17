import React from "react";
import MoviesGenralCard from "../../MoviesGeneral/MoviesGeneralCard/MoviesGenralCard";
import "./MoviesCard.css";

function SaveMoviesCard(props) {

  function handleDeleteMovies() {
    const btnLike = document.querySelector('.card__btn-like')
    props.handelDeleteMovies(props.cardInfo);
    console.log(props.cardInfo)
    props.cardInfo._id = null
    console.log(btnLike)
    // btnLike.classList.remove('card__btn-like-active')
  }
  return (
    <div className={`card`}>
      <a href={props.cardInfo.trailerLink} target="_blank">
        <img
          src={`${props.cardInfo.image}`}
          alt="обложка фильма"
          className="card__img"
        />
      </a>

      <div className="card__box-info">
        <h2 className="card__title">{props.cardInfo.nameRU}</h2>
        <button
          onClick={handleDeleteMovies}
          className="card__btn-remove"
          type="button"
        ></button>
      </div>
      <div className="card__time">{props.cardInfo.duration}</div>
    </div>
  );
}
export default SaveMoviesCard;
