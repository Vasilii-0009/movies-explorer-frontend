import './AboutProject.css'
import { React } from 'react'

function AboutProject() {
   return (
      <section className='project'>
         <div className='project__container container'>
            <h3 className='project__title'>О проекте</h3>
            <div className='project__box'>
               <div className='project__etap project__general'>
                  <h4 className='project__etap-title project__general-title'>Дипломный проект включал 5 этапов</h4>
                  <p className='project__etap-text project__general-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
               </div>
               <div className='project__week project__general'>
                  <h4 className='project__week-title project__general-title'>На выполнение диплома ушло 5 недель</h4>
                  <p className='project__week-text project__general-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
               </div>
            </div>
            <div className='project__box-week'>
               <div className='project__one-week project-general-week'>1 неделя</div>
               <div className='project__four-week project-general-week'>4 недели</div>
            </div>
            <div className='project__box-end'>
               <div className='project__back-end project-general-week'>Back-end</div>
               <div className='project__front-end project-general-week'>Front-end</div>
            </div>
         </div>
      </section>
   )
};

export default AboutProject;



