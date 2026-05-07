import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Edit, Trash2, MoreVertical, Eye, CheckSquare, Download } from "lucide-react";
import { formatPriceEn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import ProductModal from "@/components/admin/ProductModal";

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [importing, setImporting] = useState(false);

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

  const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const csv = event.target?.result as string;
      const lines = csv.split('\n');
      const headers = lines[0].split(',');
      
      const newProducts = lines.slice(1).filter(line => line.trim() !== "").map(line => {
        const values = line.split(',');
        return {
          name_en: values[0]?.trim(),
          name_ar: values[1]?.trim() || values[0]?.trim(),
          price_egp: parseFloat(values[2]?.trim() || "0"),
          compare_price_egp: values[3] ? parseFloat(values[3].trim()) : null,
          category: values[4]?.trim() || "Skincare",
          brand: values[5]?.trim() || "Cozmo",
          stock: parseInt(values[6]?.trim() || "0"),
          main_image: values[7]?.trim() || "",
          slug: (values[0]?.trim() || "").toLowerCase().replace(/\s+/g, '-'),
          is_active: true,
          created_at: new Date().toISOString()
        };
      });

      if (newProducts.length > 0) {
        const { error } = await supabase.from('products').insert(newProducts);
        if (error) {
          console.error("Import error:", error);
          alert("Failed to import products. Check CSV format: Name(EN), Name(AR), Price, ComparePrice, Category, Brand, Stock, ImageURL");
        } else {
          alert(`Successfully imported ${newProducts.length} products!`);
          fetchProducts();
        }
      }
      setImporting(false);
    };
    reader.readAsText(file);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) alert("Failed to delete product");
    else fetchProducts();
  };

  const displayProducts = products.filter(p => 
    p.name_en?.toLowerCase().includes(search.toLowerCase()) || 
    p.name_ar?.includes(search) ||
    p.brand?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedProducts.length === displayProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(displayProducts.map((p) => p.id.toString()));
    }
  };

  const toggleSelectProduct = (id: string) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer bg-[#1A1D27] border border-[#2A2E3B] hover:bg-[#2A2E3B] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
            <Download size={18} />
            {importing ? "Importing..." : "Import CSV"}
            <input
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              disabled={importing}
              className="hidden"
            />
          </label>
          <button 
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="bg-[#7C6FFF] hover:bg-[#6b5eee] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProducts}
        product={editingProduct}
      />

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
                <th className="px-6 py-4 w-10 text-center">
                  <input 
                    type="checkbox" 
                    onChange={toggleSelectAll}
                    checked={selectedProducts.length === displayProducts.length && displayProducts.length > 0}
                    className="rounded border-[#2A2E3B] bg-[#0F1117] text-[#7C6FFF] focus:ring-offset-0 focus:ring-[#7C6FFF]" 
                  />
                </th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Inventory</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E3B]">
              {displayProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedProducts.includes(product.id.toString())}
                      onChange={() => toggleSelectProduct(product.id.toString())}
                      className="rounded border-[#2A2E3B] bg-[#0F1117] text-[#7C6FFF] focus:ring-offset-0 focus:ring-[#7C6FFF]" 
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-500 font-mono text-xs">#{product.id.slice(-6)}</span>
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
                      <Link href={`/product/${product.slug}`} target="_blank" className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="View in store">
                        <Eye size={16} />
                      </Link>
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-1.5 text-gray-400 hover:text-[#7C6FFF] hover:bg-[#7C6FFF]/10 rounded transition-colors" 
                        title="Edit product"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                        title="Delete product"
                      >
                        <Trash2 size={16} />
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
