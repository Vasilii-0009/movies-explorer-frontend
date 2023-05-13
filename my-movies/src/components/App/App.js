import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { DataAuthApi } from "../../utils/MainApi.js";
import { DataMoviesApi } from "../../utils/MoviesApi";

import ProtectedRoute from "../ProtectedRoute";

import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Layoute from "../Layoute";
import MoviesCardsList from "../Movies/MoviesCardList/MoviesCardList";
import Movies from "../Movies/Movies";
import SearchForm from "../Movies/SearchForm/SearchForm";
import SavedMovies from "../SavedMovies/MoviesCardList/MoviesCardList";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import Navigation from "../Navigation/Navigation";
// context
import NavigationPopupContext from "../../context/NavigationPopupContext";
import HidenNavigationContext from "../../context/HidenNavigationContext";
import CurrentUserContext from "../../context/CurrentUserContext";
import FilmsContext from "../../context/FilmsContext";

function App() {
  //app
  const [loggedIn, setLoggidIn] = useState(false);
  const [currentUserContext, setCurrentUser] = useState({});
  //err
  const [isErrorMessage, setErrorMessage] = useState("");
  const [isErrorState, setErrorState] = useState(false);
  const [isErrorStateLogin, setErrorStateLogin] = useState(false);

  // Route
  const navigaMovies = useNavigate();
  const navigateLogiIn = useNavigate();
  // Burger
  const [isNavigatContext, setNavigate] = useState("");
  const [isBurger, setBurger] = useState("");

  function ShowNavigition() {
    if (isNavigatContext === "navigation-show") {
      setNavigate("");
      setBurger("");
      document.body.classList.remove("block");
    } else {
      setNavigate("navigation-show");
      setBurger("header-movies__burger-active");
      document.body.classList.add("block");
    }
  }
  function HidenNanigationContext() {
    setNavigate("");
    setBurger("");
    document.body.classList.remove("block");
  }

  //signup регистрация пользовтеля
  function handeleRegisterUser(data) {
    const name = data.data.name;
    const email = data.data.email;
    const password = data.data.password;
    DataAuthApi.registerUser(name, email, password)
      .then((data) => {
        console.log(data);
        setLoggidIn(true);
        navigaMovies("/movies", { replace: true });
        setCurrentUser(data);
        setErrorMessage("");
        // get token
        DataAuthApi.loginUser(email, password).then((tokenUser) => {
          localStorage.setItem("token", tokenUser.token);
        });
      })
      .catch((err) => {
        setErrorState(true);
        if (err === "409") {
          console.log(
            `код ошибки 409 - пользовтель с таким E-mail уже существует`
          );
          return setErrorMessage("Пользователь с таким email уже существует.");
        }
        console.log(`400 - некорректно заполнено одно из полей  ${err}`);
        setErrorMessage("При регистрации пользователя произошла ошибка.");
      });
  }
  //signin вход пользовтеля на сайт и получения token
  function handeleLoginUser(data) {
    const email = data.data.email;
    const password = data.data.password;
    DataAuthApi.loginUser(email, password)
      .then((tokenUser) => {
        localStorage.setItem("token", tokenUser.token);
        const jwt = localStorage.getItem("token");
        if (jwt === "undefined") {
          return setErrorMessage(
            "При авторизации произошла ошибка. Токен не передан или передан не в том формате."
          );
        } else if (jwt === "null") {
          return setErrorMessage(
            " При авторизации произошла ошибка. Переданный токен некорректен."
          );
        } else {
          setLoggidIn(true);
          navigaMovies("/movies", { replace: true });
          setCard([]);
          setConditionSection(false);
          setErrorMessage("");
        }
      })
      .catch((err) => {
        setErrorStateLogin(true);
        if (err === "401") {
          console.log("Вы ввели неправильный логин или пароль.");
          return setErrorMessage("Вы ввели неправильный логин или пароль.");
        }
        console.log(` this.err-${err}`);
      });
  }
  // user/me проверяем есть ли токен пользовтеля на сайте для входа на сайт без авторизации
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      tokenCheck();
    }
  }, [loggedIn]);

  function tokenCheck() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      DataAuthApi.getTokenUser()
        .then((data) => {
          setLoggidIn(true);
          navigaMovies("/movies", { replace: true });
          setCurrentUser(data);
        })
        .catch(() => {
          console.log(
            `${
              jwt === null
                ? "401 — Переданный токен некорректен "
                : " 400 — Токен не передан или передан не в том формате"
            }`
          );
        });
    }
  }
  //выход пользовтеля с сайта
  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("messageSearch");
    localStorage.removeItem("stateCheckbox");
    navigateLogiIn("/signin", { replace: true });
    setLoggidIn(false);
  }
  //обновляем дынные пользователя
  function handleUpdateUser(data) {
    DataAuthApi.upDateInfoUser(data.name, data.email)
      .then((data) => {
        setCurrentUser(data);
        setErrorMessage("Обновленные данные пользователя сохранены");
      })
      .catch((err) => {
        if (err === "409") {
          return setErrorMessage(
            <p className="profile__error_red">Этот email уже используется</p>
          );
        }
        console.log(`Данные пользователя не сохранены (код ошибки): ${err}`);
        setErrorMessage(
          <p className="profile__error_red">
            Обновленные данные пользователя не сохранены
          </p>
        );
      });
  }

  // // //Поиск фильмов
  // const [isSavedMovies, setSavedMovies] = useState([]);

  // const [isConditonSection, setConditionSection] = useState(false);

  // const [isLike, setLike] = useState(false);

  // // preloader
  // const [isPreloader, setPreloader] = useState(false);

  // // context films
  // const [cardsContext, setCard] = useState([]);

  // function searchMovies() {
  //   setPreloader(true);
  //   DataMoviesApi.searhcMovies()
  //     .then((data) => {
  //       if (data) {
  //         const newArrayFilms = [];

  //         data.forEach((movie, index) => {
  //           newArrayFilms[index] = movie;

  //           // newArrayFilms[index]._id = null;
  //           newArrayFilms[index].movieId = movie.id;
  //           newArrayFilms[index]._id = null;

  //           isSavedMovies.length > 0
  //             ? isSavedMovies.forEach((savedMovie) => {
  //                 // сравниваем movieId

  //                 if (savedMovie.movieId === newArrayFilms[index].movieId) {
  //                   // если одинаковые, то устанавливаем _id
  //                   newArrayFilms[index]._id = savedMovie._id;
  //                 }
  //               })
  //             : (newArrayFilms[index]._id = null);
  //         });

  //         setCard(newArrayFilms);

  //         setPreloader(false);
  //         setErrorMessage("");
  //         // setConditionSection(true);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(
  //         `${err} - "«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»"`
  //       );
  //       setPreloader(false);
  //       setCard([]);
  //       // return setErrorMessage(
  //       //   "«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»"
  //       // );
  //     });
  // }

  // useEffect(() => {
  //   const messageSearch = localStorage.getItem("messageSearch");
  //   if (messageSearch) {
  //     searchMovies();
  //   }
  // }, [isConditonSection]);

  //создаем картчку фильма, которая будет добавлена  в сохраненые фильмы

  // function handelCreatCardMovirs(data) {
  //   setLike(true);
  //   const country = data.country;
  //   const director = data.director;
  //   const duration = data.duration;
  //   const year = data.year;
  //   const description = data.description;
  //   const image = `https://api.nomoreparties.co${data.image.url}`;
  //   const trailerLink = data.trailerLink;
  //   const thumbnail = `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`;
  //   const movieId = data.id;
  //   const nameRU = data.nameRU;
  //   const nameEN = data.nameEN;
  //   if (data._id === null) {
  //     DataAuthApi.creatCardMovies(
  //       country,
  //       director,
  //       duration,
  //       year,
  //       description,
  //       image,
  //       trailerLink,
  //       thumbnail,
  //       movieId,
  //       nameRU,
  //       nameEN
  //     )
  //       .then((dataSave) => {
  //         console.log(dataSave);

  //         const res = cardsContext.filter((item) => {
  //           const resArray = item.movieId === dataSave.movies.movieId;
  //           return resArray;
  //         });
  //         res.map((item) => {
  //           item._id = dataSave.movies._id;
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(`Карточка не сохранена  (код ошибки): ${err}`);
  //       });
  //   } else {
  //     DataAuthApi.deleteMovies(data._id)
  //       .then((dataDelete) => {
  //         console.log(dataDelete);
  //         data._id = null;
  //       })
  //       .catch((err) => {
  //         console.log(`Карточка не удалена (код ошибки): ${err}`);
  //       });
  //   }
  // }

  //получаем карточки фильмов и добавлемя в сохраненые фильмы
  // function handelSaveCardMovies() {
  //   DataAuthApi.getCardMovies().then((data) => {
  //     // setSavedMovies(data);
  //     // setLike(false);
  //   });
  // }

  // useEffect(() => {
  //   handelSaveCardMovies();
  // }, []);

  // удаление фильма
  // function handelDeleteMovies(movies) {
  //   DataAuthApi.deleteMovies(movies._id)
  //     .then((data) => {
  //       console.log(data);
  //       setSavedMovies((state) =>
  //         state.filter((item) => {
  //           if (item._id !== movies._id) {
  //             return isSavedMovies;
  //           }
  //         })
  //       );
  //       setConditionSection(false);
  //     })
  //     .catch((err) => {
  //       console.log(`Карточка не удалена (код ошибки): ${err}`);
  //     });
  // }

  return (
    <div className="App">
      <NavigationPopupContext.Provider value={isNavigatContext}>
        <HidenNavigationContext.Provider value={HidenNanigationContext}>
          <CurrentUserContext.Provider value={currentUserContext}>
            {/* <FilmsContext.Provider value={cardsContext}> */}
            <Routes>
              <Route
                path="/"
                element={
                  <Layoute
                    loggedIn={loggedIn}
                    isBurger={isBurger}
                    onClick={ShowNavigition}
                  />
                }
              >
                <Route
                  path="/"
                  element={
                    <>
                      <Main />
                      <Footer />
                      <Navigation />
                    </>
                  }
                />

                <Route
                  path="/movies"
                  element={
                    <ProtectedRoute
                      element={
                        <>
                          {/* <SearchForm searchMovies={searchMovies} />
                            <MoviesCardsList
                              isLike={isLike}
                              isSavedMovies={isSavedMovies}
                              cardsContext={cardsContext}
                              isPreloader={isPreloader}
                              isErrorMessage={isErrorMessage}
                              isConditonSection={isConditonSection}
                              handelCardMovies={handelCreatCardMovirs}
                            /> */}
                          <Movies />
                          <Footer />
                          <Navigation />
                        </>
                      }
                      loggedIn={loggedIn}
                    />
                  }
                />
                <Route
                  path="/saved-movies"
                  element={
                    <>
                      <SearchForm />
                      <SavedMovies
                      // handelDeleteMovies={handelDeleteMovies}
                      // isSavedMovies={isSavedMovies}
                      />
                      <Footer />
                      <Navigation />
                    </>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      element={
                        <>
                          <Profile
                            signOut={signOut}
                            handleUpdateUser={handleUpdateUser}
                            isErrorMessage={isErrorMessage}
                          />
                          <Navigation />
                        </>
                      }
                      loggedIn={loggedIn}
                    />
                  }
                />
              </Route>

              <Route
                path="/signup"
                element={
                  <>
                    <Register
                      handeleRegisterUser={handeleRegisterUser}
                      isErrorMessage={isErrorMessage}
                      isErrorState={isErrorState}
                    />
                  </>
                }
              />
              <Route
                path="/signin"
                element={
                  <>
                    <Login
                      handeleLogin={handeleLoginUser}
                      isErrorMessage={isErrorMessage}
                      isErrorStateLogin={isErrorStateLogin}
                    />
                  </>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            {/* </FilmsContext.Provider> */}
          </CurrentUserContext.Provider>
        </HidenNavigationContext.Provider>
      </NavigationPopupContext.Provider>
    </div>
  );
}

export default App;
