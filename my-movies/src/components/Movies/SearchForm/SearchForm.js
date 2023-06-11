import "./SearchForm.css";
import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function SearchForm(props) {
  const moviesSearchText = localStorage.getItem("messageSearch");
  const searchScheckBox = localStorage.getItem("stateCheckbox");
  const res = JSON.parse(searchScheckBox);
  const [isActive, setActive] = useState("");

  //checkbox
  useEffect(() => {
    if (res === true) {
      setActive("visible-checkbox_active");
    } 
  }, []);

//react hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onSubmit",
  });

  function handleFormSubmit(dataMeassage) {
    localStorage.setItem("messageSearch", dataMeassage.film);
    props.searchMovies();
  }

  function handleCheckbox() {
    if (moviesSearchText !== null) {
      props.searchMovies();
    }
  }
// изменяем значение чекбокса и передвегаем ползунок
  const watchCheckbox = watch((value) => {
    console.log(value)
    localStorage.setItem("stateCheckbox", value.checkbox);
    if (value.checkbox === true) {
      setActive("visible-checkbox_active");

    } else {
      setActive(" ");
    }
  });

  return (
    <>
      <section className="search-form">
        <div className="search-form__container container">
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="search-form__box"
          >
            <input
              {...register(
                "film",
                {
                  value: moviesSearchText,
                  required: "Нужно ввести ключевое слово",
                }
                // { value: moviesSearchText }
              )}
              className="search-form__input"
              type="text"
              placeholder="Фильм"
            ></input>
            <button type="submit" className="search-form__btn">
              Найти
            </button>
          </form>

          <div className="search-form__box-error">
            {errors?.film && (
              <p className="search-form__general-text">
                {errors?.film?.message || "error!"}
              </p>
            )}
          </div>

          <div className="search-form__box-btn">
            <label className="label-checkbox">
              Короткометражки
              <input
                {...register("checkbox", { value: res })}
                type="checkbox"
                onClick={handleCheckbox}
              />
              <span className={`visible-checkbox ${isActive}`}></span>
            </label>
          </div>
          <div className="search-form__line"></div>
        </div>
      </section>
    </>
  );
}

export default SearchForm;
