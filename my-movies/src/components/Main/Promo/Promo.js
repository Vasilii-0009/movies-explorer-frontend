import './Promo.css'
import { React } from 'react'
import promo from '../../../images/promo.svg';

function Promo() {
   return (
      <section className='promom'>
         <div className='promom__box container'>
            <div className='promo__text'>
               <h1 className='promo__title'>Учебный проект студента факультета  Веб-разработки.</h1>
               <h3 className='promo__sub-title'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</h3>
               <button className='promo__button'>Узнать больше</button>
            </div>
            <div className='promo__image-box'>
               <img className='promo__image' alt='изображение ввиде планеты заполненое надписями (web)' src={promo} />
            </div>
         </div>
      </section>
   )
}

export default Promo;