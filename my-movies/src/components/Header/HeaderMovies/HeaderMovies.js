import './HeaderMovies.css'
import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../../../images/logo.svg'
import Acaunt from '../../Acaunt/Acaunt'

function HeaderMovies(props) {
   return (
      <header className='header-movies'>
         <div className='header-movies__box container' >
            <NavLink to='/'><img className='header-movies__logo' alt='Логотип' src={logo} /></NavLink>
            <div className='header-movies__box-nav'>
               <div className='header-movies__box-film'>
                  <NavLink to="/movies" className='header-movies__film'>Фильмы</NavLink>
                  <NavLink to="/saved-movies" className='header-movies__save-film'>Сохранённые Фильмы</NavLink>
               </div>
               <Acaunt />
            </div>
            <div onClick={props.onClick} className={` header-movies__burger ${props.isBurger}`} ><span className='header-movies__burger-line'></span></div>
         </div>
      </header>
   )
}

export default HeaderMovies;