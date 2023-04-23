import React from "react";
import { NavLink } from "react-router-dom";
import iconAcount from '../../images/icon-acount.svg'

function Acaunt(props) {
   return (
      <div onClick={props.onClick} className='header-movies__acount'>
         <img className='header-movies__acount-icon' src={iconAcount} alt="иконка-акаунта" />
         <NavLink to='/profile' className='header-movies__acount-link'>Аккаунт</NavLink>
      </div>
   )
}

export default Acaunt;