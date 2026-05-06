"use client";

import { Plus, Tag, Monitor, BarChart2 } from "lucide-react";

export default function AdminMarketing() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Marketing</h1>
        <button className="bg-[#7C6FFF] hover:bg-[#6b5eee] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <Plus size={18} />
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Discount Codes */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Tag size={20} className="text-[#E8A0BF]" />
              Active Discounts
            </h3>
            <button className="text-sm text-[#7C6FFF] hover:text-[#9B91FF]">Add New</button>
          </div>
          <div className="space-y-4">
            {[
              { code: "SUMMER20", type: "20% Off", uses: 45, max: 100 },
              { code: "FREESHIP", type: "Free Shipping", uses: 120, max: "∞" },
              { code: "WELCOME10", type: "10% Off", uses: 32, max: "∞" },
            ].map((d, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-[#2A2E3B]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-white bg-[#2A2E3B] px-2 py-0.5 rounded text-sm">
                      {d.code}
                    </span>
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{d.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{d.uses} Uses</p>
                  <p className="text-xs text-gray-500">Limit: {d.max}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking Pixels */}
        <div className="admin-card p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <BarChart2 size={20} className="text-[#7D8F69]" />
            Tracking Pixels
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-[#2A2E3B]">
              <div className="flex items-center gap-3 mb-4">
                <Monitor size={24} className="text-blue-500" />
                <div>
                  <h4 className="font-bold text-white">Facebook Pixel</h4>
                  <p className="text-xs text-gray-400">Track page views, add to carts, and purchases</p>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Pixel ID"
                  defaultValue="123456789012345"
                  className="flex-1 px-3 py-2 bg-[#0F1117] border border-[#2A2E3B] rounded-lg text-white focus:border-[#7C6FFF] focus:outline-none"
                />
                <button className="px-4 py-2 bg-[#2A2E3B] hover:bg-[#3f4557] text-white rounded-lg transition-colors">
                  Save
                </button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-[#2A2E3B]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded bg-yellow-500 flex items-center justify-center font-bold text-white text-xs">G</div>
                <div>
                  <h4 className="font-bold text-white">Google Analytics 4</h4>
                  <p className="text-xs text-gray-400">Comprehensive site analytics and event tracking</p>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Measurement ID (G-XXXXXXXX)"
                  className="flex-1 px-3 py-2 bg-[#0F1117] border border-[#2A2E3B] rounded-lg text-white focus:border-[#7C6FFF] focus:outline-none"
                />
                <button className="px-4 py-2 bg-[#2A2E3B] hover:bg-[#3f4557] text-white rounded-lg transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
