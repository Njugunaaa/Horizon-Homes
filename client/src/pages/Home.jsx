import React from 'react'
import NavBar from '../components/Layouts/NavBar'
import HeroSection from '../components/Layouts/HeroSection'
import Services from '../components/Layouts/Services'
import PopularProperties from '../components/Layouts/PopularProperty'
import Footer from '../components/Layouts/Footer'
import HomeNavbar from '../components/Layouts/HomeNavbar'

const Home = () => {
  return (
    <>
  <HomeNavbar/>
   <HeroSection/>
   <Services/>
   <PopularProperties/>
   <Footer/>
  </>
  )
}

export default Home