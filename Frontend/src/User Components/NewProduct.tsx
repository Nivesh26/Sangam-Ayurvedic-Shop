import productImage from '../assets/176775850311hn1.webp'

const NewProduct = () => {
  const products = [
    {
      id: 1,
      name: 'Dant Kanti Natural Toothpaste 43g (Buy 11+ 1 Free) Hanger',
      price: 450,
      image: productImage,
      category: 'Digestive Care'
    },
    {
      id: 2,
      name: 'Ashwagandha Capsules',
      price: 650,
      image: productImage,
      category: 'Immunity Boosters'
    },
    {
      id: 3,
      name: 'Turmeric Curcumin',
      price: 550,
      image: productImage,
      category: 'Herbal Supplements'
    },
    {
      id: 4,
      name: 'Neem Face Wash',
      price: 350,
      image: productImage,
      category: 'Skin & Hair Care'
    }
  ]

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            New Products
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-800">Rs. {product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewProduct