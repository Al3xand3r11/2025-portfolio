import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { verifySession } from "../../lib/auth/session";
import styles from "../dashboard.module.css";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await verifySession()) redirect("/dashboard");

  return (
    <main className={styles.login}>
      <p className={styles.kicker}>Dashboard</p>
      <LoginForm />
    </main>
  );
}
