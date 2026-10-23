import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية في متجر كوزمو ستيشن.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
