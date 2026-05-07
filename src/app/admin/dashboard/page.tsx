"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Users,
  AlertTriangle,
} from "lucide-react";
import { formatPriceEn } from "@/lib/utils";

// Mock Data
const salesData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 8900 },
  { name: "Sat", sales: 12000 },
  { name: "Sun", sales: 10400 },
];

const categoryData = [
  { name: "Skincare", value: 65 },
  { name: "Haircare", value: 25 },
  { name: "Sun Protection", value: 10 },
];

const COLORS = ["#7C6FFF", "#E8A0BF", "#7D8F69"];

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    ordersCount: 0,
    avgOrderValue: 0,
    newCustomers: 0,
    recentOrders: [],
    lowStockProducts: [],
    loading: true
  });

  useEffect(() => {
    async function fetchStats() {
      // Fetch Orders for KPIs
      const { data: orders } = await supabase.from('orders').select('*');
      const { data: customers } = await supabase.from('customers').select('*');
      const { data: products } = await supabase.from('products').select('*');

      const totalSales = orders?.reduce((acc, order) => acc + order.total, 0) || 0;
      const ordersCount = orders?.length || 0;
      const avgOrderValue = ordersCount > 0 ? totalSales / ordersCount : 0;
      const newCustomers = customers?.length || 0;

      // Recent Orders
      const { data: recentOrders } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      // Low Stock
      const lowStockProducts = products?.filter(p => p.stock <= p.low_stock_threshold) || [];

      setStats({
        totalSales,
        ordersCount,
        avgOrderValue,
        newCustomers,
        recentOrders: recentOrders || [],
        lowStockProducts,
        loading: false
      });
    }

    fetchStats();
  }, []);

  const kpis = [
    {
      title: "Total Sales",
      value: formatPriceEn(stats.totalSales),
      trend: "+0%",
      positive: true,
      icon: <DollarSign size={20} className="text-[#7C6FFF]" />,
    },
    {
      title: "Orders",
      value: stats.ordersCount.toString(),
      trend: "+0%",
      positive: true,
      icon: <ShoppingBag size={20} className="text-[#E8A0BF]" />,
    },
    {
      title: "Average Order Value",
      value: formatPriceEn(stats.avgOrderValue),
      trend: "+0%",
      positive: true,
      icon: <TrendingUp size={20} className="text-[#7D8F69]" />,
    },
    {
      title: "New Customers",
      value: stats.newCustomers.toString(),
      trend: "+0%",
      positive: true,
      icon: <Users size={20} className="text-[#F5A623]" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <select className="bg-[#1A1D27] border border-[#2A2E3B] rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#7C6FFF]">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="admin-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                {kpi.icon}
              </div>
              <span
                className={`text-sm font-medium ${
                  kpi.positive ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {kpi.trend}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">{kpi.title}</h3>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="admin-card p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-white mb-6">Revenue Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2E3B" vertical={false} />
                <XAxis dataKey="name" stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `£${val}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1A1D27", border: "1px solid #2A2E3B", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#7C6FFF"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#1A1D27", stroke: "#7C6FFF", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: "#7C6FFF" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Pie Chart */}
        <div className="admin-card p-6">
          <h3 className="text-lg font-bold text-white mb-6">Sales by Category</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1A1D27", border: "1px solid #2A2E3B", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-gray-300">{category.name}</span>
                </div>
                <span className="font-medium text-white">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Recent Orders</h3>
            <button className="text-sm text-[#7C6FFF] hover:text-[#9B91FF]">View All</button>
          </div>
          <div className="space-y-4">
            {stats.recentOrders.map((order: any) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#2A2E3B] flex items-center justify-center text-sm font-medium">
                    #{order.order_number?.slice(-4) || order.id}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{order.customer_name}</p>
                    <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{formatPriceEn(order.total)}</p>
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-medium mt-1 ${
                    order.order_status === 'delivered' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-yellow-400/10 text-yellow-400'
                  }`}>
                    {order.order_status}
                  </span>
                </div>
              </div>
            ))}
            {stats.recentOrders.length === 0 && <p className="text-center text-gray-500 py-4">No recent orders</p>}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle size={20} className="text-red-400" />
              Low Stock Alerts
            </h3>
          </div>
          <div className="space-y-4">
            {stats.lowStockProducts.map((item: any, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-red-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#2A2E3B] flex items-center justify-center text-xl overflow-hidden">
                    {item.main_image ? <img src={item.main_image} className="w-full h-full object-cover" /> : "🧴"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white line-clamp-1">{item.name_en}</p>
                    <p className="text-xs text-red-400">Only {item.stock} left in stock</p>
                  </div>
                </div>
                <button className="text-sm px-3 py-1.5 rounded-lg bg-[#2A2E3B] text-white hover:bg-[#3f4557] transition-colors">
                  Restock
                </button>
              </div>
            ))}
            {stats.lowStockProducts.length === 0 && <p className="text-center text-gray-500 py-4">No low stock alerts</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
