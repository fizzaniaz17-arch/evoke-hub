import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Evoke Hub",
  description: "Evoke Hub internal quote management dashboard",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
