import type { Metadata } from "next";
import Providers from "./Providers";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
import AdminLayoutClient from "./AdminLayoutClient";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </Providers>
  );
}
