import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../User Components/Header'
import Footer from '../User Components/Footer'
import { useCart } from '../context/CartContext'
import { useStoreStatus } from '../context/StoreStatusContext'
import { createOrder } from '../api/orders'

const TAX_RATE = 0.13

type PaymentMethod = 'cod'

const Checkout = () => {
  const { items, refreshCart } = useCart()
  const { storeOpen } = useStoreStatus()
  const navigate = useNavigate()
  const location = useLocation()
  const selectedIds = (location.state as { selectedIds?: string[] } | null)?.selectedIds
  const itemsToOrder = selectedIds?.length
    ? items.filter((i) => selectedIds.includes(i.id))
    : items
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod')
  const [placing, setPlacing] = useState(false)

  const subtotal = itemsToOrder.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const tax = Math.round(subtotal * TAX_RATE)
  const total = subtotal + tax

  const handlePlaceOrder = async () => {
    if (itemsToOrder.length === 0) return
    if (!storeOpen) {
      toast.error('Store is closed. Orders are not being accepted.')
      return
    }
    setPlacing(true)
    try {
      const orderItems = itemsToOrder.map((i) => ({
        productId: i.id.replace(/^product-/, ''),
        productName: i.name,
        quantity: i.quantity,
        price: i.price,
      }))
      await createOrder({ items: orderItems, paymentMethod: 'cod' })
      await refreshCart()
      toast.success('Order placed! Pay when you receive (COD).')
      navigate('/')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to place order.')
    } finally {
      setPlacing(false)
    }
  }

  if (itemsToOrder.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 py-16 px-4 flex flex-col items-center justify-center">
          <p className="text-gray-600 mb-4">
            {items.length === 0
              ? 'Your cart is empty. Add items to checkout.'
              : 'No items selected. Go to cart and select items to checkout.'}
          </p>
          <Link to="/cart" className="text-green-600 font-medium hover:text-green-700">Back to cart</Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-8 px-4 sm:py-10">
        <div className="max-w-4xl mx-auto">
          {!storeOpen && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-medium flex items-center gap-3">
              <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Store is closed. Orders are not being accepted at the moment.
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Checkout</h1>
            <p className="text-gray-500 text-sm mt-0.5">Review your order and choose payment</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Left: Payment method */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-bold text-gray-900">Payment method</h2>
                </div>
                <div className="p-5 space-y-3">
                  <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-gray-900">Cash on Delivery (COD)</span>
                      <p className="text-sm text-gray-500 mt-0.5">Pay when you receive your order</p>
                    </div>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2h-2m-4-1V7" />
                    </svg>
                  </label>
                </div>
              </div>

              <Link to="/cart" className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to cart
              </Link>
            </div>

            {/* Right: Bill */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden sticky top-4">
                <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-bold text-gray-900">Order summary</h2>
                </div>

                <div className="px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">Items</p>
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">Product</th>
                        <th className="pb-2.5 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-500 w-12">Qty</th>
                        <th className="pb-2.5 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-500 w-24">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {itemsToOrder.map((item) => (
                        <tr key={item.id} className="border-b border-gray-50">
                          <td className="py-3 pr-3 align-top">
                            <span className="line-clamp-2 text-gray-800">{item.name}</span>
                            <span className="text-gray-500 text-xs block mt-0.5">Rs. {item.price.toLocaleString()} each</span>
                          </td>
                          <td className="py-3 text-right align-top tabular-nums font-medium text-gray-700">{item.quantity}</td>
                          <td className="py-3 text-right align-top tabular-nums font-semibold text-gray-900 whitespace-nowrap">Rs. {(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-5 pb-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Bill summary</p>
                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="tabular-nums font-medium text-gray-900">Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (13%)</span>
                      <span className="tabular-nums font-medium text-gray-900">Rs. {tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 mt-2 border-t border-gray-200">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="tabular-nums font-bold text-gray-900 text-xl">Rs. {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={!storeOpen || placing}
                    className="w-full bg-green-600 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-green-600"
                  >
                    {placing ? 'Placing order…' : 'Place order'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Checkout
