import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Nova — AI Agent Ops Framework for Claude Code";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 40%, #0a1a3e 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Nova logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
              color: "white",
            }}
          >
            N
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "white",
              letterSpacing: "0",
              display: "flex",
            }}
          >
            Nova
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: "rgba(240, 240, 255, 0.9)",
            marginBottom: 16,
            display: "flex",
          }}
        >
          AI Agent Ops Framework
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 20,
            color: "rgba(240, 240, 255, 0.6)",
            maxWidth: 780,
            textAlign: "center",
            lineHeight: 1.5,
            display: "flex",
          }}
        >
          Claude Code operations for context, instructions, verification, collaboration, and evolution
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 16,
            color: "rgba(240, 240, 255, 0.4)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22c55e",
              display: "flex",
            }}
          />
          Claude Code Plugin
        </div>
      </div>
    ),
    { ...size },
  );
}
