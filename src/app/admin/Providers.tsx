"use client";

import { SessionProvider } from "next-auth/react";
import AdminLayout from "./layout"; // Import the client layout we just made, but we need to rename it to separate the client part from the server part if we are in app router.

// Actually, in App Router, layout.tsx can be a Client Component if we put "use client" at the top, but we need SessionProvider.
// We should wrap the children with SessionProvider in a separate file or directly inside layout.tsx if we make it a client component.
// The file above is layout.tsx with "use client", so we just need a NextAuthProvider to wrap the whole app or just admin.
// Wait, I will rewrite the admin layout correctly.

import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
