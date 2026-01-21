"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Community", href: "#community" },
  { label: "Contact", href: "#contact" },
];

const menuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: 20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.nav
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-[var(--color-background)] border-l border-[var(--color-border)] z-50 lg:hidden flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={onClose}
                className="p-2 text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 flex flex-col justify-center px-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-4 text-3xl font-medium text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-8 border-t border-[var(--color-border)]"
            >
              <p className="text-sm text-[var(--color-muted)] mb-2">Brandon Nance</p>
              <p className="text-xs text-[var(--color-muted)]" style={{ fontFamily: "var(--font-mono)" }}>
                Los Angeles, CA
              </p>
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

