'use client'

import { AdminLayout } from '@/components/layouts/AdminLayout'
import Link from 'next/link'
import { MOCK_CUSTOMERS } from '@/lib/mock-data'
import { useState } from 'react'
import { Search } from 'lucide-react'

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCustomers = MOCK_CUSTOMERS.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Customers</h2>
          <span className="text-sm text-muted-foreground">Total: {filteredCustomers.length}</span>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg border border-border p-6">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          {filteredCustomers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Total Orders</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Total Spent</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Member Since</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold">{customer.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{customer.email}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{customer.phone}</td>
                      <td className="px-6 py-4 text-sm">{customer.totalOrders}</td>
                      <td className="px-6 py-4 text-sm font-semibold">${customer.totalSpent.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{customer.joinDate}</td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/customers/${customer.id}`}
                          className="text-primary hover:text-primary/80 font-semibold text-sm"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">No customers found</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
