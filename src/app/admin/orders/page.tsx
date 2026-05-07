"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Eye, Download } from "lucide-react";
import { formatPriceEn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setOrders(data);
    setLoading(false);
  };

  const displayOrders = orders.filter(o => 
    o.order_number?.toLowerCase().includes(search.toLowerCase()) || 
    o.customer_name?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-400/10 text-yellow-400 border-yellow-400/20";
      case "processing": return "bg-blue-400/10 text-blue-400 border-blue-400/20";
      case "shipped": return "bg-purple-400/10 text-purple-400 border-purple-400/20";
      case "delivered": return "bg-emerald-400/10 text-emerald-400 border-emerald-400/20";
      case "cancelled": return "bg-red-400/10 text-red-400 border-red-400/20";
      default: return "bg-gray-400/10 text-gray-400 border-gray-400/20";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Orders</h1>
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
              placeholder="Search orders by ID, Customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0F1117] border border-[#2A2E3B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#7C6FFF]"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 bg-[#0F1117] border border-[#2A2E3B] rounded-lg text-gray-300 focus:outline-none focus:border-[#7C6FFF]">
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
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
             <p>Loading orders...</p>
           </div>
          ) : (
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#0F1117]/50 text-gray-300 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E3B]">
              {displayOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">#{order.order_number || order.id}</span>
                  </td>
                  <td className="px-6 py-4">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{order.customer_name}</td>
                  <td className="px-6 py-4">
                    <span className="text-white">{formatPriceEn(order.total)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.order_status)} capitalize`}>
                      {order.order_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors inline-flex">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {displayOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </div>
  );
}
