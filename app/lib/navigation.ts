import { LAGREE_ORIGIN } from "./sites";

export type NavItem = {
  label: string;
  href: string;
  /** Lives on another origin, so it opens in a new tab. */
  external?: boolean;
};

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Community", href: "/community" },
  { label: "Engineering", href: "/engineering" },
  { label: "Lagree", href: LAGREE_ORIGIN, external: true },
  { label: "Contact", href: "/contact" },
];
