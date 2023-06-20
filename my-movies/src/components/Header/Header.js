import "./Header.css";
import { React } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import HeaderMovies from "./HeaderMovies/HeaderMovies.js";
import Acaunt from "../Acaunt/Acaunt";
import NavTabMovies from "../Main/NavTab/NavTab";
import Burger from "../Burger/Burger";

function Header(props) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <header className="header">
              <div className="header__box container">
                <NavLink to="/">
                  <img className="header-logo" alt="Логотип" src={logo} />
                </NavLink>
                {props.loggedIn && (
                  <div className="header__box-movies">
                    {" "}
                    <NavTabMovies />
                  </div>
                )}
                <div className="header__box-nav">
                  {props.loggedIn ? (
                    ""
                  ) : (
                    <div>
                      <NavLink
                        className="header__sign header__sign-up"
                        to="/signup"
                      >
                        Регистрация{" "}
                      </NavLink>
                      <NavLink
                        className="header__sign header__sign-in"
                        to="/signin"
                      >
                        Войти{" "}
                      </NavLink>
                    </div>
                  )}
                </div>
                {props.loggedIn && (
                  <Burger onClick={props.onClick} isBurger={props.isBurger} />
                )}
              </div>
            </header>
          }
        />
        <Route
          path="/movies"
          element={
            <HeaderMovies isBurger={props.isBurger} onClick={props.onClick} />
          }
        />

        <Route
          path="/saved-movies"
          element={
            <HeaderMovies isBurger={props.isBurger} onClick={props.onClick} />
          }
        />

        <Route
          path="/profile"
          element={
            <HeaderMovies isBurger={props.isBurger} onClick={props.onClick} />
          }
        />
      </Routes>
    </>
  );
}

export default Header;
