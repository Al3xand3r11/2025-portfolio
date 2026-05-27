export type NavItem = {
  label: string;
  href: string;
  type?: "section" | "page";
};

export const navItems: NavItem[] = [
  { label: "About", href: "/about", type: "page" },
  { label: "Community", href: "/community", type: "page" },
  { label: "Engineering", href: "/engineering", type: "page" },
  { label: "Lagree", href: "/lagree", type: "page" },
  { label: "Contact", href: "/contact", type: "page" },
];

export function resolveHref(item: NavItem, pathname: string): string {
  if (item.type === "section" && pathname !== "/") {
    return `/${item.href}`;
  }
  return item.href;
}
