import React from 'react'
import Navbar from '../AdminComponent/Navbar'

const Customer = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="ml-64 min-h-screen p-6">
        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
        <p className="text-gray-600 mt-1">Manage customers here.</p>
      </main>
    </div>
  )
}

export default Customer
