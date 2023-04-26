import './Techs.css'
import { React } from 'react'

function Techs() {
   return (
      <section className='techs'>
         <div className='container'>
            <h3 className='techs__title'>Технологии</h3>
            <div className='techs__box'>
               <h2 className='techs__box-title'>7 технологий</h2>
               <p className='techs__box-text'>На курсе веб-разработки мы освоили технологии, которые применили <br />  в дипломном проекте.</p>
               <ul className='techs__box-list'>
                  <li className='techs__item'>HTML</li>
                  <li className='techs__item'>CSS</li>
                  <li className='techs__item'>CJ</li>
                  <li className='techs__item'>React</li>
                  <li className='techs__item'>Git</li>
                  <li className='techs__item'>Express.js</li>
                  <li className='techs__item'>mongoDB</li>
               </ul>
            </div>
         </div>
      </section>
   )
}

export default Techs;