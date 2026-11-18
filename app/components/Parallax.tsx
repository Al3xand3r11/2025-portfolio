"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Drifts its children vertically as the parent frame scrolls through the viewport.
 * The parent must be positioned with overflow hidden; the layer overscans it by 10%
 * top and bottom, so `amount` must stay under ~8 to keep edges covered.
 */
export default function Parallax({
  children,
  amount = 10,
}: {
  children: ReactNode;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} style={{ position: "absolute", inset: 0 }}>
      <motion.div
        style={{
          position: "absolute",
          inset: "-10% 0",
          y: reduceMotion ? 0 : y,
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
