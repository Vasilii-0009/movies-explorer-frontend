import "./Register.css";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import WindowWithFrom from "../WindowWithForm/WindowWithForm";
import logo from "../../images/logo.svg";

function Register(props) {
  const btnDisabel = "btn-active";
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
    props.handeleRegisterUser({ data });
    // reset();
  }

  return (
    <WindowWithFrom
      logo={logo}
      onSubmit={handleSubmit(handleFormSubmit)}
      title="Добро пожаловать!"
    >
      <div className="window-form__name">Имя</div>
      <input
        {...register("name", {
          required: "Поле (Имя) объязательно нужно заполнить",
          minLength: {
            value: 2,
            message:
              "Поле (Имя) должно содержать более двух или более символов",
          },
          maxLength: {
            value: 20,
            message: "Поле (Имя) не должно содержать более 30 символа",
          },
          pattern: {
            value: /^[a-zA-Zа-яёА-ЯЁ -]+$/,
            message:
              "поле (Имя) должно содержать только латиницу, кириллицу, пробел или дефис.",
          },
        })}
        className={`window-form__register-name window-form__input-general`}
        type="string"
        placeholder="Имя"
      ></input>
      <div className="window-form__error-box">
        {errors?.name && (
          <p className="window-form__error-general_text">
            {errors?.name?.message || "error!"}
          </p>
        )}
      </div>
      <div className="window-form__name">E-mail</div>
      <input
        {...register("email", {
          required: "Поле (E-mail) объязательно нужно заполнить",
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Укажиет свой (E-mail)",
          },
        })}
        className={`window-form__register-email window-form__input-general`}
        type="email"
        placeholder="E-mail"
      ></input>
      <div className="window-form__error-box">
        {errors?.email && (
          <p className="window-form__error-general_text">
            {errors?.email?.message || "error!"}
          </p>
        )}
      </div>
      <div className="window-form__name">Пароль</div>
      <input
        {...register("password", {
          required: "Поле (Пароль) объязательно нужно заполнить",
        })}
        className="window-form__register-password window-form__input-general"
        type="password"
        placeholder="Пароль"
      ></input>
      <div className="window-form__error-box">
        {errors?.password && (
          <p className="window-form__error-general_text">
            {errors?.password?.message || "error!"}
          </p>
        )}
      </div>

      <div className="window-form__box-btn">
        <div className="window-form__error-general">
          {props.isErrorState ? props.isErrorMessage : ""}
        </div>
        <button
          disabled={!isValid}
          className={`window-form__register-button window-form__button-general ${
            isValid && btnDisabel
          }`}
          type="submit"
        >
          Зарегистрироваться
        </button>
        <p className="window-form__register-link window-form__link-general">
          Уже зарегистрированы?
          <Link
            className="window-form__register-link-signin window-form__link-signin-general"
            to="/signin"
          >
            Войти
          </Link>
        </p>
      </div>
    </WindowWithFrom>
  );
}

export default Register;
