import './Navigation.css'
import { NavLink } from "react-router-dom";
import Acaunt from '../Acaunt/Acaunt';

function Navigation(props) {

   return (
      <div className={` navigation  ${props.isNavigat} `}>
         <div className="navigation__container">
            <div className="navigation__box-movies">
               <NavLink onClick={props.onClick} className='link navigation__main' to='/'> <span className="navigation__main-text">Главная</span></NavLink>
               <NavLink onClick={props.onClick} className='link navigation__movies' to='/movies'> <span className="navigation__movies-text">Фильмы</span></NavLink>
               <NavLink onClick={props.onClick} className='link navigation__movies-save' to='/saved-movies'> <span className="navigation__movies-save-text">Сохранённые фильмы</span></NavLink>
            </div>
            <Acaunt onClick={props.onClick} />
         </div>
      </div>
   )
}

export default Navigation;