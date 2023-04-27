import './WindowWithForm.css'
import { React } from 'react'
import { NavLink } from 'react-router-dom';

function WindowWithFrom(props) {

   return (
      <>
         <div className='window-form'>
            <div className='window-form__box'>
               <div className='window-form__box-top'>
                  <NavLink to='/'>
                     <div className='window-form__img' style={{ backgroundImage: `url(${props.logo})` }} />
                  </NavLink>
                  <h1 className='window-form__title'>{props.title}</h1>
               </div>
               <form onSubmit={props.onSubmit} className="window-form__form" action="get" >
                  {props.children}
               </form>
            </div>
         </div >
      </>
   )
}

export default WindowWithFrom;