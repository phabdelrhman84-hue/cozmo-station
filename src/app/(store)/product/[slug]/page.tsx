import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/store/pages/ProductDetail";
import { getProduct } from "@/lib/shopify";
import { SITE_URL, stripHtml, truncate } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

// نفس المنتج لـ generateMetadata والصفحة — طلب واحد لـ Shopify
const loadProduct = cache(async (slug: string) => getProduct(decodeSlug(slug)));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) return {};

  const title = product.meta_title_ar || product.name_ar;
  const description = truncate(
    product.meta_description_ar ||
      stripHtml(product.description_ar || product.description)
  );
  const path = `/product/${encodeURIComponent(product.slug)}`;

  return {
    title,
    description: description || undefined,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title,
      description: description || undefined,
      images: product.main_image ? [{ url: product.main_image, alt: product.name_ar }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) notFound();

  const url = `${SITE_URL}/product/${encodeURIComponent(product.slug)}`;
  const description = stripHtml(product.description_ar || product.description);

  // بيانات منظمة من بيانات Shopify الحقيقية فقط — بدون تقييمات أو مراجعات
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name_ar,
      ...(product.name_en !== product.name_ar && { alternateName: product.name_en }),
      ...(description && { description: truncate(description, 5000) }),
      image: product.images.length > 0 ? product.images : undefined,
      ...(product.brand && { brand: { "@type": "Brand", name: product.brand } }),
      url,
      offers: {
        "@type": "Offer",
        url,
        price: product.price_egp.toFixed(2),
        priceCurrency: "EGP",
        availability:
          product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "المنتجات", item: `${SITE_URL}/products` },
        { "@type": "ListItem", position: 3, name: product.name_ar, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductDetail initialProduct={product} />
    </>
  );
}
