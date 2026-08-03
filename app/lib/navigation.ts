import { LAGREE_ORIGIN } from "./sites";

export type NavItem = {
  label: string;
  href: string;
  type?: "section" | "page";
  /** Lives on another origin, so it opens in a new tab. */
  external?: boolean;
};

export const LAGREE_URL = LAGREE_ORIGIN;

export const navItems: NavItem[] = [
  { label: "About", href: "/about", type: "page" },
  { label: "Community", href: "/community", type: "page" },
  { label: "Engineering", href: "/engineering", type: "page" },
  { label: "Lagree", href: LAGREE_ORIGIN, type: "page", external: true },
  { label: "Contact", href: "/contact", type: "page" },
];

export function resolveHref(item: NavItem, pathname: string): string {
  if (item.type === "section" && pathname !== "/") {
    return `/${item.href}`;
  }
  return item.href;
}
