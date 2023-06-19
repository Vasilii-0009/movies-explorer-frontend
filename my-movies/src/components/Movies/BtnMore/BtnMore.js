import "./BtnMore.css";
import React from "react";
import MyConst from "../../MyConst/MyConst";

function BtnMore(props) {
  const { SECTION_MORE_VISIBILITY,
    CLASS_BLOCK_MORE } = MyConst
  return (
    <section
      className={`block-more ${props.isConditonSectionBtn && SECTION_MORE_VISIBILITY
        } ${props.isConditonBtn && CLASS_BLOCK_MORE}`}
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
