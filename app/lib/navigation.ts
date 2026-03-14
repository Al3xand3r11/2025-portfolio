export type NavItem = {
  label: string;
  href: string;
  type: "section" | "page";
};

export const navItems: NavItem[] = [
  { label: "Projects", href: "#work", type: "section" },
  { label: "Community", href: "#community", type: "section" },
  { label: "Lagree", href: "/lagree", type: "page" },
  { label: "Music", href: "/music", type: "page" },
  { label: "Contact", href: "#contact", type: "section" },
];

/**
 * For section links, prepend "/" when navigating from a sub-page
 * so the link resolves to the home page section (e.g. "/#work").
 */
export function resolveHref(item: NavItem, pathname: string): string {
  if (item.type === "section" && pathname !== "/") {
    return `/${item.href}`;
  }
  return item.href;
}
