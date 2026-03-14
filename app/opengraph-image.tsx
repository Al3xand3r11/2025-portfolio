import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Brandon Nance — Software Engineer in Los Angeles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Corner brackets */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 60,
            height: 60,
            borderTop: "2px solid #f5f0e8",
            borderLeft: "2px solid #f5f0e8",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            width: 60,
            height: 60,
            borderBottom: "2px solid #f5f0e8",
            borderRight: "2px solid #f5f0e8",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <span
            style={{
              fontSize: 16,
              color: "#666666",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            Software Engineer
          </span>

          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Brandon Nance
          </h1>

          <div
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "16px",
            }}
          >
            {["TypeScript", "React", "Next.js", "Lagree Instructor"].map(
              (tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 16,
                    color: "#a3a3a3",
                    padding: "6px 16px",
                    border: "1px solid #262626",
                    borderRadius: "4px",
                  }}
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        <span
          style={{
            position: "absolute",
            bottom: 48,
            left: 80,
            fontSize: 14,
            color: "#666666",
            fontFamily: "monospace",
          }}
        >
          Los Angeles, CA
        </span>
      </div>
    ),
    { ...size }
  );
}
