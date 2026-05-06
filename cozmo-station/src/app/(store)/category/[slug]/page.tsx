import { client } from '@/sanity/lib/client';
import ProductCard from '@/components/ProductCard';
import { urlFor } from '@/sanity/lib/image';
import { notFound } from 'next/navigation';

interface Product {
  _id: string;
  title: string;
  price: number;
  origin: string;
  images?: Array<{ asset: { _ref: string } }>;
}

interface Category {
  title: string;
  description: string;
}

async function getCategoryData(slug: string) {
  const categoryQuery = `*[_type == "category" && slug.current == $slug][0] {
    title,
    description
  }`;
  const category = await client.fetch(categoryQuery, { slug });
  
  if (!category) return null;

  const productsQuery = `*[_type == "product" && references(*[_type=="category" && slug.current == $slug]._id)] | order(_createdAt desc) {
    _id,
    title,
    price,
    origin,
    images
  }`;
  
  const products = await client.fetch(productsQuery, { slug });
  
  return { category, products };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const data = await getCategoryData(params.slug);
  
  if (!data) {
    notFound();
  }
  
  const { category, products } = data;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Category Header */}
      <section className="pt-32 pb-16 bg-[#faf9f7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 tracking-tight mb-4">
            {category.title}
          </h1>
          {category.description && (
            <p className="max-w-2xl mx-auto text-lg text-gray-500 font-light">
              {category.description}
            </p>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16">
              {products.map((product: Product, index: number) => {
                const displayBrand = product.origin === 'korean' ? 'K-Beauty' : product.origin === 'german' ? 'German Science' : 'Cozmo Station';
                
                return (
                  <ProductCard
                    key={product._id}
                    brand={displayBrand}
                    title={product.title}
                    price={product.price}
                    imageUrl={product.images && product.images.length > 0 ? urlFor(product.images[0]).width(600).height(750).url() : undefined}
                    index={index}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
              <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-500 text-center max-w-md">We are currently curating products for this category. Please check back soon.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
