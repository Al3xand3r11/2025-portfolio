import type { Metadata } from "next";
import { requireOwner } from "../../lib/auth/session";
import Shell from "../_components/Shell";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await requireOwner();
  return <Shell>{children}</Shell>;
}
