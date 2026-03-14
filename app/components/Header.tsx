"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { navItems, resolveHref } from "@/app/lib/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsAtTop(currentScrollY < 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <AnimatePresence>
        <motion.header
          initial={{ y: 0 }}
          animate={{ y: isVisible ? 0 : -100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
            isAtTop ? "bg-transparent" : "bg-[#0a0a0a]/90 backdrop-blur-sm"
          }`}
          style={{ height: "var(--header-height)" }}
        >
          <div className="container h-full px-4 md:px-6">
            <div className="flex h-full items-center text-sm">
              {/* Home link */}
              <Link
                href="/"
                className="text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors text-lg font-medium shrink-0"
                aria-label="Home"
              >
                +
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center justify-evenly flex-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={resolveHref(item, pathname)}
                    className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-[var(--color-foreground)]"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </motion.header>
      </AnimatePresence>

      {/* Mobile menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
