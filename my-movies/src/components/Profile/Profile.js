import "./Profile.css";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CurrentUserContext from "../../context/CurrentUserContext";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const name = currentUser.name;
  const email = currentUser.email;
  const btnDisabel = "profile__btn_save_active";

  const [isNameContext, setNameContex] = useState(name)
  const [isEmailContext, setEmailContex] = useState(email)
  const [isStateInput, setStateName] = useState(false)
  const [isStaticInput, setStaticInput] = useState(true)
  const [isStateBtn, setStateBtn] = useState(false)
  const [isBtnActivSave, setBtnActiveSave] = useState(false)
  const [isMainState, setMainState] = useState(false)
  const [isDisabled, setDisabled] = useState(true);
  const [isMessageHiden, setMessageHiden] = useState(false);
  const [isMessageError, setMessageError] = useState("");

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  function handleFormSubmit(data) {
    if (isMainState) {
      props.handleUpdateUser(data);
      setMessageHiden(true);
      setStateBtn(false)
      setDisabled(true)
      setStateName(false)
      setStaticInput(true)
      setMessageError('')
      reset();
    } else {
      console.log('false')
      setMessageError("Для сохранения данных измените (email и name)");
    }
  }


  function renameState() {
    setDisabled(false);
    setMessageHiden(false);
    setStateBtn(true)
    setStateName(true)
    setStaticInput(false)
    setBtnActiveSave(false)
    setMainState(false)
  }

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.name === isNameContext || value.email === isEmailContext || value.name === '' || value.email === '') {
        setMessageError("Для сохранения данных измените (email и name)");
        setBtnActiveSave(false)
        setMainState(false)
      }
      else if (value.name !== isNameContext && value.email !== isEmailContext && value.name !== '' || value.email !== '') {
        setMessageError("");
        setBtnActiveSave(true)
        setMainState(true)
      }
    });

    return () => subscription;
  }, []);

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
                    // required: "Поле (Имя) объязательно нужно заполнить",
                    pattern: {
                      value: /^[a-zA-Zа-яёА-ЯЁ -]+$/,
                      message:
                        "поле (Имя) должно содержать только латиницу, кириллицу, пробел или дефис.",
                    },
                    onChange: (e) => {
                      setMessageHiden(false);
                      setNameContex(e.target.value)
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
                  className={`profile__input profile__input_name 
                   ${isDisabled && "profile__input-disabled"}`}
                  placeholder="Имя"
                  value={isStateInput && isNameContext || ''}
                />

                <div className="profile__name profile-general">{isStaticInput && name}</div>
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
                    // required: "Поле (E-mail) объязательно нужно заполнить",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Укажиет свой (E-mail)",
                    },
                    onChange: (e) => {
                      setMessageHiden(false);
                      setEmailContex(e.target.value)
                    },
                  })}
                  type="email"
                  className={`profile__input profile__input_email ${isDisabled && "profile__input-disabled"}`}
                  placeholder="E-mail"
                  value={isStateInput && isEmailContext || ""}
                />

                <div className="profile__email profile-general">{isStaticInput && email || ''}</div>
              </div>

              <div className="profile__error-box">
                {errors?.email && (
                  <p className="profile__general-text">
                    {errors?.email?.message || "error!"}
                  </p>
                )}
              </div>

              <div className="profile__box-btn">
                <div className={`profile__error`}> {isMessageHiden && props.isErrorMessage} </div>

                {!isStateBtn && <>
                  <button onClick={renameState} type="button" className={`profile__btn`}> Редактировать </button>
                  <button onClick={props.signOut} type="button" className={`profile__link`}> Выйти из аккаунта </button>
                </>}

                {isStateBtn && <>
                  <div className={`profile__error ${"profile__error_red"}`}> {isMessageError} </div>
                  <button className={`profile__btn profile__btn_save  ${isBtnActivSave && btnDisabel}`} type="submit">Сохраннить</button>
                </>}

              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
