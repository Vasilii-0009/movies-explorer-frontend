//import "./SearchFromSaved.css";
import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function SearchFormSaved(props) {
   const textSaveSearch= localStorage.getItem("messageSearchSave");
   const statatusCheckBox = localStorage.getItem("stateCheckboxSave");
  const jsonStatatusCheckBox = JSON.parse(statatusCheckBox);
   const [isActive, setActive] = useState("");

  //checkbox
  useEffect(() => {
    if (jsonStatatusCheckBox === true) {
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

  function handleFormSubmitSave(dataMeassage) {

   localStorage.setItem("messageSearchSave", dataMeassage.filmSave);
   
   props.handelMoviesFilter()

     console.log('click')

  }

//   function handleCheckbox() {
//     if (moviesSearchText !== null) {
//       console.log("moviesSearchText moviesSearchText", moviesSearchText);
//       props.searchMovies();
//     }
//   }

  // const watchCheckbox = watch((value) => {
  //   console.log('component search')
  //   localStorage.setItem("stateCheckboxSave", value.checkboxSave);
  //   if (value.checkboxSave === true) {
  //     setActive("visible-checkbox_active");
  //   } else {
  //     setActive(" ");
  //   }
  // });

  function handelCheckbox () {
    const watchCheckbox = watch((value) => {
      console.log('1-происходит клик по чекбоксу component search')
      console.log('2-получаю значение чекбокса', value)
      localStorage.setItem("stateCheckboxSave", value.checkboxSave);
      if (value.checkboxSave === true) {
        setActive("visible-checkbox_active");
      } else {
        setActive(" ");
      }
      // props.handelMoviesFilterCheckbox()
      //test
      props.test()
      //test
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
                {
                   value: textSaveSearch,
                }
              )}
              className="search-form__input"
              type="text"
              placeholder="Фильм"
            ></input>
            <button type="submit" className="search-form__btn">
              Найти
            </button>
          </form>

          {/* <div className="search-form__box-error">
            {errors?.film && (
              <p className="search-form__general-text">
                {errors?.film?.message || "error!"}
              </p>
            )}
          </div> */}

          <div className="search-form__box-btn">
            <label className="label-checkbox">
              Короткометражки
              <input
                {...register("checkboxSave", 
               //  { value: res }
                )}
                type="checkbox"
                onClick={handelCheckbox}
               //  onClick={handleCheckbox}
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
