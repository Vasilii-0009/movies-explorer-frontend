import { React } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import WindowWithFrom from '../WindowWithForm/WindowWithForm'
import logo from '../../images/logo.svg'
function Login(props) {

   function handleSubmit(e) {
      e.preventDefault()
      props.handeleLogin()
   }
   return (
      <WindowWithFrom logo={logo} onSubmit={handleSubmit} title='Рады видеть!'>
         <div className='window-form__name'>E-mail</div>
         <input className='window-form__login-email window-form__input-general' name='email' type="email" placeholder="E-mail" ></input>
         <div className='window-form__name'>Password</div>
         <input className='window-form__login-password window-form__input-general' name='password' type="password" placeholder="Пароль" ></input>
         <button className="window-form__login-button window-form__button-general" type="submit">Войти</button>
         <p className='window-form__login-link window-form__link-general'>Ещё не зарегистрированы?<Link className='window-form__login-link-signin window-form__link-signin-general' to="/signup">Зарегистация</Link></p>
      </WindowWithFrom>
   )
}

export default Login