import './Register.css'
import { React, useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import WindowWithFrom from '../WindowWithForm/WindowWithForm';
import logo from '../../images/logo.svg'

function Register(props) {

   const {
      register,
      formState: {
         errors
      },
      handleSubmit
   } = useForm({
      mode: "onSubmit"
   })

   function handleFormSubmit() {
      props.handeleRegisterUser()
   }

   return (
      <WindowWithFrom logo={logo} onSubmit={handleSubmit(handleFormSubmit)} title='Добро пожаловать!' >

         <div className='window-form__name'>Имя</div>
         <input  {...register("name",
            {
               required: true
            }
         )} className={`window-form__register-name window-form__input-general `} type="string" placeholder="Имя" />
         <div className='window-form__name'>E-mail</div>
         <input  {...register("email", {
            required: true
         })} className={`  window-form__register-email window-form__input-general `} type="email" placeholder="E-mail" />
         <div className='window-form__name'>Пароль</div>
         <input {...register("password", {
            required: true
         })} className='window-form__register-password window-form__input-general' type="password" placeholder="Пароль" />


         <div className='window-form__box-btn'>
            <div className='window-form__error-general'>
               {errors?.name || errors?.email || errors?.password ? <p className='window-form__error-general_text'>{'При регистрации пользователя произошла ошибка.'}  </p> : ""}
            </div>
            <button className="window-form__register-button window-form__button-general" type="submit">Зарегистрироваться</button>
            <p className='window-form__register-link window-form__link-general'>Уже зарегистрированы?<Link className='window-form__register-link-signin window-form__link-signin-general' to="/signin">Войти</Link></p>
         </div>

      </WindowWithFrom >
   )
}

export default Register;