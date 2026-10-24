import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.product} | Permanent Source Code License`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  let logoSrc = "";
  try {
    const logoFile = await readFile(join(process.cwd(), "public/logo/dariyo-full-logo-white.png"));
    logoSrc = `data:image/png;base64,${logoFile.toString("base64")}`;
  } catch {
    // Fail soft if logo file is not reachable at build time
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "linear-gradient(135deg, #090d16 0%, #0d1527 50%, #080c16 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient background glow elements */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "80px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* Header section with Logo & Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {logoSrc ? (
            <img src={logoSrc} width={260} height={46} alt={site.name} style={{ objectFit: "contain" }} />
          ) : (
            <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.5 }}>{site.name}</div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(14, 165, 233, 0.12)",
              border: "1px solid rgba(14, 165, 233, 0.35)",
              padding: "8px 18px",
              borderRadius: "9999px",
              color: "#38bdf8",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            <span>COMMERCE SOLUTIONS</span>
          </div>
        </div>

        {/* Center: Title & Value Proposition */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "960px",
          }}
        >
          <div
            style={{
              fontSize: 54,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              background: "linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            The Commerce Engine Behind Your Next Growth Story
          </div>

          <div
            style={{
              fontSize: 24,
              color: "#94a3b8",
              lineHeight: 1.4,
              marginTop: "8px",
            }}
          >
            Storefront · B2B Wholesale Portal · Operator Admin Console · Cloud Backend
          </div>
        </div>

        {/* Bottom row: Highlights & Domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(148, 163, 184, 0.15)",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: "24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#e2e8f0",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              <span style={{ color: "#10b981" }}>✓</span> Full Source Code License
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#e2e8f0",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              <span style={{ color: "#10b981" }}>✓</span> 0% Recurring GMV Cut
            </div>
          </div>

          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#38bdf8",
              letterSpacing: -0.5,
            }}
          >
            solutions.dariyo.in
          </div>
        </div>
      </div>
    ),
    size,
  );
}
