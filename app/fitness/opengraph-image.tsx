import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Brandon Nance — Lagree in downtown Los Angeles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* File-based, so it resolves ahead of the portfolio's card for anything under
   this segment. Setting openGraph.images in metadata instead would leave the
   precedence against the parent's own file ambiguous. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "#000000",
          color: "#f5f2ec",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 14,
            background: "#c1553a",
            display: "flex",
          }}
        />

        <span
          style={{
            fontSize: 20,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(245, 242, 236, 0.58)",
          }}
        >
          Lagree · Downtown Los Angeles
        </span>

        <h1
          style={{
            margin: "20px 0 0",
            fontSize: 104,
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
          }}
        >
          Brandon Nance
        </h1>

        <span
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "rgba(245, 242, 236, 0.72)",
          }}
        >
          Sundays, Mondays, Wednesdays and Fridays
        </span>
      </div>
    ),
    { ...size }
  );
}
