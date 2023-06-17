import { React, useState } from "react";
import { useForm } from "react-hook-form";

function SearchFormSaved(props) {
  const [isActive, setActive] = useState("");

  //react hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onSubmit",
  });
  //функция чтобы отфильтровать массив с фильмами
  function handleFormSubmitSave(dataMeassage) {
    localStorage.setItem("messageSearchSave", dataMeassage.filmSave);
    props.handelMoviesFilter()
  }
  //функция чтобы отфильтровать массив с фильмами с помощью чекбокса
  function handelCheckbox() {
    const watchCheckbox = watch((value) => {
      localStorage.setItem("stateCheckboxSave", value.checkboxSave);
      if (value.checkboxSave === true) {
        setActive("visible-checkbox_active");
      } else {
        setActive(" ");
      }
      props.handelMoviesFilterCheckbox()
      props.startFilter()
    });
  }

  return (
    <>
      <section className="search-form">
        <div className="search-form__container container">
          <form
            onSubmit={handleSubmit(handleFormSubmitSave)}
            className="search-form__box"
          >
            <input
              {...register(
                "filmSave",
              )}
              className="search-form__input"
              type="text"
              placeholder="Фильм"
            />
            <button type="submit" className="search-form__btn">
              Найти
            </button>
          </form>
          <div className="search-form__box-btn">
            <label className="label-checkbox">
              Короткометражки
              <input
                {...register("checkboxSave",
                )}
                type="checkbox"
                onClick={handelCheckbox}
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

export default SearchFormSaved;
