import { React } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'
function Layoute(props) {
   return (
      <>
         <Header isBurger={props.isBurger} onClick={props.onClick} />
         <Outlet />
      </>

   )
}
export default Layoute