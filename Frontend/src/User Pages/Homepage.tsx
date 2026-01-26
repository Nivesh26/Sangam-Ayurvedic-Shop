import React from 'react'
import Header from '../User Components/Header.tsx'
import Footer  from '../User Components/Footer.tsx'
import Hero from '../User Components/Hero.tsx'
import Feature from '../User Components/Feature.tsx'

const Homepage = () => {
  return (
    <div>
        <Header />
        <Hero/>
        <Feature/>
        <Footer />
    </div>
  )
}

export default Homepage