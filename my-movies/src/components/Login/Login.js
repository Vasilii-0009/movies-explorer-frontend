import './Login.css'
import { React } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import WindowWithFrom from '../WindowWithForm/WindowWithForm'
import logo from '../../images/logo.svg'
function Login(props) {

   const {
      register,
      formState: {
         errors
      },
      handleSubmit
   } = useForm()

   function handleFormSubmit() {
      props.handeleLogin()
   }
   return (
      <WindowWithFrom logo={logo} onSubmit={handleSubmit(handleFormSubmit)} title='Рады видеть!'>
         <div className='window-form__name'>E-mail</div>
         <input {...register("email", {
            required: true
         })} className='window-form__login-email window-form__input-general' type="email" placeholder="E-mail" ></input>
         <div className='window-form__name'>Password</div>
         <input {...register("password", {
            required: true
         })} className='window-form__login-password window-form__input-general' type="password" placeholder="Пароль" ></input>
         <div className='window-form__box-btn-login'>
            <div className='window-form__error-general'>

               {errors?.email || errors?.password ? <p className='window-form__error-general_text'>{'Вы ввели неправильный логин или пароль.'}  </p> : ""}

            </div>
            <button className="window-form__login-button window-form__button-general" type="submit">Войти</button>
            <p className='window-form__login-link window-form__link-general'>Ещё не зарегистрированы?<Link className='window-form__login-link-signin window-form__link-signin-general' to="/signup">Зарегистация</Link></p>
         </div>
      </WindowWithFrom>
   )
}

export default Login