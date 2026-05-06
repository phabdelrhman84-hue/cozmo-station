"use client";

import { Save, Store, Truck, CreditCard, Bell } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <button className="bg-[#7C6FFF] hover:bg-[#6b5eee] text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: "general", label: "General", icon: <Store size={18} /> },
            { id: "shipping", label: "Shipping", icon: <Truck size={18} /> },
            { id: "payments", label: "Payments", icon: <CreditCard size={18} /> },
            { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
          ].map((tab, i) => (
            <button
              key={tab.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                i === 0
                  ? "bg-[#7C6FFF]/10 text-[#7C6FFF]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* General Settings */}
          <div className="admin-card p-6">
            <h2 className="text-lg font-bold text-white mb-6">General Information</h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Store Name (EN)</label>
                  <input
                    type="text"
                    defaultValue="Cozmo Station"
                    className="w-full px-4 py-2 bg-[#0F1117] border border-[#2A2E3B] rounded-lg text-white focus:outline-none focus:border-[#7C6FFF]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Store Name (AR)</label>
                  <input
                    type="text"
                    defaultValue="كوزمو ستيشن"
                    dir="rtl"
                    className="w-full px-4 py-2 bg-[#0F1117] border border-[#2A2E3B] rounded-lg text-white focus:outline-none focus:border-[#7C6FFF]"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Contact Email</label>
                <input
                  type="email"
                  defaultValue="support@cozmo-station.com"
                  className="w-full px-4 py-2 bg-[#0F1117] border border-[#2A2E3B] rounded-lg text-white focus:outline-none focus:border-[#7C6FFF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Currency</label>
                <select className="w-full px-4 py-2 bg-[#0F1117] border border-[#2A2E3B] rounded-lg text-white focus:outline-none focus:border-[#7C6FFF]">
                  <option value="EGP">Egyptian Pound (EGP)</option>
                  <option value="USD">US Dollar (USD)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-[#2A2E3B]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" />
                    <div className="w-10 h-6 bg-[#2A2E3B] rounded-full shadow-inner"></div>
                    <div className="absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 left-1 transition-transform"></div>
                  </div>
                  <div>
                    <p className="font-medium text-white">Maintenance Mode</p>
                    <p className="text-xs text-gray-400 mt-0.5">Show "Coming Soon" page to visitors</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
