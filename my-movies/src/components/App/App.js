import './App.css';
import React, { useEffect, useState, } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Layoute from '../Layoute';
import Preloader from '../Movies/Preloader/Preloader';
import MoviesCardsList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import SavedMovies from '../SavedMovies/MoviesCardList/MoviesCardList';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Navigation from '../Navigation/Navigation';

function App() {
   // Route
   const navigateRegister = useNavigate()
   const navigateLogin = useNavigate()

   function handeleRegisterUser() {
      navigateRegister('/signin')
   }

   function handeleLogin() {
      navigateLogin('/movies')
   }

   // Burger
   const [isNavigat, setNavigate] = useState('')
   const [isBurger, setBurger] = useState('')

   function ShowNavigition() {
      if (isNavigat === 'navigation-show') {
         setNavigate('')
         setBurger('')
      } else {
         setNavigate('navigation-show')
         setBurger('header-movies__burger-active')
      }
   }
   function HidenNanigation() {
      setNavigate('')
      setBurger('')

   }

   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<Layoute isBurger={isBurger} onClick={ShowNavigition} />} >
               <Route path='/' element={
                  <>
                     <Main />
                     <Footer />
                     <Navigation isNavigat={isNavigat} onClick={HidenNanigation} />
                  </>

               } />
               <Route path='/movies' element={
                  <>
                     <SearchForm />
                     <MoviesCardsList />
                     <Footer />
                     <Navigation isNavigat={isNavigat} onClick={HidenNanigation} />
                     {/* <Preloader /> */}
                  </>

               } />
               <Route path='/saved-movies' element={
                  <>
                     <SearchForm />
                     <SavedMovies />
                     <Footer />
                     <Navigation isNavigat={isNavigat} onClick={HidenNanigation} />
                  </>
               }
               />
               <Route path='/profile' element={
                  <>
                     <Profile />
                     <Navigation isNavigat={isNavigat} onClick={HidenNanigation} />
                  </>
               }
               />
            </Route>

            <Route path='/signup' element=
               {
                  <>
                     <Register handeleRegisterUser={handeleRegisterUser} />
                  </>
               } />
            <Route path='/signin' element=
               {
                  <>
                     <Login handeleLogin={handeleLogin} />
                  </>
               } />
            <Route path='*' element={
               <PageNotFound />
            } />

         </Routes>
      </div>
   );
}

export default App;