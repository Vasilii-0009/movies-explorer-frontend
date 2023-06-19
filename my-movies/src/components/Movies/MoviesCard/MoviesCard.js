import React from "react";
import "./MoviesCard.css";

function MoviesCard(props) {
  const isLiked = props.cardInfo._id !== null;

  const classBtnLike = `card__btn-like ${isLiked && "card__btn-like-active"}`;

  function handelSubmitCreatCardMovirs(event) {
    props.handelCreatCardMovies(props.cardInfo, event);
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
