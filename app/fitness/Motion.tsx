"use client";

import { MotionConfig, motion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

/* Motion primitives for the Lagree pages. They exist so the pages themselves
   can stay server components and simply pass their markup through as children.

   Each takes an `as` so the animated node can be the real element rather than
   an extra wrapper — the schedule's hairline rules depend on its sections still
   being siblings. */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "-80px" } as const;

const TAGS = {
  div: motion.div,
  section: motion.section,
  footer: motion.footer,
  ul: motion.ul,
  li: motion.li,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
} as const;

type Tag = keyof typeof TAGS;

/* Every motion element accepts the same animation props, and nothing here
   passes tag-specific attributes, so one signature covers all of them. */
function tag(as: Tag) {
  return TAGS[as] as typeof motion.div;
}

type Common = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  style?: CSSProperties;
  /** Wait for the element to scroll into view instead of animating on mount. */
  inView?: boolean;
};

export function MotionProvider({ children }: { children: ReactNode }) {
  /* Drops transforms and keeps only opacity when the visitor asks for reduced
     motion, for every motion component below this point. */
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({
  children,
  as = "div",
  className,
  style,
  inView = false,
  delay = 0,
  duration = 0.7,
  y = 24,
  x = 0,
}: Common & { delay?: number; duration?: number; y?: number; x?: number }) {
  const Tag = tag(as);
  const hidden = { opacity: 0, y, x };
  const shown = { opacity: 1, y: 0, x: 0 };
  const transition = { duration, delay, ease: EASE };

  if (inView) {
    return (
      <Tag
        className={className}
        style={style}
        initial={hidden}
        whileInView={shown}
        viewport={VIEWPORT}
        transition={transition}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      style={style}
      initial={hidden}
      animate={shown}
      transition={transition}
    >
      {children}
    </Tag>
  );
}

export function Stagger({
  children,
  as = "div",
  className,
  style,
  inView = false,
  stagger = 0.09,
  delay = 0,
}: Common & { stagger?: number; delay?: number }) {
  const Tag = tag(as);
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <Tag
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      {...(inView
        ? { whileInView: "show", viewport: VIEWPORT }
        : { animate: "show" })}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  as = "div",
  className,
  style,
  y = 22,
  x = 0,
  duration = 0.65,
}: Omit<Common, "inView"> & { y?: number; x?: number; duration?: number }) {
  const Tag = tag(as);
  const variants: Variants = {
    hidden: { opacity: 0, y, x },
    show: { opacity: 1, y: 0, x: 0, transition: { duration, ease: EASE } },
  };

  return (
    <Tag className={className} style={style} variants={variants}>
      {children}
    </Tag>
  );
}

/** A slow drift down to true scale, for imagery that should keep moving after
    the page has settled. */
export function Settle({
  children,
  className,
  style,
  inView = false,
  from = 1.06,
  duration = 1.8,
  delay = 0,
}: Omit<Common, "as"> & {
  from?: number;
  duration?: number;
  delay?: number;
}) {
  const transition = { duration, delay, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ scale: from }}
      transition={transition}
      {...(inView
        ? { whileInView: { scale: 1 }, viewport: VIEWPORT }
        : { animate: { scale: 1 } })}
    >
      {children}
    </motion.div>
  );
}
