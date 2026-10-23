import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سلة التسوق",
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
