import type { Metadata } from "next";
import HomePage from "@/components/store/pages/HomePage";
import { getShopifyProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Page() {
  const products = await getShopifyProducts(12);
  return <HomePage initialProducts={products} />;
}
