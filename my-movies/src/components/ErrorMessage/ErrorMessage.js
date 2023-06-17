import React from "react";
import './ErrorMessage.css'

function ErrorMessage() {
   return (
      <>
         <section className="error-message">
            <div className="container" >
               <div className="error-message__text">Ничего не найдено</div>
            </div>
         </section>
      </>
   )
}

export default ErrorMessage;