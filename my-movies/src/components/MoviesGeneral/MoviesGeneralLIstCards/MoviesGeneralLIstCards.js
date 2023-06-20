import "./MoviesGeneralLIstCards.css";
import React from "react";

function MoviesCardsList(props) {
  return (
    <>
      <section className={`card-list ${props.cardSpace}`}>
        <div className="container">
          {props.isErrorCardMovies && (
            <div className="error-message">
              {props.isMessageErrorCardMovies}
            </div>
          )}
          <div className="error-message">{props.isErrorMessage}</div>
          <div className="card-list__box">{props.children}</div>
        </div>
      </section>
    </>
  );
}
export default MoviesCardsList;
