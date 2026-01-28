"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Community", href: "#community" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
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
          <div className="container h-full">
            <div className="grid grid-cols-2 md:grid-cols-4 h-full items-center gap-4 text-sm">
              {/* Name & Title */}
              <div className="flex flex-col">
                <Link href="/" className="group">
                  <span className="text-[var(--color-foreground)] font-medium flex items-center gap-1">
                    <span className="text-[var(--color-muted)]">&gt;</span> Brandon Nance
                  </span>
                  <span className="text-[var(--color-muted)] text-xs">
                    Software Engineer
                  </span>
                </Link>
              </div>

              {/* Location */}
              <div className="hidden md:flex flex-col">
                <span className="text-[var(--color-foreground)]">Los Angeles</span>
                <span className="text-[var(--color-muted)] text-xs">
                  Working globally
                </span>
              </div>

              {/* Status */}
              <div className="hidden md:flex flex-col">
                <span className="text-[var(--color-foreground)]">
                  Currently at Paramount
                </span>
                <span className="text-[var(--color-muted)] text-xs">
                  Available for projects
                </span>
              </div>

              {/* Navigation & CTA */}
              <div className="flex items-center justify-end gap-6">
                <nav className="hidden lg:flex items-center gap-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {/* CTA Button with Corner Brackets - Hidden on mobile */}
                <Link
                  href="#contact"
                  className="hidden sm:block relative px-4 py-2 text-sm font-medium text-[var(--color-foreground)] group"
                >
                  {/* Corner brackets */}
                  <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-accent)] transition-all duration-300 group-hover:w-3 group-hover:h-3" />
                  <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--color-accent)] transition-all duration-300 group-hover:w-3 group-hover:h-3" />
                  <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--color-accent)] transition-all duration-300 group-hover:w-3 group-hover:h-3" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-accent)] transition-all duration-300 group-hover:w-3 group-hover:h-3" />
                </Link>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-2 text-[var(--color-foreground)]"
                  aria-label="Open menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.header>
      </AnimatePresence>

      {/* Mobile menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
