import { client } from '@/sanity/lib/client';
import ProductCard from '@/components/ProductCard';
import { urlFor } from '@/sanity/lib/image';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { PortableText } from '@portabletext/react';

interface Product {
  _id: string;
  title: string;
  price: number;
  origin: string;
  description?: any;
  images?: Array<{ asset: { _ref: string } }>;
  categories?: Array<{ _ref: string, _type: string }>;
}

async function getProductData(slug: string) {
  const productQuery = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    price,
    origin,
    description,
    images,
    categories
  }`;
  const product = await client.fetch(productQuery, { slug });
  
  if (!product) return null;

  // Fetch "Frequently Bought Together" / "Complete the Routine"
  // Try to fetch products from the same category, or fallback to random/recent products
  let relatedProductsQuery = `*[_type == "product" && _id != $id] | order(_createdAt desc)[0...4] {
    _id,
    title,
    price,
    origin,
    images
  }`;

  if (product.categories && product.categories.length > 0) {
    const categoryId = product.categories[0]._ref;
    relatedProductsQuery = `*[_type == "product" && _id != $id && references($categoryId)] | order(_createdAt desc)[0...4] {
      _id,
      title,
      price,
      origin,
      images
    }`;
    const relatedProducts = await client.fetch(relatedProductsQuery, { id: product._id, categoryId });
    
    // If not enough related products, just fetch general
    if (relatedProducts.length > 0) {
       return { product, relatedProducts };
    }
  }

  // Fallback
  const generalRelatedProductsQuery = `*[_type == "product" && _id != $id] | order(_createdAt desc)[0...4] {
    _id,
    title,
    price,
    origin,
    images
  }`;
  const relatedProducts = await client.fetch(generalRelatedProductsQuery, { id: product._id });

  return { product, relatedProducts };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const data = await getProductData(params.slug);
  
  if (!data) {
    notFound();
  }
  
  const { product, relatedProducts } = data;
  const displayBrand = product.origin === 'korean' ? 'K-Beauty' : product.origin === 'german' ? 'German Science' : 'Cozmo Station';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Product Details Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Image Gallery */}
            <div className="relative w-full aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={urlFor(product.images[0]).url()}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#fcfbf9]">
                  <span className="font-serif italic text-gray-300 tracking-widest text-sm uppercase">Cozmo Station</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <span className="text-sm font-semibold tracking-[0.2em] text-gray-400 uppercase mb-4">
                {displayBrand}
              </span>
              <h1 className="text-3xl md:text-5xl font-serif text-gray-900 tracking-tight leading-tight mb-6">
                {product.title}
              </h1>
              <p className="text-2xl font-medium text-gray-900 mb-8">
                ${product.price.toFixed(2)}
              </p>

              {product.description && (
                <div className="prose prose-gray font-light text-gray-500 mb-10">
                  <PortableText value={product.description} />
                </div>
              )}

              <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gray-900 px-8 py-4 text-sm font-medium text-white uppercase tracking-widest transition-all hover:bg-black hover:shadow-xl hover:-translate-y-1">
                <Plus className="h-5 w-5" />
                Shop the Routine
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Bought Together / Complete the Routine */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="py-24 bg-[#faf9f7] border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-6 gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-tight mb-2">Complete the Routine</h2>
                <p className="text-sm tracking-widest uppercase text-gray-400 font-semibold">Frequently Bought Together</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16">
              {relatedProducts.map((rp: Product, index: number) => {
                const rpBrand = rp.origin === 'korean' ? 'K-Beauty' : rp.origin === 'german' ? 'German Science' : 'Cozmo Station';
                
                return (
                  <ProductCard
                    key={rp._id}
                    brand={rpBrand}
                    title={rp.title}
                    price={rp.price}
                    imageUrl={rp.images && rp.images.length > 0 ? urlFor(rp.images[0]).width(600).height(750).url() : undefined}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
