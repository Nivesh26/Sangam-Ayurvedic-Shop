import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../User Components/Header'
import Footer from '../User Components/Footer'

const UserSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  })
  const [passwordMatch, setPasswordMatch] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'confirmPassword' && formData.password) {
      setPasswordMatch(value === formData.password)
    }
    if (name === 'password' && formData.confirmPassword) {
      setPasswordMatch(value === formData.confirmPassword)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false)
      return
    }
    console.log('Signup submitted:', formData)
    // Add signup logic here
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
        <section className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header strip */}
            <div className="h-1.5 w-full " />
            <div className="p-8 md:p-10">
              <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Create your account
                </h1>
                <p className="text-gray-500 text-sm">
                  Join Sangam Ayurvedic for authentic products and a healthier life.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 9808000000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors placeholder-gray-400"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors placeholder-gray-400 ${
                        !passwordMatch ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                      }`}
                    />
                    {!passwordMatch && (
                      <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3.5 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Create account
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold underline underline-offset-2">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default UserSignup
