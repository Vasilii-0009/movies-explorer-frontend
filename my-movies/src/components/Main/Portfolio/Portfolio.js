import './Portfolio.css'
import { React } from 'react'
import PortfolioGeneral from './PortfoliGeneral/PortfolioGeneral'

function Portfolio() {
   const stateSite = 'https://vasilii-0009.github.io/how-to-learn/'
   const adaptivSite = 'https://vasilii-0009.github.io/russian-travel/'
   const fullSite = 'https://vasilii-0009.github.io/mesto-react/'
   return (
      <section className='portfolio'>
         <div className='container'>
            <h3 className='portfolio__title'>Портфолио</h3>
            <ul className='portfolio__list'>
               <li className='portfolio__item'>
                  <PortfolioGeneral link={stateSite} title='Статичный сайт' />
               </li>
               <li className='portfolio__item'>
                  <PortfolioGeneral link={adaptivSite} title='Адаптивный сайт' />
               </li>
               <li className='portfolio__item'>
                  <PortfolioGeneral link={fullSite} title='Одностраничное приложение' />
               </li>
            </ul>
         </div>
      </section >
   )
}

export default Portfolio;