import Link from 'next/link';
import { Search, ShoppingCart, Menu, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button type="button" className="text-gray-900 hover:text-gray-600 focus:outline-none">
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="text-2xl font-serif font-semibold tracking-tight text-gray-900">
              <span className="sr-only">Cozmo Station</span>
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-gray-900 text-white flex items-center justify-center rounded-sm font-serif italic text-lg">C</div>
                 <span>Cozmo Station.</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:gap-x-10">
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2">
                Categories <ChevronDown className="h-4 w-4" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 w-64 pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                <div className="bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden flex flex-col p-2">
                  <Link href="/category/skincare" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors flex flex-col">
                    <span className="font-medium text-gray-900">Skincare</span>
                    <span className="text-xs text-gray-500 mt-0.5">Korean & German science</span>
                  </Link>
                  <Link href="/category/haircare" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors flex flex-col">
                    <span className="font-medium text-gray-900">Haircare</span>
                    <span className="text-xs text-gray-500 mt-0.5">Premium treatment routines</span>
                  </Link>
                  <Link href="/category/exclusive-bundles" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors flex flex-col">
                    <span className="font-medium text-gray-900">Bundles & Sets</span>
                    <span className="text-xs text-gray-500 mt-0.5">Complete the routine & save</span>
                  </Link>
                </div>
              </div>
            </div>
            
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2">
              Our Philosophy
            </Link>
            <Link href="/shop" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2">
              All Products
            </Link>
          </nav>

          {/* Right section (Search + Cart) */}
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <div className="hidden sm:flex relative group">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-full border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-gray-300 focus:outline-none focus:ring-0 transition-all duration-300 group-hover:bg-gray-100"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <button type="button" className="text-gray-900 hover:text-gray-600 sm:hidden">
              <Search className="h-6 w-6" />
            </button>
            <div className="relative group">
              <button type="button" className="flex items-center p-2 text-gray-900 hover:text-gray-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-gray-900 rounded-full">
                  2
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
