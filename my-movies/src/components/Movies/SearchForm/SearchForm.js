import './SearchForm.css'
import { React, useState } from 'react'
import { useForm } from 'react-hook-form'

function SearchForm() {

   const {
      register,
      formState: {
         errors
      },
      handleSubmit
   } = useForm({
      mode: "onSubmit"
   })

   function handleFormSubmit() {
      props.handeleRegisterUser()
   }

   const [isActive, setActive] = useState('')
   function handleActiveBtn() {
      if (isActive === 'search-form__btn-regular_active') {
         setActive('')
      } else {
         setActive('search-form__btn-regular_active')
      }

   }
   return (
      <section className='search-form'>
         <div className='search-form__container container'>
            <form onSubmit={handleSubmit(handleFormSubmit)} className='search-form__box'>
               <input {...register("film",
                  {
                     required: true
                  }
               )} className='search-form__input' type='text' placeholder='Фильм'></input>
               <button type='submit' className='search-form__btn'>Найти</button>
            </form>
            <div className='search-form__box-btn'>
               <div onClick={handleActiveBtn} className={` search-form__btn-regular ${isActive}`} >
                  <div className='search-form__btn-round'></div>
               </div>
               <p className='search-form__text-regular'>Короткометражки</p>
            </div>
            <div className='search-form__line'></div>
         </div>
      </section >
   )
}

export default SearchForm;