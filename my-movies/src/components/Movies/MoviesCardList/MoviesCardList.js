// import React from "react";
// import MoviesCard from "../MoviesCard/MoviesCard";
// import './MoviesCardList.css'
// import Cards from '../../../utils/cards'

// function MoviesCardsList() {
//    return (
//       <>
//          <section className="card-list">
//             <div className="container" >
//                <div className="card-list__box">{
//                   Cards.map((card, index) => {
//                      return (
//                         <MoviesCard cardInfo={card} key={index} />
//                      )
//                   })
//                }
//                </div>
//                <div className="card-list__btn">Ещё</div>
//             </div>
//          </section>

//       </>
//    )
// }
// export default MoviesCardsList;
import './MoviesCardList.css'
import React from "react";
import MoviesGeneralLIstCards from '../../MoviesGeneral/MoviesGeneralLIstCards/MoviesGeneralLIstCards'
import MoviesCard from "../MoviesCard/MoviesCard";
import Cards from "../../../utils/cards"

function MoviesCardsList() {
   return (
      <>
         <MoviesGeneralLIstCards>{
            Cards.map((card, index) => {
               return (
                  <MoviesCard cardInfo={card} key={index} />
               )
            })
         }
         </MoviesGeneralLIstCards >
         <div className="block-more">
            <div className="container ">
               <div className="block-more__btn">Ещё</div>
            </div>
         </div>
      </>
   )
}

export default MoviesCardsList;