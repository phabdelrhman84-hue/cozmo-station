import Image from 'next/image';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  brand: string;
  title: string;
  price: number;
  imageUrl?: string;
}

export default function ProductCard({ brand, title, price, imageUrl }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col cursor-pointer">
      <div className="relative w-full aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden mb-5 transition-all duration-500 ease-out group-hover:shadow-md">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 transition-colors duration-500 group-hover:bg-gray-200/50">
            <span className="text-gray-400 font-medium tracking-widest text-xs uppercase">Cozmo Station</span>
          </div>
        )}
        
        {/* Hover Add to Cart Button for Desktop */}
        <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 hidden sm:block">
          <button className="w-full flex items-center justify-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-4 py-3 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-900 hover:text-white">
            <Plus className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow">
        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-1">{brand}</span>
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-relaxed transition-colors group-hover:text-gray-600">
          {title}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">${price.toFixed(2)}</p>
          
          {/* Mobile Add to Cart Button */}
          <button className="sm:hidden flex items-center justify-center rounded-full bg-gray-100 p-2 text-gray-900 transition-colors hover:bg-gray-200">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
