import "./Login.css";
import { React } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import WindowWithFrom from "../WindowWithForm/WindowWithForm";
import logo from "../../images/logo.svg";
function Login(props) {
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
    props.handeleLogin({ data });
    reset();
  }
  return (
    <WindowWithFrom
      logo={logo}
      onSubmit={handleSubmit(handleFormSubmit)}
      title="Рады видеть!"
    >
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
        className="window-form__login-email window-form__input-general"
        type="email"
        placeholder="E-mail"
      />
      <div className="window-form__error-box">
        {errors?.email && (
          <p className="window-form__error-general_text">
            {errors?.email?.message || "error!"}
          </p>
        )}
      </div>

      <div className="window-form__name">Password</div>
      <input
        {...register("password", {
          required: "Поле (Пароль) объязательно нужно заполнить",
        })}
        className="window-form__login-password window-form__input-general"
        type="password"
        placeholder="Пароль"
      />
      <div className="window-form__error-box">
        {errors?.password && (
          <p className="window-form__error-general_text">
            {errors?.password?.message || "error!"}
          </p>
        )}
      </div>
      <div className="window-form__box-btn-login">
        <div className="window-form__error-general">{`${
          props.isErrorStateLogin ? props.isErrorMessage : ""
        }`}</div>
        <button
          disabled={!isValid}
          className={`window-form__login-button window-form__button-general ${
            isValid && btnDisabel
          }`}
          type="submit"
        >
          Войти
        </button>
        <p className="window-form__login-link window-form__link-general">
          Ещё не зарегистрированы?
          <Link
            className="window-form__login-link-signin window-form__link-signin-general"
            to="/signup"
          >
            Зарегистация
          </Link>
        </p>
      </div>
    </WindowWithFrom>
  );
}

export default Login;
