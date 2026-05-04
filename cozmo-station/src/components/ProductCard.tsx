import Image from 'next/image';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  brand: string;
  title: string;
  price: number;
  imageUrl?: string;
  index?: number;
}

export default function ProductCard({ brand, title, price, imageUrl, index = 0 }: ProductCardProps) {
  return (
    <div 
      className="group relative flex flex-col cursor-pointer animate-fade-in-up opacity-0"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative w-full aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden mb-5 transition-all duration-700 ease-out group-hover:shadow-2xl">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#fcfbf9] transition-colors duration-700 group-hover:bg-[#f5f3f0]">
            <span className="font-serif italic text-gray-300 tracking-widest text-xs uppercase">Cozmo Station</span>
          </div>
        )}
        
        {/* Hover Add to Cart Button for Desktop */}
        <div className="absolute inset-x-4 bottom-4 translate-y-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 hidden sm:block">
          <button className="w-full flex items-center justify-center gap-2 bg-gray-900/95 backdrop-blur-md px-4 py-3.5 text-sm font-medium text-white shadow-xl transition-all hover:bg-black hover:scale-[1.02]">
            <Plus className="h-4 w-4" />
            Add to Bag
          </button>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow">
        <span className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase mb-2">{brand}</span>
        <h3 className="text-base font-serif font-medium text-gray-900 line-clamp-2 leading-relaxed transition-colors group-hover:text-gray-600">
          {title}
        </h3>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-medium tracking-wide text-gray-900">${price.toFixed(2)}</p>
          
          {/* Mobile Add to Cart Button */}
          <button className="sm:hidden flex items-center justify-center rounded-full bg-gray-900 p-2.5 text-white shadow-md transition-colors hover:bg-black">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
