import React, { useEffect } from "react";
import CurrentUserContext from "../../../context/CurrentUserContext";
import MoviesGenralCard from "../../MoviesGeneral/MoviesGeneralCard/MoviesGenralCard";
import "./MoviesCard.css";

function MoviesCard(props) {
  // console.log("props.cardInfo", props.cardInfo._id);
  const isLiked = props.cardInfo._id !== null;

  const classBtnLike = `card__btn-like ${isLiked && "card__btn-like-active"}`;

  function handelSubmitCreatCardMovirs(event) {
    props.handelCreatCardMovies(props.cardInfo, event);
    // props.handelSaveCardMovies();
  }

  return (
    <>
      <div className={`card`}>
        <a href={props.cardInfo.trailerLink} target="_blank">
          <img
            src={`https://api.nomoreparties.co${props.cardInfo.image.url}`}
            alt="обложка фильма"
            className="card__img"
          />
        </a>

        <div className="card__box-info">
          <h2 className="card__title">{props.cardInfo.nameRU}</h2>
          <button
            onClick={handelSubmitCreatCardMovirs}
            // className={"card__btn-like "}
            className={classBtnLike}
            type="button"
          >
            {" "}
          </button>
        </div>
        <div className="card__time">{props.cardInfo.duration}</div>
      </div>
    </>
  );
}

export default MoviesCard;
