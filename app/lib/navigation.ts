import { LAGREE_ORIGIN } from "./sites";

export type NavItem = {
  label: string;
  href: string;
  /** Lives on another origin, so it opens in a new tab. */
  external?: boolean;
};

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Life", href: "/life" },
  { label: "Work", href: "/engineering" },
  { label: "Contact", href: "/contact" },
];
