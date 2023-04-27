import './MoviesGenaralCard.css'
import { React } from 'react'

function MoviesCard(props) {
   return (
      <div className='card'>
         <div>
            <img src={props.cardInfo.link} alt='обложка фильма' className="card__img" />
         </div>

         <div className="card__box-info">
            <h2 className="card__title">{props.cardInfo.name}</h2>
            <button className={props.btn} type="button" >  </button>
         </div>
         <div className='card__time'>{props.cardInfo.time}</div>
      </div>
   )
}

export default MoviesCard