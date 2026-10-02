import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #17365d 0%, #244d7c 35%, #d9c89a 100%)",
        fontFamily: "system-ui, sans-serif",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "48px 72px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 2,
            textTransform: "uppercase",
            opacity: 0.9,
            marginBottom: 18,
          }}
        >
          Sacrament Meeting Planner
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Plan, review, and share meeting details.
        </div>
        <div
          style={{
            fontSize: 26,
            marginTop: 20,
            opacity: 0.9,
          }}
        >
          Speakers • hymns • announcements • ward business
        </div>
      </div>
    </div>,
  );
}
