import './Acaunt.css'
import React from "react";
import { NavLink } from "react-router-dom";
import iconAcount from '../../images/icon-acount.svg'

function Acaunt(props) {
   return (
      <div onClick={props.onClick} className='acount'>
         <img className='acount__icon' src={iconAcount} alt="иконка-акаунта" />
         <NavLink to='/profile' className='acount__link'>Аккаунт</NavLink>
      </div>
   )
}

export default Acaunt;