import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const featuredProducts = [
  {
    id: 1,
    brand: 'COSRX',
    title: 'Advanced Snail 96 Mucin Power Essence',
    price: 25.00,
  },
  {
    id: 2,
    brand: 'Eucerin',
    title: 'Hyaluronic Repair Anti-Age Day Cream',
    price: 45.00,
  },
  {
    id: 3,
    brand: 'Beauty of Joseon',
    title: 'Relief Sun: Rice + Probiotics',
    price: 18.00,
  },
  {
    id: 4,
    brand: 'Augustinus Bader',
    title: 'The Rich Cream',
    price: 290.00,
  }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-50 pt-24 pb-32 sm:pt-32 sm:pb-40">
        {/* Subtle decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-gray-100 to-gray-200 rounded-full blur-3xl opacity-50 -z-10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-800 mb-8 shadow-sm">
            <span>✨ Introducing the Fall Collection</span>
          </div>
          
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-gray-900 sm:text-7xl">
            Where K-Beauty Innovation Meets German Precision.
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-gray-600">
            Elevate your glow with Cozmo Station. We curate the world&apos;s finest skincare, bringing you the perfect synergy of advanced Korean formulas and trusted German dermatological science.
          </p>
          
          <div className="mt-10 flex justify-center gap-x-6">
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              Shop the Collection
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/brands"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              Explore Brands
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Skincare Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900">Featured Skincare</h2>
              <p className="mt-2 text-gray-500">Discover our best-selling essentials curated for optimal results.</p>
            </div>
            <Link href="/shop" className="group mt-4 sm:mt-0 flex items-center text-sm font-medium text-gray-900 transition-colors hover:text-gray-600">
              View all products
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                brand={product.brand}
                title={product.title}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
