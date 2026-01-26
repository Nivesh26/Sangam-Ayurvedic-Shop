import { FaCheckCircle, FaLeaf, FaCertificate, FaTruck } from 'react-icons/fa'

const Feature = () => {
  const features = [
    {
      icon: FaCheckCircle,
      title: '100% Authentic Products',
      description: 'Genuine Ayurvedic products sourced directly from trusted suppliers'
    },
    {
      icon: FaLeaf,
      title: 'Natural Herbal Ingredients',
      description: 'Pure, organic herbs and natural ingredients for your wellness'
    },
    {
      icon: FaCertificate,
      title: 'Quality Certified',
      description: 'All products meet highest quality standards and certifications'
    },
    {
      icon: FaTruck,
      title: 'Fast Delivery in Nepal',
      description: 'Quick and reliable delivery service across all regions of Nepal'
    }
  ]

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center group"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 rounded-full p-4 group-hover:bg-blue-600 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Feature