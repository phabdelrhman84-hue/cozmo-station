import { client } from '@/sanity/lib/client';
import ProductCard from '@/components/ProductCard';
import TrustBar from '@/components/TrustBar';
import { urlFor } from '@/sanity/lib/image';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import type { Metadata } from 'next';

interface Product {
  _id: string;
  title: string;
  price: number;
  origin: string;
  description?: any;
  images?: Array<{ asset: { _ref: string } }>;
  categories?: Array<{ _ref: string; _type: string }>;
  slug?: { current: string };
}

async function getProductData(slug: string) {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id, title, price, origin, description, images, categories, slug
    }`,
    { slug }
  );
  if (!product) return null;

  let relatedProducts: Product[] = [];

  if (product.categories?.length) {
    const categoryId = product.categories[0]._ref;
    relatedProducts = await client.fetch(
      `*[_type == "product" && _id != $id && references($categoryId)] | order(_createdAt desc)[0...4] {
        _id, title, price, origin, images, slug
      }`,
      { id: product._id, categoryId }
    );
  }

  if (!relatedProducts.length) {
    relatedProducts = await client.fetch(
      `*[_type == "product" && _id != $id] | order(_createdAt desc)[0...4] {
        _id, title, price, origin, images, slug
      }`,
      { id: product._id }
    );
  }

  return { product, relatedProducts };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getProductData(params.slug);
  if (!data) return {};
  const { product } = data;
  return {
    title: product.title,
    description: `Shop ${product.title} at Cozmo Station — premium Korean and German skincare in Egypt.`,
    openGraph: { title: product.title, images: product.images?.[0] ? [urlFor(product.images[0]).width(1200).height(630).url()] : [] },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const data = await getProductData(params.slug);
  if (!data) notFound();

  const { product, relatedProducts } = data;
  const displayBrand = product.origin === 'korean' ? 'K-Beauty' : product.origin === 'german' ? 'German Science' : 'Cozmo Station';
  const mainImage = product.images?.[0] ? urlFor(product.images[0]).url() : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: `${product.title} — premium ${displayBrand} skincare from Cozmo Station.`,
    brand: { '@type': 'Brand', name: 'Cozmo Station' },
    image: mainImage ? [mainImage] : [],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price.toFixed(2),
      availability: 'https://schema.org/InStock',
      url: `https://cozmostation.com/product/${product.slug?.current}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '47',
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Product Detail ─────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative w-full aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden">
                {mainImage ? (
                  <Image src={mainImage} alt={product.title} fill className="object-cover" priority />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#fcfbf9]">
                    <span className="font-serif italic text-gray-300 tracking-widest text-sm uppercase">Cozmo Station</span>
                  </div>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.slice(1).map((img: { asset: { _ref: string } }, i: number) => (
                    <div key={i} className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                      <Image src={urlFor(img).width(200).height(200).url()} alt={`${product.title} ${i + 2}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col lg:sticky lg:top-24">
              <span className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase mb-3">{displayBrand}</span>
              <h1 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-tight leading-tight mb-4">{product.title}</h1>

              {/* Stars */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">4.8 (47 reviews)</span>
              </div>

              <p className="text-3xl font-light text-gray-900 mb-8">${product.price.toFixed(2)}</p>

              {product.description && (
                <div className="prose prose-sm prose-gray font-light text-gray-500 mb-10 max-w-none">
                  <PortableText value={product.description} />
                </div>
              )}

              <div className="space-y-4">
                <button className="w-full flex items-center justify-center gap-3 bg-gray-900 px-8 py-4 text-sm font-medium text-white uppercase tracking-widest transition-all hover:bg-black hover:shadow-xl hover:-translate-y-0.5">
                  <Plus className="h-5 w-5" />
                  Shop the Routine
                </button>
                <button className="w-full flex items-center justify-center gap-3 border border-gray-200 px-8 py-4 text-sm font-medium text-gray-900 uppercase tracking-widest transition-all hover:border-gray-900 hover:shadow-sm">
                  Add to Wishlist
                </button>
              </div>

              <div className="mt-8">
                <TrustBar />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Complete the Routine ───────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="py-24 bg-[#faf9f7] border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 pb-6 border-b border-gray-200">
              <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase mb-3">Frequently Bought Together</p>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-tight">Complete the Routine</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16">
              {relatedProducts.map((rp, index) => {
                const rpBrand = rp.origin === 'korean' ? 'K-Beauty' : rp.origin === 'german' ? 'German Science' : 'Cozmo Station';
                return (
                  <ProductCard
                    key={rp._id}
                    brand={rpBrand}
                    title={rp.title}
                    price={rp.price}
                    slug={rp.slug?.current}
                    imageUrl={rp.images?.[0] ? urlFor(rp.images[0]).width(600).height(750).url() : undefined}
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
