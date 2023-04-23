import './PortfolioGenaral.css'
import { React } from 'react'
import portfoliAarrow from '../../../../images/portfolio-arrow.svg'

function PortfolioGeneral(props) {
   return (
      <>
         <div className='portfolio-general'>
            <h4 className='portfolio-general__title'>{props.title}</h4>
            <img src={portfoliAarrow} className='portfolio-general__icon' alt='стрелочка вверх' />
         </div>
         <div className='portfolio-general__line'></div>
      </>

   )
}

export default PortfolioGeneral;