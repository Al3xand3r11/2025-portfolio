import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/* Overrides the portfolio's mark for this segment, so the Lagree tab does not
   look like a tab of the other site. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#c1553a",
          color: "#f5f2ec",
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        L
      </div>
    ),
    { ...size }
  );
}
