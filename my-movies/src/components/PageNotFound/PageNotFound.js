import React from "react";
import { NavLink } from "react-router-dom";
import './PageNotFound.css'

function PageNotFound() {
   return (
      <section className="not-found">
         <div className="container not-found__box">
            <h1 className="not-found__title">404</h1>
            <h2 className="not-found__sub-title"> Страница не найдена</h2>
            <NavLink to='/' className='not-found__link'>Назад</NavLink>
         </div>
      </section>
   )
}

export default PageNotFound