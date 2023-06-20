import "./HeaderMovies.css";
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../images/logo.svg";
import NavTabMovies from "../../Main/NavTab/NavTab";
import Burger from "../../Burger/Burger";

function HeaderMovies(props) {
  return (
    <header className="header-movies">
      <div className="header-movies__box container">
        <NavLink to="/">
          <img className="header-logo" alt="Логотип" src={logo} />
        </NavLink>
        <div className="header-movies__box-nav">
          <NavTabMovies />
        </div>
        <Burger onClick={props.onClick} isBurger={props.isBurger} />
      </div>
    </header>
  );
}

export default HeaderMovies;
