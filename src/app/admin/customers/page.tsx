"use client";

import { useState } from "react";
import { Search, Download, User } from "lucide-react";
import { formatPriceEn } from "@/lib/utils";

const mockCustomers = [
  { id: 1, name: "Ahmed Sayed", email: "ahmed@example.com", orders: 5, spent: 4500, lastOrder: "2024-03-15" },
  { id: 2, name: "Mona Ali", email: "mona@example.com", orders: 2, spent: 1250, lastOrder: "2024-03-14" },
  { id: 3, name: "Karim Hassan", email: "karim@example.com", orders: 8, spent: 12400, lastOrder: "2024-03-14" },
  { id: 4, name: "Sara Mahmoud", email: "sara@example.com", orders: 1, spent: 650, lastOrder: "2024-03-13" },
  { id: 5, name: "Nour El Din", email: "nour@example.com", orders: 3, spent: 5400, lastOrder: "2024-03-12" },
];

export default function AdminCustomers() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Customers</h1>
        <button className="bg-[#1A1D27] border border-[#2A2E3B] hover:bg-[#2A2E3B] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      <div className="admin-card">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#2A2E3B] flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0F1117] border border-[#2A2E3B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#7C6FFF]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#0F1117]/50 text-gray-300 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4">Last Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E3B]">
              {mockCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2A2E3B] flex items-center justify-center text-gray-300">
                        <User size={18} />
                      </div>
                      <span className="text-white font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#2A2E3B] text-white text-xs font-bold">
                      {customer.orders}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{formatPriceEn(customer.spent)}</span>
                  </td>
                  <td className="px-6 py-4">{customer.lastOrder}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#7C6FFF] hover:text-[#9B91FF] font-medium text-sm">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
