import "./MoviesGeneralLIstCards.css";
import React from "react";
import Preloader from "../../Movies/Preloader/Preloader";

function MoviesCardsList(props) {
  return (
    <>
      <section className={`card-list ${props.cardSpace}`}>
        <div className="container">
          <div className="box-preloader">
            {props.isPreloader && <Preloader />}
            <p className="error-preloader"> {props.isErrorMessage}</p>
          </div>
          <div className="card-list__box">{props.children}</div>
        </div>
      </section>
    </>
  );
}
export default MoviesCardsList;
