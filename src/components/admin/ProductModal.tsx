"use client";

import { useState, useEffect } from "react";
import { X, Upload, Save, Package, DollarSign, Tag, Info, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: any; // Optional product for editing
}

export default function ProductModal({ isOpen, onClose, onSuccess, product }: ProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    price_egp: "",
    compare_price_egp: "",
    description_en: "",
    description_ar: "",
    category: "Skincare",
    brand: "",
    stock: "0",
    low_stock_threshold: "5",
    main_image: "",
    is_active: true,
    is_featured: false,
    is_new: true,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name_en: product.name_en || "",
        name_ar: product.name_ar || "",
        price_egp: product.price_egp?.toString() || "",
        compare_price_egp: product.compare_price_egp?.toString() || "",
        description_en: product.description_en || "",
        description_ar: product.description_ar || "",
        category: product.category || "Skincare",
        brand: product.brand || "",
        stock: product.stock?.toString() || "0",
        low_stock_threshold: product.low_stock_threshold?.toString() || "5",
        main_image: product.main_image || "",
        is_active: product.is_active ?? true,
        is_featured: product.is_featured ?? false,
        is_new: product.is_new ?? true,
      });
    } else {
      setFormData({
        name_en: "",
        name_ar: "",
        price_egp: "",
        compare_price_egp: "",
        description_en: "",
        description_ar: "",
        category: "Skincare",
        brand: "",
        stock: "0",
        low_stock_threshold: "5",
        main_image: "",
        is_active: true,
        is_featured: false,
        is_new: true,
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      alert('Failed to upload image. Make sure you created a public bucket named "product-images" in Supabase Storage.');
    } else {
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);
      
      setFormData(prev => ({ ...prev, main_image: data.publicUrl }));
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const slug = formData.name_en
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const productData = {
      ...formData,
      price_egp: parseFloat(formData.price_egp),
      compare_price_egp: formData.compare_price_egp ? parseFloat(formData.compare_price_egp) : null,
      stock: parseInt(formData.stock),
      low_stock_threshold: parseInt(formData.low_stock_threshold),
      slug,
    };

    let result;
    if (product?.id) {
      // Update
      result = await supabase.from("products").update(productData).eq("id", product.id);
    } else {
      // Insert
      result = await supabase.from("products").insert([{ ...productData, created_at: new Date().toISOString() }]);
    }

    if (result.error) {
      console.error("Error saving product:", result.error);
      alert(`Error: ${result.error.message || "Failed to save product"}`);
    } else {
      onSuccess();
      onClose();
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1A1D27] w-full max-w-4xl max-h-[90vh] rounded-2xl border border-[#2A2E3B] shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-6 border-b border-[#2A2E3B] flex items-center justify-between bg-[#1A1D27] sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7C6FFF]/10 flex items-center justify-center text-[#7C6FFF]">
              <Package size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{product ? "Edit Product" : "Add New Product"}</h2>
              <p className="text-sm text-gray-400">{product ? "Update the product details" : "Fill in the details to list a new item"}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Basic Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[#7C6FFF] uppercase tracking-wider flex items-center gap-2">
                  <Info size={16} /> Basic Information
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Product Name (English)</label>
                  <input
                    name="name_en"
                    value={formData.name_en}
                    onChange={handleChange}
                    required
                    className="admin-input w-full"
                    placeholder="e.g. COSRX Snail Mucin Essence"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5 text-right" dir="rtl">اسم المنتج (عربي)</label>
                  <input
                    name="name_ar"
                    value={formData.name_ar}
                    onChange={handleChange}
                    required
                    dir="rtl"
                    className="admin-input w-full"
                    placeholder="مثال: كوزريكس إسينس الحلزون"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Brand</label>
                    <input
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                      className="admin-input w-full"
                      placeholder="e.g. COSRX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="admin-input w-full"
                    >
                      <option>Skincare</option>
                      <option>Haircare</option>
                      <option>Makeup</option>
                      <option>Sun Protection</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[#7C6FFF] uppercase tracking-wider flex items-center gap-2">
                  <DollarSign size={16} /> Pricing & Stock
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Price (EGP)</label>
                    <input
                      name="price_egp"
                      type="number"
                      value={formData.price_egp}
                      onChange={handleChange}
                      required
                      className="admin-input w-full"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Compare Price (EGP)</label>
                    <input
                      name="compare_price_egp"
                      type="number"
                      value={formData.compare_price_egp}
                      onChange={handleChange}
                      className="admin-input w-full"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Inventory</label>
                    <input
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                      className="admin-input w-full"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Low Stock Alert</label>
                    <input
                      name="low_stock_threshold"
                      type="number"
                      value={formData.low_stock_threshold}
                      onChange={handleChange}
                      required
                      className="admin-input w-full"
                      placeholder="5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Descriptions & Media */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[#7C6FFF] uppercase tracking-wider flex items-center gap-2">
                  <Tag size={16} /> Media & Visibility
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Product Image</label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-xl border-2 border-dashed border-[#2A2E3B] hover:border-[#7C6FFF] transition-colors bg-[#0F1117] flex items-center justify-center overflow-hidden group">
                      {formData.main_image ? (
                        <>
                          <img src={formData.main_image} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Upload size={20} className="text-white" />
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-gray-500">
                          {uploading ? (
                            <div className="w-6 h-6 border-2 border-[#7C6FFF] border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <>
                              <Upload size={24} />
                              <span className="text-[10px]">Upload</span>
                            </>
                          )}
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-2">Recommended: Square image (1000x1000px). Max 2MB.</p>
                      <input
                        type="text"
                        name="main_image"
                        value={formData.main_image}
                        onChange={handleChange}
                        placeholder="Or paste URL here..."
                        className="admin-input w-full text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-[#0F1117] p-4 rounded-xl border border-[#2A2E3B]">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="is_featured"
                      id="is_featured"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                      className="rounded border-[#2A2E3B] bg-[#1A1D27] text-[#7C6FFF] focus:ring-[#7C6FFF]"
                    />
                    <label htmlFor="is_featured" className="text-sm text-gray-300 cursor-pointer">Featured</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="is_new"
                      id="is_new"
                      checked={formData.is_new}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_new: e.target.checked }))}
                      className="rounded border-[#2A2E3B] bg-[#1A1D27] text-[#7C6FFF] focus:ring-[#7C6FFF]"
                    />
                    <label htmlFor="is_new" className="text-sm text-gray-300 cursor-pointer">New Arrival</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="is_active"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="rounded border-[#2A2E3B] bg-[#1A1D27] text-[#7C6FFF] focus:ring-[#7C6FFF]"
                    />
                    <label htmlFor="is_active" className="text-sm text-gray-300 cursor-pointer">Active / Visible</label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[#7C6FFF] uppercase tracking-wider flex items-center gap-2">
                  <Type size={16} /> Descriptions
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Description (English)</label>
                  <textarea
                    name="description_en"
                    value={formData.description_en}
                    onChange={handleChange}
                    rows={3}
                    className="admin-input w-full resize-none"
                    placeholder="Describe the product..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5 text-right" dir="rtl">الوصف (عربي)</label>
                  <textarea
                    name="description_ar"
                    value={formData.description_ar}
                    onChange={handleChange}
                    rows={3}
                    dir="rtl"
                    className="admin-input w-full resize-none"
                    placeholder="اكتب وصف المنتج هنا..."
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-[#2A2E3B] bg-[#1A1D27] flex items-center justify-end gap-3 sticky bottom-0 z-10">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-[#2A2E3B] text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-2.5 rounded-xl bg-[#7C6FFF] hover:bg-[#6b5eee] text-white font-medium flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save size={18} />
                {product ? "Update Product" : "Save Product"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function Type({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  );
}
