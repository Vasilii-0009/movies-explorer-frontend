// import { React } from 'react'
// import './MoviesCard.css'

// function MoviesCard(props) {
//    const cardLikeButtonClassName = (`elements__like `);

//    return (
//       <div className='card'>
//          <div>
//             <div style={{ backgroundImage: `url(${props.cardInfo.link})` }}
//                className="card__img" ></div>
//          </div>

//          <div className="card__box-info">
//             <h2 className="card__title">{props.cardInfo.name}</h2>
//             <button className={cardLikeButtonClassName} type="button" >  </button>
//          </div>
//          <div className='card__time'> 1ч 40м</div>
//       </div>
//    )
// }

// export default MoviesCard

import React from "react";
import MoviesGenralCard from "../../MoviesGeneral/MoviesGeneralCard/MoviesGenralCard"
import './MoviesCard.css'

function MoviesCard(props) {
   const cardLikeButtonClassName = (`card__btn-like`);
   return (
      <MoviesGenralCard btn={cardLikeButtonClassName} cardInfo={props.cardInfo} />
   )
}

export default MoviesCard;