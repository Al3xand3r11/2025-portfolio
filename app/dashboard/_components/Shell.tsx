"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import ThemeToggle from "../../components/ThemeToggle";
import { logout } from "../actions";
import styles from "../dashboard.module.css";

const NAV = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/inbox", label: "Inbox" },
  { href: "/dashboard/projects", label: "Projects" },
  { href: "/dashboard/process", label: "Process" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const current = NAV.find((item) => isActive(pathname, item.href));

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <p className={styles.kicker}>Dashboard</p>
        <nav className={styles.nav} aria-label="Dashboard">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              data-active={isActive(pathname, item.href)}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <ThemeToggle />
          <form action={logout}>
            <button type="submit" className={styles.button}>
              Log out
            </button>
          </form>
        </div>
      </aside>
      <div className={styles.main}>
        <h1 className={styles.title}>{current?.label ?? "Dashboard"}</h1>
        {children}
      </div>
    </div>
  );
}
