import './MoviesGenaralCard.css'
import { React } from 'react'

function MoviesCard(props) {
   return (
      <div className='card'>
         <div>
            <div style={{ backgroundImage: `url(${props.cardInfo.link})` }}
               className="card__img" ></div>
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