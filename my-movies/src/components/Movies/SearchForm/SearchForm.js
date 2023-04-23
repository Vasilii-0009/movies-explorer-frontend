import './SearchForm.css'
import { React } from 'react'

function SearchForm() {
   return (
      <section className='search-form'>
         <div className='search-form__container container'>
            <form className='search-form__box'>
               <input className='search-form__input' type='text' placeholder='Фильм'></input>
               <button type='button' className='search-form__btn'>Найти</button>
            </form>
            <div className='search-form__box-btn'>
               <div className='search-form__btn-regular' >
                  <div className='search-form__btn-round'></div>
               </div>
               <p className='search-form__text-regular'>Короткометражки</p>
            </div>
            <div className='search-form__line'></div>
         </div>
      </section>
   )
}

export default SearchForm;