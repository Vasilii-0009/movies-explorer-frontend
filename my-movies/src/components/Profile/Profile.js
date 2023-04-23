import './Profile.css'
import React from "react";
import { NavLink } from "react-router-dom";

function Profile() {
   return (
      <>
         <section className="profile">
            <div className="container">
               <div className="profile__box">
                  <h1 className="profile__title">Привет, Виталий!</h1>
                  <form className="prifile__from">
                     <div className="profile__box-input profile__box-input-line">
                        <input type="string" name="name" className="profile__input profile__input-name" placeholder="Имя"></input>

                        <div className="profile__general profile__name">Виталий</div>
                     </div>
                     <div className="profile__box-input">
                        <input type="email" className="profile__input profile__input-email" placeholder="E-mail" />
                        <div className="profile__general profile__email">pochta@yandex.ru</div>
                     </div>
                     <button className="profile__btn">Редактировать</button>
                  </form>
                  <NavLink to='/signin' className='profile__link'>Выйти из аккаунта</NavLink>
               </div>
            </div>
         </section>
      </>
   )
}

export default Profile;