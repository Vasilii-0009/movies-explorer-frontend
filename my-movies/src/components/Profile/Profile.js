import './Profile.css'
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

function Profile() {
   // textBtn
   const [isTextBtn, setTextBtn] = useState(false)

   const handleChangeText = (event) => {
      if (event.target.value !== '') {
         setTextBtn(true)
      } else {
         setTextBtn(false)
      }
   }

   const {
      register,
      formState: {
         errors
      },
      handleSubmit
   } = useForm({
      mode: "onSubmit"
   })

   function handleFormSubmit(data) {
      console.log(data)
   }
   return (
      <>
         <section className="profile">
            <div className="container">
               <div className="profile__box">
                  <h1 className="profile__title">Привет, Виталий!</h1>
                  <form onSubmit={handleSubmit(handleFormSubmit)} className="profile__form">
                     <div className="profile__box-input profile__box-input_line">

                        <input {...register("name",
                           {
                              required: true,
                              onChange: (event) => {
                                 handleChangeText(event)
                              }
                           }
                        )} type="string" className="profile__input profile__input_name" placeholder="Имя"></input>

                        <div className="profile__name profile-general">Виталий</div>
                     </div>
                     <div className="profile__box-input">

                        <input {...register("email",
                           {
                              required: true,
                              onChange: (event) => {
                                 handleChangeText(event)
                              }
                           }
                        )} type="email" className="profile__input profile__input_email" placeholder="E-mail" />

                        <div className="profile__email profile-general">pochta@yandex.ru</div>
                     </div>
                     <div className='profile__box-btn'>
                        <div className='profile__error'>
                           {errors?.name || errors?.email ? <p className='profile__error-text'>{'При обновлении профиля произошла ошибка.'}  </p> : ""}
                        </div>
                        <button type="submit" className={`profile__btn ${isTextBtn ? 'profile__btn_save' : ""}`} >{isTextBtn ? 'Сохранить' : 'Редактировать'}</button>
                     </div>
                  </form>
                  <NavLink to='/signin' className={`profile__link ${isTextBtn ? 'profile__link_none' : ""}`}>Выйти из аккаунта</NavLink>
               </div>
            </div >
         </section >
      </>
   )
}

export default Profile;