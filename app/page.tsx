"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Community", href: "/community" },
  { label: "Engineering", href: "/engineering" },
  { label: "Lagree", href: "/lagree" },
  { label: "Contact", href: "/contact" },
];

function noise(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const tx = fx * fx * (3 - 2 * fx);
  const ty = fy * fy * (3 - 2 * fy);

  const a = noise(ix, iy);
  const b = noise(ix + 1, iy);
  const c = noise(ix, iy + 1);
  const d = noise(ix + 1, iy + 1);

  return a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty;
}

function drawRings(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth;
  const h = window.innerHeight;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  const cx = Math.random() * w;
  const cy = Math.random() * h;
  const seed = Math.random() * 1000;

  const maxRadius = Math.sqrt(
    Math.max(cx, w - cx) ** 2 + Math.max(cy, h - cy) ** 2
  );
  const spacing = 10;
  const count = Math.ceil(maxRadius / spacing);
  const segments = 200;
  const angleStep = (Math.PI * 2) / segments;

  ctx.strokeStyle = "rgba(0, 0, 0, 0.24)";
  ctx.lineWidth = 0.4;

  for (let i = 1; i <= count; i++) {
    const baseRadius = i * spacing;
    const drift = baseRadius * 0.008;

    ctx.beginPath();
    for (let s = 0; s <= segments; s++) {
      const angle = s * angleStep;
      const n =
        smoothNoise(angle * 2 + seed, i * 0.3) * 2 - 1 +
        (smoothNoise(angle * 5 + seed + 50, i * 0.7) * 2 - 1) * 0.4;
      const r = baseRadius + n * drift;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (s === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) drawRings(canvasRef.current);
  }, []);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100svh",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#fff",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          willChange: "transform",
          contain: "layout style paint",
        }}
      />
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: 24,
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: "#000",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontFamily: "var(--font-mono)",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.4")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a
              href="https://www.linkedin.com/in/bnance1/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: "#000", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.4")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com/Al3xand3r11"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{ color: "#000", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.4")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </header>

        <footer
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 24,
          }}
        >
          <span
            style={{
              color: "#000",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontFamily: "var(--font-mono)",
            }}
          >
            Brandon Alexander
          </span>
        </footer>
    </main>
  );
}
