import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن",
  description: "تعرّف على كوزمو ستيشن، متجر منتجات العناية بالبشرة والشعر المستوردة من كوريا واليابان وألمانيا في مصر.",
  alternates: { canonical: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
