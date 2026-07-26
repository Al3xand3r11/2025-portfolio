"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./fitness.module.css";

/* the three-column grid keeps the wordmark centred, so the order here is the
   order of the columns: left link, centred home, right link */
const links = [
  { href: "/fitness/music", label: "Music", className: styles.navLink },
  { href: "/fitness", label: "Lagree", className: styles.navHome },
  { href: "/fitness/about", label: "About", className: styles.navMuted },
];

export default function FitnessNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {links.map(({ href, label, className }) => {
        const isCurrent = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            aria-current={isCurrent ? "page" : undefined}
            className={isCurrent ? `${className} ${styles.navActive}` : className}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
