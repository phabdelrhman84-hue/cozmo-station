import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الاسترجاع",
  description: "سياسة الاسترجاع والاستبدال في متجر كوزمو ستيشن.",
  alternates: { canonical: "/returns" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
