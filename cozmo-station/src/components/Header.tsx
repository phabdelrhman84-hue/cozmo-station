import Link from 'next/link';
import { Search, ShoppingCart, Menu, ChevronDown } from 'lucide-react';

const categories = [
  { href: '/category/skincare', label: 'Skincare', desc: 'Korean & German science' },
  { href: '/category/haircare', label: 'Haircare', desc: 'Premium treatment routines' },
  { href: '/category/exclusive-bundles', label: 'Bundles & Sets', desc: 'Complete the routine & save' },
];

export default function Header() {
  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Announcement Bar */}
      <div className="bg-gray-900 text-white text-center py-2.5 text-xs font-medium tracking-widest uppercase">
        🌿 Free Shipping on Orders Over 500 EGP &nbsp;|&nbsp;{' '}
        <Link href="/faq" className="underline underline-offset-2 hover:no-underline">See FAQs</Link>
      </div>

      {/* Main Header */}
      <header className="w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between py-4">
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button type="button" aria-label="Open menu" className="text-gray-900 hover:text-gray-600 focus:outline-none">
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex shrink-0 items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-900 text-white flex items-center justify-center rounded-sm font-serif italic text-lg">C</div>
                <span className="text-xl font-serif font-semibold tracking-tight text-gray-900">Cozmo Station.</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:gap-x-8 items-center">
              {/* Categories Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2">
                  Shop <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 w-72 pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden p-2">
                    {categories.map((cat) => (
                      <Link key={cat.href} href={cat.href} className="px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors flex flex-col">
                        <span className="font-medium text-gray-900 text-sm">{cat.label}</span>
                        <span className="text-xs text-gray-400 mt-0.5">{cat.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/our-story" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2">
                Our Story
              </Link>
              <Link href="/faq" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2">
                FAQs
              </Link>
              <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2">
                Contact
              </Link>
            </nav>

            {/* Right section */}
            <div className="flex items-center gap-x-3 lg:gap-x-5">
              <div className="hidden sm:flex relative">
                <input
                  type="text"
                  id="headerSearch"
                  placeholder="Search products..."
                  className="w-44 lg:w-56 rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm focus:border-gray-300 focus:outline-none focus:ring-0 focus:w-64 transition-all duration-300"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <button type="button" aria-label="Search" className="text-gray-900 hover:text-gray-600 sm:hidden">
                <Search className="h-5 w-5" />
              </button>
              <div className="relative">
                <button type="button" aria-label="Shopping cart" className="flex items-center p-2 text-gray-900 hover:text-gray-600 transition-colors">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute top-0.5 right-0.5 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-gray-900 rounded-full">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
