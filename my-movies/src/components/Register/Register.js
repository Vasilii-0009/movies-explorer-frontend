import './Register'
import { React } from 'react'
import WindowWithFrom from '../WindowWithForm/WindowWithForm';
import { Link } from 'react-router-dom';
import './Register.css'
import logo from '../../images/logo.svg'

function Register(props) {

   function handleFormSubmit(e) {
      e.preventDefault()
      props.handeleRegisterUser()
   }
   return (
      <WindowWithFrom logo={logo} onSubmit={handleFormSubmit} title='Добро пожаловать!' >
         <div className='window-form__name'>Имя</div>
         <input className='window-form__register-name window-form__input-general' name='name' type="string" placeholder="Имя" />
         <div className='window-form__name'>E-mail</div>
         <input className='window-form__register-email window-form__input-general' name='email' type="email" placeholder="E-mail" />
         <div className='window-form__name'>Пароль</div>
         <input className='window-form__register-password window-form__input-general' name='password' type="password" placeholder="Пароль" />
         <button className="window-form__register-button window-form__button-general" type="submit">Зарегистрироваться</button>
         <p className='window-form__register-link window-form__link-general'>Уже зарегистрированы?<Link className='window-form__register-link-signin window-form__link-signin-general' to="/signin">Войти</Link></p>
      </WindowWithFrom>
   )
}

export default Register;