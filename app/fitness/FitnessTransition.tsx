"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import styles from "./fitness.module.css";
import { useLagreePathname } from "./useLagreePathname";

/* An orange panel that starts covering the viewport and sweeps up out of frame,
   so arriving from the portfolio reads as crossing into a different site.

   The panel is keyed to the pathname rather than driven by link clicks: framer
   renders `initial` during SSR and on the first frame of a client navigation,
   so the panel is already at full cover before the new page is ever visible.
   Covering the screen before navigating instead would mean intercepting every
   link, which is considerably easier to get wrong. */

const EASE = [0.76, 0, 0.24, 1] as const;

/* Each page's sweep is drawn in that page's own background, so it settles into
   the screen it uncovers rather than flashing a colour the page never uses.
   The lead layer is the one you see; the trailing layer shows through behind it
   as it lifts, which is what gives the sweep depth. Orange is sampled from the
   warm light in the hero photograph. */
const SWEEPS: Record<string, { lead: string; trail: string }> = {
  "/": { lead: "#c1553a", trail: "#9c3f2b" },
  "/schedule": { lead: "#000000", trail: "#1c1c1c" },
  "/music": { lead: "#000000", trail: "#1c1c1c" },
  "/about": { lead: "#ffffff", trail: "#e6e1d8" },
};

const DEFAULT_SWEEP = SWEEPS["/"];

export default function FitnessTransition() {
  const pathname = useLagreePathname();
  const sweep = SWEEPS[pathname] ?? DEFAULT_SWEEP;

  /* Written after the first commit, so it is false while the first page is
     rendering on both the server and the client, and true for every navigation
     after that. Arriving is worth dwelling on; moving around inside the site
     gets the same gesture at roughly half the length. */
  const hasNavigated = useRef(false);
  useEffect(() => {
    hasNavigated.current = true;
  }, [pathname]);

  const isEntry = !hasNavigated.current;
  const duration = isEntry ? 0.92 : 0.58;
  const hold = isEntry ? 0.16 : 0;

  return (
    <div key={pathname} className={styles.curtain} aria-hidden>
      <motion.div
        className={styles.curtainLayer}
        style={{ backgroundColor: sweep.trail }}
        initial={{ y: 0 }}
        animate={{ y: "-101%" }}
        transition={{ duration, ease: EASE, delay: hold }}
      />
      <motion.div
        className={styles.curtainLayer}
        style={{ backgroundColor: sweep.lead }}
        initial={{ y: 0 }}
        animate={{ y: "-101%" }}
        transition={{ duration, ease: EASE, delay: hold + 0.08 }}
      />
    </div>
  );
}
