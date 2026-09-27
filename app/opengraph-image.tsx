import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { markSvg, seasonSplitSvg, toDataUri } from "@/lib/og-art";

export const alt = "Snowlawna: Two seasons. One operation. Lawn and snow operations software.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [bold, medium] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Archivo-SemiExpanded-Bold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Archivo-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0e0f11",
          backgroundImage:
            "radial-gradient(circle at 80% 15%, rgba(146,198,210,0.16), transparent 45%), radial-gradient(circle at 95% 95%, rgba(108,187,145,0.12), transparent 40%)",
          padding: 72,
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 640 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={toDataUri(markSvg())} width={56} height={56} />
            <div style={{ fontSize: 34, fontWeight: 500, color: "#e6e7e8" }}>Snowlawna</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em", color: "#f3f6f7" }}>
              Two seasons<span style={{ color: "#92c6d2" }}>.</span>
            </div>
            <div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em", color: "#f3f6f7", marginTop: 8 }}>
              One operation<span style={{ color: "#6cbb91" }}>.</span>
            </div>
            <div style={{ marginTop: 30, fontSize: 30, fontWeight: 500, color: "#b4b8bc" }}>
              Lawn &amp; snow operations software
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {["Dispatch", "Maps", "Measure-to-quote", "Contracts", "Branding"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 44,
                  fontSize: 20,
                  fontWeight: 500,
                  color: "#b4b8bc",
                  border: "1.5px solid #32353a",
                  borderRadius: 999,
                  padding: "0 18px",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={toDataUri(seasonSplitSvg)} width={400} height={486} style={{ position: "absolute", right: 72, top: 72 }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: bold, weight: 700, style: "normal" },
        { name: "Archivo", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
