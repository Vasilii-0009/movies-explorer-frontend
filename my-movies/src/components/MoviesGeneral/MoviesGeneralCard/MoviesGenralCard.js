import { Route, Routes } from "react-router-dom";
import "./MoviesGenaralCard.css";
import { React } from "react";

function MoviesCard(props) {
  function handelSubmitCreatCardMovirs() {
    props.handelCardMovies(props.cardInfo);
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
            className={props.btn}
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
