import './Header.css'
import { React } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import logo from '../../images/logo.svg'
import HeaderMovies from './HeaderMovies/HeaderMovies.js'

function Header(props) {
   return (
      <>
         <Routes>
            <Route path='/' element={
               <header className='header'>
                  <div className='header__box container' >
                     <img className='header__sign-logo' alt='Логотип' src={logo} />
                     <div className='header__box-nav'>
                        <NavLink className='header__sign header__sign-up' to="/signup">Регистрация </NavLink>
                        <NavLink className='header__sign header__sign-in' to="/signin">Войти </NavLink>
                     </div>
                  </div>
               </header >
            } />
            <Route path='/movies' element={
               <HeaderMovies isBurger={props.isBurger} onClick={props.onClick} />

            } />

            <Route path='/saved-movies' element={
               <HeaderMovies isBurger={props.isBurger} onClick={props.onClick} />
            } />

            <Route path='/profile' element={
               <HeaderMovies isBurger={props.isBurger} onClick={props.onClick} />
            } />
         </Routes>
      </>
   )
};

export default Header;
