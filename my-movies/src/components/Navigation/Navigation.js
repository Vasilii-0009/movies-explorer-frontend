import "./Navigation.css";
import React from "react";
import { NavLink } from "react-router-dom";
import Acaunt from "../Acaunt/Acaunt";
import NavigationPopupContext from "../../context/NavigationPopupContext";
import HidenNavigation from "../../context/HidenNavigation";

function Navigation(props) {
  const navigationContext = React.useContext(NavigationPopupContext);
  const hidenNavigatin = React.useContext(HidenNavigation);
  return (
    <div className={` navigation  ${navigationContext} `}>
      <div className="navigation__container">
        <div className="navigation__box-movies">
          <NavLink
            onClick={hidenNavigatin}
            className="link navigation__main"
            to="/"
          >
            {" "}
            <span className="navigation__main-text">Главная</span>
          </NavLink>
          <NavLink
            onClick={hidenNavigatin}
            className="link navigation__movies"
            to="/movies"
          >
            {" "}
            <span className="navigation__movies-text">Фильмы</span>
          </NavLink>
          <NavLink
            onClick={hidenNavigatin}
            className="link navigation__movies-save"
            to="/saved-movies"
          >
            {" "}
            <span className="navigation__movies-save-text">
              Сохранённые фильмы
            </span>
          </NavLink>
        </div>
        <Acaunt o onClick={hidenNavigatin} />
      </div>
    </div>
  );
}

export default Navigation;
