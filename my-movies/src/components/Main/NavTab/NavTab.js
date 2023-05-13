import "./NavTab.css";
import React from "react";
import { NavLink } from "react-router-dom";
import Acaunt from "../../Acaunt/Acaunt";
function NavTabMovies(props) {
  return (
    <>
      <div className="header__movies-box-film">
        <div>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `header__movies-film ${
                isActive ? "header__movies-film-active" : ""
              }`
            }
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              `header__movies-save-film ${
                isActive ? "header__movies-film-active" : ""
              }`
            }
          >
            Сохранённые Фильмы
          </NavLink>
        </div>

        <Acaunt />
      </div>
    </>
  );
}

export default NavTabMovies;
