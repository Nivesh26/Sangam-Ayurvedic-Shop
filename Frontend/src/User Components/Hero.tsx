import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import hero from '../assets/istockphoto-855014754-612x612.jpg'
import hero2 from '../assets/traditional-mortar-and-pestle-for-grinding-ingredients-photo.jpeg'

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slides = [
    {
      src: hero,
      alt: 'Authentic Ayurvedic Products',
      title: 'Authentic Ayurvedic Products',
      description: 'Discover the power of natural healing with our premium Ayurvedic collection'
    },
    {
      src: hero2,
      alt: 'Traditional Wellness Solutions',
      title: 'Traditional Wellness Solutions',
      description: 'Experience centuries-old wisdom in every product we offer'
    }
  ]

  // Auto-rotate every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [slides.length])

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Slides with Images and Content */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <img 
            src={slide.src} 
            alt={slide.alt} 
            className="w-full h-full object-cover" 
          />
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
          
          {/* Content - Minimal Design */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center text-white px-4 max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-gray-50 drop-shadow-lg font-light">
                {slide.description}
              </p>
              <Link
                to="/shop"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Previous Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
        aria-label="Next image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero