"use client";

import { useState } from "react";
import { Plus, Search, Filter, Edit, Trash2, MoreVertical } from "lucide-react";
import { demoProducts } from "@/lib/data";
import { formatPriceEn } from "@/lib/utils";

export default function AdminProducts() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <button className="bg-[#7C6FFF] hover:bg-[#6b5eee] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="admin-card">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#2A2E3B] flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0F1117] border border-[#2A2E3B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#7C6FFF]"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#0F1117] border border-[#2A2E3B] rounded-lg text-gray-300 hover:text-white flex items-center gap-2">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#0F1117]/50 text-gray-300 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Inventory</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E3B]">
              {demoProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#2A2E3B] flex items-center justify-center flex-shrink-0">
                        {product.category === "Haircare" ? "💇‍♀️" : "🧴"}
                      </div>
                      <div>
                        <p className="text-white font-medium line-clamp-1">{product.name_en}</p>
                        <p className="text-xs">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {product.stock > product.low_stock_threshold ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-400/10 text-emerald-400">
                        Active
                      </span>
                    ) : product.stock > 0 ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-400/10 text-yellow-400">
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-400/10 text-red-400">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {product.stock} in stock
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{formatPriceEn(product.price_egp)}</span>
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[#2A2E3B] flex items-center justify-between text-sm text-gray-400">
          <span>Showing 1 to {demoProducts.length} of {demoProducts.length} results</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded bg-[#0F1117] border border-[#2A2E3B] hover:bg-white/5 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded bg-[#7C6FFF] text-white">1</button>
            <button className="px-3 py-1 rounded bg-[#0F1117] border border-[#2A2E3B] hover:bg-white/5 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
