import Providers from "./Providers";
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
