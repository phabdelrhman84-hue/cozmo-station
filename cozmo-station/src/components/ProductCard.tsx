import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  brand: string;
  title: string;
  price: number;
  imageUrl?: string;
  slug?: string;
  index?: number;
}

function StarRating({ score = 4.8 }: { score?: number }) {
  return (
    <div className="flex items-center gap-1 mt-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"
          fill={s <= Math.round(score) ? 'currentColor' : 'none'}
          stroke="currentColor" strokeWidth="1.5"
          className="text-amber-400">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="text-xs text-gray-400 ml-1">{score}</span>
    </div>
  );
}

export default function ProductCard({ brand, title, price, imageUrl, slug, index = 0 }: ProductCardProps) {
  const cardContent = (
    <div
      className="group relative flex flex-col cursor-pointer animate-fade-in-up opacity-0"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative w-full aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden mb-4 transition-all duration-700 ease-out group-hover:shadow-2xl">
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

        {/* Hover Add to Cart */}
        <div className="absolute inset-x-4 bottom-4 translate-y-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 hidden sm:block">
          <button className="w-full flex items-center justify-center gap-2 bg-gray-900/95 backdrop-blur-md px-4 py-3.5 text-sm font-medium text-white shadow-xl transition-all hover:bg-black hover:scale-[1.02]">
            <Plus className="h-4 w-4" />
            Get Glowing Now
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <span className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase mb-1">{brand}</span>
        <h3 className="text-sm font-serif font-medium text-gray-900 line-clamp-2 leading-relaxed transition-colors group-hover:text-gray-600">
          {title}
        </h3>
        <StarRating />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900">${price.toFixed(2)}</p>
          <button className="sm:hidden flex items-center justify-center rounded-full bg-gray-900 p-2.5 text-white shadow-md transition-colors hover:bg-black">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  if (slug) {
    return <Link href={`/product/${slug}`}>{cardContent}</Link>;
  }

  return cardContent;
}
