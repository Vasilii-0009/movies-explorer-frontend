import './Portfolio.css'
import { React } from 'react'
import PortfolioGeneral from './PortfoliGeneral/PortfolioGeneral'

function Portfolio() {
   return (
      <section className='portfolio'>
         <div className='container'>
            <h3 className='portfolio__title'>Портфолио</h3>
            <PortfolioGeneral title='Статичный сайт' />
            <PortfolioGeneral title='Адаптивный сайт' />
            <PortfolioGeneral title='Одностраничное приложение' />
         </div>
      </section >
   )
}

export default Portfolio;