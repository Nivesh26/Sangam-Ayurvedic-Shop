import Navbar from '../AdminComponent/Navbar'

const PIE_DATA = [
  { label: 'Digestive Care', value: 28, color: '#22c55e' },
  { label: 'Immunity Boosters', value: 32, color: '#3b82f6' },
  { label: 'Herbal Supplements', value: 22, color: '#f59e0b' },
  { label: 'Skin & Hair Care', value: 18, color: '#ec4899' }
]

const RECENT_ORDERS = [
  { id: '#ORD-1842', customer: 'Sita Sharma', amount: 1250, status: 'Delivered', date: 'Mar 10, 2025' },
  { id: '#ORD-1841', customer: 'Ram Kumar', amount: 890, status: 'Shipped', date: 'Mar 10, 2025' },
  { id: '#ORD-1840', customer: 'Anita Gurung', amount: 2100, status: 'Processing', date: 'Mar 9, 2025' },
  { id: '#ORD-1839', customer: 'Bikash Thapa', amount: 450, status: 'Delivered', date: 'Mar 9, 2025' },
  { id: '#ORD-1838', customer: 'Priya Adhikari', amount: 1680, status: 'Shipped', date: 'Mar 8, 2025' }
]

const TOP_PRODUCTS = [
  { name: 'Special Chyawanprash', sold: 142, revenue: 'Rs. 92,300' },
  { name: "Cow's Ghee", sold: 128, revenue: 'Rs. 44,800' },
  { name: 'Dant Kanti Toothpaste', sold: 95, revenue: 'Rs. 42,750' },
  { name: 'Soan Papdi', sold: 78, revenue: 'Rs. 42,900' }
]

const statusColor: Record<string, string> = {
  Delivered: 'bg-green-100 text-green-800',
  Shipped: 'bg-blue-100 text-blue-800',
  Processing: 'bg-amber-100 text-amber-800',
  Pending: 'bg-gray-100 text-gray-800'
}

const Adminhomepage = () => {
  const size = 200
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 8
  let currentAngle = -90
  const segments = PIE_DATA.map((d) => {
    const ratio = d.value / 100
    const angleDeg = ratio * 360
    const startAngle = (currentAngle * Math.PI) / 180
    currentAngle += angleDeg
    const endAngle = (currentAngle * Math.PI) / 180
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)
    const largeArc = angleDeg > 180 ? 1 : 0
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
    return { ...d, path }
  })

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="ml-64 min-h-screen p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{greeting()}</h1>
            <p className="text-gray-500 text-sm mt-0.5">Here’s what’s happening with your store today.</p>
          </div>
          <p className="text-sm text-gray-500 shrink-0">{today}</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">Rs. 3,16,000</p>
                <p className="text-xs text-green-600 mt-1 font-medium">+12% vs last month</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Orders</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">248</p>
                <p className="text-xs text-green-600 mt-1 font-medium">+8% vs last month</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Products</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">24</p>
                <p className="text-xs text-gray-500 mt-1">Active listings</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Customers</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">1,420</p>
                <p className="text-xs text-green-600 mt-1 font-medium">+5% vs last month</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Middle row: Pie chart + Recent Orders */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales by Category */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Sales by Category</h2>
            <p className="text-sm text-gray-500 mt-0.5">Share of total sales</p>
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-6">
              <svg width={size} height={size} className="shrink-0">
                {segments.map((seg) => (
                  <path
                    key={seg.label}
                    d={seg.path}
                    fill={seg.color}
                    className="hover:opacity-90 transition-opacity"
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </svg>
              <ul className="space-y-2 w-full">
                {PIE_DATA.map((d) => (
                  <li key={d.label} className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-gray-700">{d.label}</span>
                    <span className="font-medium text-gray-800 ml-auto">{d.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                <p className="text-sm text-gray-500 mt-0.5">Latest 5 orders</p>
              </div>
              <a href="/adminhomepage" className="text-sm font-medium text-green-600 hover:text-green-700">View all</a>
            </div>
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {RECENT_ORDERS.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="py-3 text-sm font-medium text-gray-800">{order.id}</td>
                      <td className="py-3 text-sm text-gray-600">{order.customer}</td>
                      <td className="py-3 text-sm text-gray-800 text-right tabular-nums">Rs. {order.amount.toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${statusColor[order.status] ?? 'bg-gray-100 text-gray-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-500">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Top Selling Products</h2>
          <p className="text-sm text-gray-500 mt-0.5">By units sold (sample data)</p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Units Sold</th>
                  <th className="py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TOP_PRODUCTS.map((product) => (
                  <tr key={product.name} className="hover:bg-gray-50">
                    <td className="py-3 text-sm font-medium text-gray-800">{product.name}</td>
                    <td className="py-3 text-sm text-gray-600 text-right tabular-nums">{product.sold}</td>
                    <td className="py-3 text-sm font-medium text-gray-800 text-right tabular-nums">{product.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick info strip */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Orders delivered today</p>
              <p className="text-2xl font-bold text-green-900">18</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800">Pending orders</p>
              <p className="text-2xl font-bold text-amber-900">7</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Low stock alerts</p>
              <p className="text-2xl font-bold text-blue-900">2</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Adminhomepage
