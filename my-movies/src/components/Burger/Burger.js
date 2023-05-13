import React from "react";

function Burger(props) {
  return (
    <div
      onClick={props.onClick}
      className={` header-movies__burger ${props.isBurger}`}
    >
      <span className="header-movies__burger-line"></span>
    </div>
  );
}

export default Burger;
