import "./Profile.css";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import CurrentUserContext from "../../context/CurrentUserContext";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const name = currentUser.name;
  const email = currentUser.email;

  const btnDisabel = "profile__btn_save_active";
  const [isDisabled, setDisabled] = useState(true);
  const [isMessageHiden, setMessageHiden] = useState(false);
  const [isBtnStateEmail, setBtnStateEmail] = useState(false);
  const [isMessageEmail, setMessageEmail] = useState("");

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
  });

  function handleFormSubmit(data) {
    props.handleUpdateUser(data);
    reset();
  }

  function renameState() {
    setDisabled(false);
    setMessageHiden(true);
  }

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.email === email) {
        setBtnStateEmail(true);
        setMessageEmail("Введите новый email");
      } else {
        setBtnStateEmail(false);
      }
    });

    return () => subscription;
  }, [watch, handleFormSubmit]);

  return (
    <>
      <section className="profile">
        <div className="container">
          <div className="profile__box">
            <h1 className="profile__title">{`Привет, ${name}!`}</h1>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="profile__form"
            >
              <div className="profile__box-input ">
                <input
                  {...register("name", {
                    required: "Поле (Имя) объязательно нужно заполнить",
                    pattern: {
                      value: /^[a-zA-Zа-яёА-ЯЁ -]+$/,
                      message:
                        "поле (Имя) должно содержать только латиницу, кириллицу, пробел или дефис.",
                    },
                    onChange: (e) => {
                      setMessageHiden(false);
                    },

                    minLength: {
                      value: 2,
                      message:
                        "Поле (Имя) должно содержать более двух или более символов",
                    },
                    maxLength: {
                      value: 20,
                      message:
                        "Поле (Имя) не должно содержать более 30 символа",
                    },
                  })}
                  type="string"
                  className={`profile__input profile__input_name ${
                    isDisabled && "profile__input-disabled"
                  }`}
                  placeholder="Имя"
                ></input>

                <div className="profile__name profile-general">{name}</div>
              </div>
              <div className="profile__error-box">
                {errors?.name && (
                  <p className="profile__general-text">
                    {errors?.name?.message || "error!"}
                  </p>
                )}
              </div>
              <div className="profile__box-input profile__box-input_line">
                <input
                  {...register("email", {
                    required: "Поле (E-mail) объязательно нужно заполнить",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Укажиет свой (E-mail)",
                    },
                    onChange: (e) => {
                      setMessageHiden(false);
                    },
                  })}
                  type="email"
                  className={`profile__input profile__input_email ${
                    isDisabled && "profile__input-disabled"
                  }`}
                  placeholder="E-mail"
                />

                <div className="profile__email profile-general">{email}</div>
              </div>
              <div className="profile__error-box">
                {errors?.email && (
                  <p className="profile__general-text">
                    {errors?.email?.message || "error!"}
                  </p>
                )}
              </div>

              <div className="profile__box-btn">
                <div
                  className={`profile__error 
                ${isBtnStateEmail && "profile__error_red"}`}
                >
                  {isBtnStateEmail && isMessageEmail}
                  {isMessageHiden && props.isErrorMessage}
                </div>

                <button
                  onClick={renameState}
                  type="submit"
                  disabled={isDisabled ? "" : !isValid}
                  className={`profile__btn ${
                    isDisabled ? "" : "profile__btn_save"
                  } ${isValid && btnDisabel} ${
                    isBtnStateEmail ? "profile__btn_disbled" : ""
                  } `}
                >
                  {isDisabled ? "Редактировать" : "Сохраннить"}
                </button>
              </div>
            </form>
            <button
              onClick={props.signOut}
              type="button"
              className={` profile__link `}
            >
              {`${isDisabled ? "Выйти из аккаунта" : ""}`}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
