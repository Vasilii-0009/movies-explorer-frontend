import './Footer.css'
import { React } from 'react'

function Footer() {
   return (
      <footer className='footer'>
         <div className='container'>
            <h4 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <div className='footer__box'>
               <div className='footer__data'>&#169; {new Date().getFullYear()}</div>
               <div className='footer__link-box'>
                  <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank'>Яндекс.Практикум</a>
                  <a className='footer__link' href='https://github.com/' target='_blank'>Github</a>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default Footer;