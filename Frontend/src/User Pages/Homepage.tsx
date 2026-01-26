import React from 'react'
import Header from '../User Components/Header.tsx'
import Footer  from '../User Components/Footer.tsx'
import Hero from '../User Components/Hero.tsx'
import Feature from '../User Components/Feature.tsx'
import Category from '../User Components/Category.tsx'
import Bestselling from '../User Components/Bestselling.tsx'

const Homepage = () => {
  return (
    <div>
        <Header />
        <Hero/>
        <Feature/>
        <Category/>
        <Bestselling/>
        <Footer />
    </div>
  )
}

export default Homepage