import React from "react";
import MoviesGeneralLIstCards from '../../MoviesGeneral/MoviesGeneralLIstCards/MoviesGeneralLIstCards'
import saveCards from '../../../utils/saveCards'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'

function SaveMoviesCardList() {
   const cardSpace = (`card-list__space`)
   return (
      <MoviesGeneralLIstCards cardSpace={cardSpace}>
         {
            saveCards.map((card, index) => {

               return (
                  <MoviesCard cardInfo={card} key={index} />
               )
            })
         }


      </MoviesGeneralLIstCards>
   )
}

export default SaveMoviesCardList;