import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.sanity.io',
      },
      {
        hostname: '*.supabase.co',
      },
      {
        // Shopify product images CDN
        hostname: 'cdn.shopify.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://*.sanity.io https://sanity.io",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
