import './PortfolioGenaral.css'
import { React } from 'react'

import portfoliAarrow from '../../../../images/portfolio-arrow.svg'

function PortfolioGeneral(props) {
   return (
      <>
         <a href={props.link} target='_blank' className='portfolio__general'>
            <h4 className='portfolio__general-title'>{props.title}</h4>
            <img src={portfoliAarrow} className='portfolio__general-icon' alt='стрелочка вверх' />
         </a >
         <div className='portfolio__general-line'></div>
      </>

   )
}

export default PortfolioGeneral;