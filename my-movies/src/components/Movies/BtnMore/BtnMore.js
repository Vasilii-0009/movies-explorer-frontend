import "./BtnMore.css";
import React from "react";

function BtnMore(props) {
  const sectionMoreVisibilty = "block-more-visibiliti";

  return (
    <section
      className={`block-more ${
        props.isConditonSectionBtn && sectionMoreVisibilty
      } ${props.isConditonBtn && props.classBlockMore}`}
    >
      <div className="container ">
        <div onClick={props.handleShowCardFilms} className="block-more__btn">
          Ещё
        </div>
      </div>
    </section>
  );
}

export default BtnMore;
