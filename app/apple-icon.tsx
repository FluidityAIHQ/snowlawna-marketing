import { ImageResponse } from "next/og";
import { markSvg, toDataUri } from "@/lib/og-art";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS rounds the corners itself, so the tile fills the whole square here.
export default function AppleIcon() {
  return new ImageResponse(
    (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img src={toDataUri(markSvg("#1c1c1c", "#1c1c1c", false))} width={180} height={180} />
    ),
    size,
  );
}
