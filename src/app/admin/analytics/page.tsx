"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatPriceEn } from "@/lib/utils";
import { Download } from "lucide-react";

const salesData = [
  { name: "Week 1", sales: 24000 },
  { name: "Week 2", sales: 18000 },
  { name: "Week 3", sales: 32000 },
  { name: "Week 4", sales: 45000 },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <div className="flex gap-2">
          <select className="bg-[#1A1D27] border border-[#2A2E3B] rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#7C6FFF]">
            <option>Last 30 Days</option>
            <option>This Month</option>
            <option>Last Quarter</option>
            <option>This Year</option>
          </select>
          <button className="bg-[#1A1D27] border border-[#2A2E3B] hover:bg-[#2A2E3B] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="admin-card p-6">
          <h3 className="text-lg font-bold text-white mb-6">Monthly Revenue</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2E3B" vertical={false} />
                <XAxis dataKey="name" stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `£${val}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1A1D27", border: "1px solid #2A2E3B", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                  cursor={{ fill: "#2A2E3B" }}
                />
                <Bar dataKey="sales" fill="#7C6FFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="admin-card p-6">
          <h3 className="text-lg font-bold text-white mb-6">Top Selling Products</h3>
          <div className="space-y-4">
            {[
              { name: "COSRX Snail Mucin", sales: 145, rev: 94250 },
              { name: "Beauty of Joseon Sunscreen", sales: 120, rev: 54000 },
              { name: "Anua Heartleaf Toner", sales: 85, rev: 46750 },
              { name: "Numbuzin No.3 Serum", sales: 64, rev: 46080 },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#2A2E3B] flex items-center justify-center font-bold text-gray-400">
                    #{i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#E8A0BF]">{formatPriceEn(p.rev)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
