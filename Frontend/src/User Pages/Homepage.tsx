import React from 'react'
import Header from '../User Components/Header.tsx'
import Footer  from '../User Components/Footer.tsx'
import Hero from '../User Components/Hero.tsx'
import Feature from '../User Components/Feature.tsx'
import Category from '../User Components/Category.tsx'
import Bestselling from '../User Components/Bestselling.tsx'
import NewProduct from '../User Components/NewProduct.tsx'
import CTA from '../User Components/CTA.tsx'

const Homepage = () => {
  return (
    <div>
        <Header />
        <Hero/>
        <Feature/>
        {/* <Category/> */}
        <Bestselling/>
        <CTA/>
        <NewProduct/>
        <Footer />
    </div>
  )
}

export default Homepage