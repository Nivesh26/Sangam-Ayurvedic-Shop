import { useState } from 'react'
import Navbar from '../AdminComponent/Navbar'
import productImage from '../assets/176775850311hn1.webp'
import productImage2 from '../assets/SpecialChyawanprash.webp'
import productImage3 from '../assets/SoanPapdi.webp'
import productImage4 from '../assets/Ghee.webp'

const CATEGORIES = ['Digestive Care', 'Immunity Boosters', 'Herbal Supplements', 'Skin & Hair Care', 'Oils & Massage', 'Ayurvedic Medicines']

const MAX_IMAGES = 4

type ProductItem = {
  id: number
  name: string
  price: number
  category: string
  description: string
  imageUrls: string[]
}

const INITIAL_PRODUCTS: ProductItem[] = [
  { id: 1, name: 'Dant Kanti Natural Toothpaste 43g', price: 450, category: 'Digestive Care', description: 'Ayurvedic toothpaste for oral care.', imageUrls: [productImage] },
  { id: 2, name: 'Special Chyawanprash', price: 650, category: 'Immunity Boosters', description: 'Classic immunity booster.', imageUrls: [productImage2] },
  { id: 3, name: 'Soan Papdi', price: 550, category: 'Herbal Supplements', description: 'Traditional sweet with herbs.', imageUrls: [productImage3] },
  { id: 4, name: "Cow's Ghee", price: 350, category: 'Skin & Hair Care', description: 'Pure desi cow ghee.', imageUrls: [productImage4] }
]

const Product = () => {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: CATEGORIES[0],
    description: '',
    imageUrls: [] as string[]
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setForm((prev) => {
      if (prev.imageUrls.length >= MAX_IMAGES) return prev
      const url = URL.createObjectURL(file)
      return { ...prev, imageUrls: [...prev.imageUrls, url] }
    })
  }

  const removeImage = (index: number) => {
    setForm((prev) => {
      const url = prev.imageUrls[index]
      if (url.startsWith('blob:')) URL.revokeObjectURL(url)
      return { ...prev, imageUrls: prev.imageUrls.filter((_, i) => i !== index) }
    })
  }

  const resetForm = () => {
    form.imageUrls.forEach((u) => { if (u.startsWith('blob:')) URL.revokeObjectURL(u) })
    setForm({ name: '', price: '', category: CATEGORIES[0], description: '', imageUrls: [] })
    setEditingId(null)
  }

  const handleEdit = (product: ProductItem) => {
    form.imageUrls.forEach((u) => { if (u.startsWith('blob:')) URL.revokeObjectURL(u) })
    setEditingId(product.id)
    setForm({
      name: product.name,
      price: String(product.price),
      category: product.category,
      description: product.description,
      imageUrls: [...product.imageUrls]
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const price = parseInt(form.price, 10)
    if (!form.name.trim() || isNaN(price) || price < 0) return
    const imageUrls = form.imageUrls.length > 0 ? form.imageUrls : []

    if (editingId !== null) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, name: form.name.trim(), price, category: form.category, description: form.description.trim() || 'No description.', imageUrls: imageUrls.length > 0 ? imageUrls : p.imageUrls }
            : p
        )
      )
      setEditingId(null)
    } else {
      const newProduct: ProductItem = {
        id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
        name: form.name.trim(),
        price,
        category: form.category,
        description: form.description.trim() || 'No description.',
        imageUrls
      }
      setProducts((prev) => [...prev, newProduct])
    }

    form.imageUrls.forEach((u) => { if (u.startsWith('blob:')) URL.revokeObjectURL(u) })
    setForm({ name: '', price: '', category: CATEGORIES[0], description: '', imageUrls: [] })
  }

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    if (editingId === id) resetForm()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="ml-64 min-h-screen p-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage your product catalog</p>
        </div>

        {/* Product form - always visible */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              {editingId ? 'Edit product' : 'Add new product'}
            </h2>
            <p className="text-sm text-gray-600 mt-0.5">
              {editingId ? 'Update the details below and save.' : 'Fill in the details and click Add product below.'}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="md:col-span-2">
                <label htmlFor="product-name" className="block text-sm font-medium text-gray-700 mb-1.5">Product name *</label>
                <input
                  id="product-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Special Chyawanprash"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
                  required
                />
              </div>
              <div>
                <label htmlFor="product-price" className="block text-sm font-medium text-gray-700 mb-1.5">Price (Rs.) *</label>
                <input
                  id="product-price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="450"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
                  required
                />
              </div>
              <div>
                <label htmlFor="product-category" className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                <select
                  id="product-category"
                  value={form.category}
                  onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow bg-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="product-description" className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea
                  id="product-description"
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Short product description..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none transition-shadow"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="product-image" className="block text-sm font-medium text-gray-700 mb-1.5">Product images (max {MAX_IMAGES})</label>
                {form.imageUrls.length < MAX_IMAGES && (
                  <input
                    id="product-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-shadow"
                  />
                )}
                {form.imageUrls.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.imageUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img src={url} alt="" className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center hover:bg-green-700 shadow"
                          aria-label="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <span className="text-sm text-gray-500 self-center">
                      {form.imageUrls.length} / {MAX_IMAGES}
                    </span>
                  </div>
                )}
              </div>
              </div>
            <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {editingId ? 'Save changes' : 'Add product'}
              </button>
              {(editingId || form.name || form.price) && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 border border-green-600 text-green-600 px-5 py-2.5 rounded-xl font-medium hover:bg-green-50 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Products table */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-800">All products</h2>
            <p className="text-sm text-gray-500 mt-0.5">{products.length} products</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Price (Rs.)</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.imageUrls[0] ? (
                          <img src={product.imageUrls[0]} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100 border border-gray-200" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs border border-gray-200">No img</div>
                        )}
                        <span className="font-medium text-gray-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 text-right tabular-nums">Rs. {product.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{product.description}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(product)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Product
