import { useState } from 'react'
import Navbar from '../AdminComponent/Navbar'

type CustomerItem = {
  id: number
  name: string
  email: string
  phone: string
  address: string
}

const SAMPLE_CUSTOMERS: CustomerItem[] = [
  { id: 1, name: 'Sita Sharma', email: 'sita@example.com', phone: '+977 9801001001', address: 'Patan, Lalitpur' },
  { id: 2, name: 'Ram Kumar', email: 'ram.k@example.com', phone: '+977 9802002002', address: 'Thamel, Kathmandu' },
  { id: 3, name: 'Anita Gurung', email: 'anita.g@example.com', phone: '+977 9803003003', address: 'Boudha, Kathmandu' },
  { id: 4, name: 'Bikash Thapa', email: 'bikash.t@example.com', phone: '+977 9804004004', address: 'Pokhara' },
  { id: 5, name: 'Priya Adhikari', email: 'priya.a@example.com', phone: '+977 9805005005', address: 'Biratnagar' },
  { id: 6, name: 'Kiran Shrestha', email: 'kiran.s@example.com', phone: '+977 9806006006', address: 'Bhaktapur' }
]

const Customer = () => {
  const [customers, setCustomers] = useState<CustomerItem[]>(SAMPLE_CUSTOMERS)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id))
    setDeleteConfirmId(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="ml-64 min-h-screen p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
          <p className="text-sm text-gray-500">{customers.length} customer{customers.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Address</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500">
                      No customers yet.
                    </td>
                  </tr>
                ) : (
                  customers.map((c) => (
                    <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-800">{c.name}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{c.email}</td>
                      <td className="py-3 px-4 text-gray-600">{c.phone}</td>
                      <td className="py-3 px-4 text-gray-600">{c.address}</td>
                      <td className="py-3 px-4 text-right">
                        {deleteConfirmId === c.id ? (
                          <span className="flex items-center justify-end gap-2">
                            <span className="text-xs text-gray-500">Delete?</span>
                            <button
                              onClick={() => handleDelete(c.id)}
                              className="text-green-600 hover:text-green-700 text-sm font-medium"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="text-green-600 hover:text-green-700 text-sm font-medium"
                            >
                              No
                            </button>
                          </span>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(c.id)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-green-600 hover:bg-green-50 rounded-lg text-sm font-medium transition-colors"
                            title="Delete customer"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Customer
