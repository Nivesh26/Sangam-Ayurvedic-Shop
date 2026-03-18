import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaUser, FaShoppingCart } from 'react-icons/fa'
import { getUser } from '../api/auth'
import { getProducts, productImageUrl, type ProductItem } from '../api/products'
import { useCart } from '../context/CartContext'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `font-medium transition-colors ${isActive ? 'text-red-600' : 'text-gray-700 hover:text-red-600'}`

const MAX_SUGGESTIONS = 6

const Header = () => {
  const user = getUser()
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<ProductItem[]>([])
  const [productsLoaded, setProductsLoaded] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!productsLoaded && searchQuery.trim().length >= 1) {
      getProducts()
        .then((res) => {
          setProducts(res.products || [])
          setProductsLoaded(true)
        })
        .catch(() => setProducts([]))
    }
  }, [searchQuery, productsLoaded])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  const q = searchQuery.trim().toLowerCase()
  const inStockProducts = products.filter((p) => (p.stock ?? 0) > 0)
  const suggestions = !q
    ? []
    : inStockProducts.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      ).slice(0, MAX_SUGGESTIONS)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    setShowSuggestions(false)
    if (q) {
      navigate(`/shop?q=${encodeURIComponent(q)}`)
    } else {
      navigate('/shop')
    }
  }

  const handleSuggestionClick = (productId: string) => {
    setShowSuggestions(false)
    setSearchQuery('')
    navigate(`/product/${productId}`)
  }

  return (
    <div className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800">Nivesh</span>
          </Link>
        </div>
        <ul className="hidden md:flex space-x-8">
          <li><NavLink to="/" end className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/new" className={navLinkClass}>New</NavLink></li>
          <li><NavLink to="/shop" className={navLinkClass}>Shop</NavLink></li>
          <li><NavLink to="/aboutus" className={navLinkClass}>About Us</NavLink></li>
          <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
        </ul>

        <div className="hidden md:flex items-center space-x-3">
          <div ref={searchRef} className="relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                placeholder="Search products..."
                className="border border-gray-300 rounded-full px-5 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all w-64"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
            {showSuggestions && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-1 py-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
                {suggestions.length === 0 ? (
                  <p className="px-4 py-3 text-gray-500 text-sm">No products match your search.</p>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {suggestions.map((p) => (
                      <li key={p._id}>
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(p._id)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                            {(p.imageUrls || [])[0] ? (
                              <img
                                src={productImageUrl((p.imageUrls || [])[0])}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">—</div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 truncate">{p.name}</p>
                            <p className="text-sm text-gray-500">Rs. {p.price}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `relative p-2 transition-colors rounded-lg hover:bg-gray-100 ${isActive ? 'text-red-600' : 'text-gray-600 hover:text-red-600'}`
                }
                aria-label="Cart"
              >
                <FaShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full px-1">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `p-2 transition-colors rounded-lg hover:bg-gray-100 ${isActive ? 'text-red-600' : 'text-gray-600 hover:text-red-600'}`
                }
                aria-label="Profile"
              >
                <FaUser className="w-5 h-5" />
              </NavLink>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={mobileMenuOpen ? 'M18 6 6 18' : 'M4 6h16'} />
            <path d={mobileMenuOpen ? 'M6 6l12 12' : 'M4 12h16'} />
            <path d={mobileMenuOpen ? '' : 'M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 px-6 pb-4">
          <ul className="flex flex-col pt-3 space-y-2">
            <li>
              <NavLink to="/" end className={navLinkClass} onClick={closeMobileMenu}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/new" className={navLinkClass} onClick={closeMobileMenu}>New</NavLink>
            </li>
            <li>
              <NavLink to="/shop" className={navLinkClass} onClick={closeMobileMenu}>Shop</NavLink>
            </li>
            <li>
              <NavLink to="/aboutus" className={navLinkClass} onClick={closeMobileMenu}>About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass} onClick={closeMobileMenu}>Contact</NavLink>
            </li>
          </ul>

          <div className="mt-4 flex items-center gap-4">
            {user ? (
              <>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `relative p-2 transition-colors rounded-lg hover:bg-gray-100 ${isActive ? 'text-red-600' : 'text-gray-600 hover:text-red-600'}`
                  }
                  aria-label="Cart"
                  onClick={closeMobileMenu}
                >
                  <FaShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full px-1">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `p-2 transition-colors rounded-lg hover:bg-gray-100 ${isActive ? 'text-red-600' : 'text-gray-600 hover:text-red-600'}`
                  }
                  aria-label="Profile"
                  onClick={closeMobileMenu}
                >
                  <FaUser className="w-5 h-5" />
                </NavLink>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full text-center"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Header