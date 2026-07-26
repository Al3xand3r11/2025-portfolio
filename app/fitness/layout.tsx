import type { Metadata } from "next";
import FitnessNav from "./FitnessNav";
import styles from "./fitness.module.css";

export const metadata: Metadata = {
  title: "Brandon Alexander | Lagree Instructor in Los Angeles",
  description:
    "Lagree classes taught by Brandon Alexander in downtown Los Angeles — Arts District and Historic Core. See the weekly schedule and book a class.",
};

export default function FitnessLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-site="fitness" className={styles.site}>
      <FitnessNav />

      {children}
    </div>
  );
}
