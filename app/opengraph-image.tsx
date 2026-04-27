import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          backgroundColor: "#0a0a0a",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* 배경 그라디언트 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 10% 120%, rgba(255,255,255,0.06) 0%, transparent 60%)",
          }}
        />

        {/* 상단 레이블 */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 80,
            display: "flex",
            gap: 24,
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 13,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Portfolio
          </span>
          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 13 }}>
            ·
          </span>
          <span
            style={{
              fontSize: 13,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Web Publisher
          </span>
        </div>

        {/* 메인 텍스트 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
          <h1
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            홍성필
          </h1>
          <p
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.45)",
              margin: 0,
              letterSpacing: "0.02em",
              lineHeight: 1.5,
            }}
          >
            책임감 · 효율적인 · 능동적인
          </p>
        </div>

        {/* 우측 하단 URL */}
        <span
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 14,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.15em",
          }}
        >
          {siteConfig.url.replace("https://", "")}
        </span>
      </div>
    ),
    { ...size }
  );
}
