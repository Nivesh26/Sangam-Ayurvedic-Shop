import { useRef, useEffect, useState } from 'react'
import { FaPills, FaLeaf, FaOilCan, FaSprayCan, FaShieldAlt, FaHeartbeat } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Category = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let isDragging = false
    let startX = 0
    let scrollLeft = 0
    let isUserScrolling = false
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null

    // Mouse drag functionality
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return // Only left mouse button
      isDragging = true
      startX = e.pageX - container.offsetLeft
      scrollLeft = container.scrollLeft
      container.style.cursor = 'grabbing'
      container.style.userSelect = 'none'
      setIsPaused(true)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX) * 2 // Scroll speed multiplier
      container.scrollLeft = scrollLeft - walk
      isUserScrolling = true
    }

    const handleMouseUp = () => {
      isDragging = false
      container.style.cursor = 'grab'
      container.style.userSelect = 'auto'
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false
        setIsPaused(false)
      }, 2000) // Resume after 2 seconds
    }

    const handleMouseLeave = () => {
      if (isDragging) {
        isDragging = false
        container.style.cursor = 'grab'
        container.style.userSelect = 'auto'
      }
      if (!isUserScrolling) {
        setIsPaused(false)
      }
    }

    container.addEventListener('mousedown', handleMouseDown)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('mouseleave', handleMouseLeave)

    // Set initial cursor style
    container.style.cursor = 'grab'

    // Auto-scroll functionality (slower)
    const scrollInterval: ReturnType<typeof setInterval> = setInterval(() => {
      if (container && !isPaused && !isDragging) {
        container.scrollLeft += 0.5 // Slower scroll speed
        
        // Reset to start when reaching the end (seamless loop)
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0
        }
      }
    }, 30) // Slower interval (30ms instead of 20ms)

    return () => {
      container.removeEventListener('mousedown', handleMouseDown)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('mouseleave', handleMouseLeave)
      clearInterval(scrollInterval)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [isPaused])
  const categories = [
    {
      icon: FaPills,
      title: 'Ayurvedic Medicines',
      description: 'Traditional healing remedies',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FaLeaf,
      title: 'Herbal Supplements',
      description: 'Natural wellness boosters',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FaOilCan,
      title: 'Oils & Massage',
      description: 'Therapeutic oils and balms',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: FaSprayCan,
      title: 'Skin & Hair Care',
      description: 'Natural beauty solutions',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: FaShieldAlt,
      title: 'Immunity Boosters',
      description: 'Strengthen your defenses',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FaHeartbeat,
      title: 'Digestive Care',
      description: 'Support healthy digestion',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: 'auto' }}
        >
          {/* Duplicate categories for seamless loop */}
          {[...categories, ...categories].map((category, index) => {
            const IconComponent = category.icon
            return (
              <Link
                key={`${category.title}-${index}`}
                to="/shop"
                className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-500 shrink-0 w-64 select-none"
                onMouseDown={(e) => {
                  // Prevent navigation when dragging starts
                  const startX = e.clientX
                  const handleMouseMove = (moveEvent: MouseEvent) => {
                    if (Math.abs(moveEvent.clientX - startX) > 5) {
                      e.preventDefault()
                    }
                  }
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove)
                    document.removeEventListener('mouseup', handleMouseUp)
                  }
                  document.addEventListener('mousemove', handleMouseMove)
                  document.addEventListener('mouseup', handleMouseUp)
                }}
              >
                <div className="p-6">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className={`bg-gradient-to-br ${category.color} rounded-lg p-4 group-hover:scale-110 transition-transform duration-300 mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Category