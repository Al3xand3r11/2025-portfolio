"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { NavItem } from "../lib/navigation";

/* Lagree is a separate site on its own origin, so its nav entry has to be a
   plain anchor rather than a client-side route. */
export default function NavLink({
  item,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  item: NavItem;
  style?: CSSProperties;
  onClick?: () => void;
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const handlers = { onClick, onMouseEnter, onMouseLeave, style };

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" {...handlers}>
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} {...handlers}>
      {item.label}
    </Link>
  );
}
