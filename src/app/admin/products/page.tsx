"use client";

import { useState } from "react";
import { Plus, Search, Filter, Edit, Trash2, MoreVertical, Eye, CheckSquare } from "lucide-react";
import { demoProducts } from "@/lib/data";
import { formatPriceEn } from "@/lib/utils";

import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setProducts(data);
    setLoading(false);
  };

  const displayProducts = products.filter(p => 
    p.name_en.toLowerCase().includes(search.toLowerCase()) || 
    p.name_ar.includes(search) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedProducts.length === displayProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(displayProducts.map((p) => p.id.toString()));
    }
  };

  const toggleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((pid) => pid !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

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
            {selectedProducts.length > 0 && (
              <button className="px-4 py-2 bg-white/10 border border-[#2A2E3B] rounded-lg text-white hover:bg-white/20 flex items-center gap-2">
                <Edit size={18} />
                Bulk Edit ({selectedProducts.length})
              </button>
            )}
            <button className="px-4 py-2 bg-[#0F1117] border border-[#2A2E3B] rounded-lg text-gray-300 hover:text-white flex items-center gap-2">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center text-gray-400 gap-3">
              <div className="w-8 h-8 border-2 border-[#7C6FFF] border-t-transparent rounded-full animate-spin"></div>
              <p>Loading products...</p>
            </div>
          ) : (
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#0F1117]/50 text-gray-300 uppercase font-medium">
              <tr>
                <th className="px-6 py-4 w-12">
                  <input
                    type="checkbox"
                    className="rounded border-[#2A2E3B] bg-[#1A1D27] text-[#7C6FFF] focus:ring-[#7C6FFF]"
                    checked={selectedProducts.length === displayProducts.length && displayProducts.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Inventory</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E3B]">
              {displayProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-[#2A2E3B] bg-[#1A1D27] text-[#7C6FFF] focus:ring-[#7C6FFF]"
                      checked={selectedProducts.includes(product.id.toString())}
                      onChange={() => toggleSelectProduct(product.id.toString())}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#2A2E3B] flex items-center justify-center flex-shrink-0">
                        {product.main_image ? (
                          <img src={product.main_image} alt="" className="w-full h-full object-cover rounded" />
                        ) : (
                          <span>{product.category === "Haircare" ? "💇‍♀️" : "🧴"}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium line-clamp-1">{product.name_en}</p>
                        <p className="text-xs">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {product.is_active ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-400/10 text-emerald-400">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-400/10 text-gray-400">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className={product.stock <= product.low_stock_threshold ? "text-yellow-400" : ""}>
                        {product.stock} in stock
                      </span>
                      {product.stock <= product.low_stock_threshold && (
                        <span className="text-[10px] text-yellow-400 uppercase font-bold">Low</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{formatPriceEn(product.price_egp)}</span>
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="Quick Preview">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="Edit">
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
              {displayProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          )}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[#2A2E3B] flex items-center justify-between text-sm text-gray-400">
          <span>Showing 1 to {displayProducts.length} of {displayProducts.length} results</span>
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
