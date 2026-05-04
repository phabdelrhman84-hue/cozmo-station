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
      <section className="relative overflow-hidden bg-[#faf9f7] pt-24 pb-32 sm:pt-40 sm:pb-48">
        {/* Full-width aesthetic placeholder background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615397323616-e5657758fbdf?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center opacity-[0.15] mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#faf9f7]"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="animate-fade-in opacity-0 inline-flex items-center rounded-full border border-gray-200/50 bg-white/50 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold tracking-widest text-gray-800 mb-10 shadow-sm uppercase">
            <span>✨ The Fall Collection</span>
          </div>
          
          <h1 className="animate-fade-in-up opacity-0 mx-auto max-w-5xl font-serif text-5xl font-medium tracking-tight text-gray-900 sm:text-7xl lg:text-8xl leading-tight" style={{ animationDelay: '200ms' }}>
            Where K-Beauty <br className="hidden sm:block" />
            <span className="italic text-gray-500 font-light">meets</span> German Precision.
          </h1>
          
          <p className="animate-fade-in-up opacity-0 mx-auto mt-8 max-w-2xl text-lg tracking-wide text-gray-500 font-light" style={{ animationDelay: '400ms' }}>
            Elevate your glow with Cozmo Station. We curate the world&apos;s finest skincare, bringing you the perfect synergy of advanced Korean formulas and trusted German dermatological science.
          </p>
          
          <div className="animate-fade-in-up opacity-0 mt-12 flex justify-center gap-x-6" style={{ animationDelay: '600ms' }}>
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center bg-gray-900 px-10 py-4 text-sm font-medium tracking-wider uppercase text-white transition-all duration-300 hover:bg-black hover:shadow-xl focus:outline-none"
            >
              Shop the Collection
              <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
            <Link
              href="/brands"
              className="inline-flex items-center justify-center border border-gray-300 bg-transparent px-10 py-4 text-sm font-medium tracking-wider uppercase text-gray-900 transition-all duration-300 hover:bg-white hover:border-gray-400 focus:outline-none"
            >
              Explore Brands
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Skincare Section */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 border-b border-gray-100 pb-8">
            <div className="animate-slide-in-right opacity-0">
              <h2 className="text-4xl font-serif font-medium tracking-tight text-gray-900">Featured Skincare</h2>
              <p className="mt-3 text-sm tracking-widest uppercase text-gray-400 font-semibold">Curated for optimal results</p>
            </div>
            <Link href="/shop" className="group mt-6 sm:mt-0 flex items-center text-sm font-semibold tracking-widest uppercase text-gray-900 transition-colors hover:text-gray-500 animate-fade-in opacity-0" style={{ animationDelay: '300ms' }}>
              View all products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                brand={product.brand}
                title={product.title}
                price={product.price}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
