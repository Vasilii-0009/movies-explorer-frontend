import './AboutMe.css'
import { React } from 'react'
import portfolioImage from '../../../images/portfolio-image.svg'

function AboutMe() {
   return (
      <section className='aboutme'>
         <div className='container'>
            <h3 className='aboutme__title general__title'>Студент </h3>
            <div className='aboutme__box'>
               <div className='aboutme__info'>
                  <div className='aboutme__avtor-name'>Виталий</div>
                  <p className='aboutme__avtor-about'>Фронтенд-разработчик, 30 лет</p>
                  <p className='aboutme__avtor-info'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                     и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                  <a href='https://github.com/' target='_blanck' className='aboutme__avtor-github'>Github</a>
               </div>
               <div className='aboutme__image'>
                  <img className='aboutme__image-avtor' src={portfolioImage} alt='фотография пользователя' />
               </div>
            </div>
         </div>

      </section>
   )
}

export default AboutMe;