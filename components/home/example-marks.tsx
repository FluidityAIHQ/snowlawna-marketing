import type { ReactNode } from "react";

// Logo marks for the fictional example companies in the branding demos. Each sits on its own rounded app-icon
// tile in the company's colours, like the Snowlawna mark (components/brand/logo.tsx), so it reads on light and dark pages.

/** One snowflake spoke with its V branch, drawn six times around the centre. */
const SPOKE = "M32 32V13M26.8 16.4 32 20.8l5.2-4.4";
const SPOKE_ANGLES = [0, 60, 120, 180, 240, 300];

/** Leaf halves split by an S-shaped vein (the river), and the stem. */
const LEAF_SUN = "M18 46C35.7 50 48.4 34.3 49 15 35.4 23.8 34.7 40.4 18 46Z";
const LEAF_SHADE = "M18 46C31.6 37.2 32.3 20.6 49 15 29.7 15.6 14 28.3 18 46Z";
const STEM = "M18 46c-2.5 2.5-4 4.2-6 6.5";

/** Stepped pine and trunk over a harbour wave with its middle crest under the trunk. */
const PINE = "M32 11 39.5 24H37l6 8.5h-3.2l7.2 7H17l7.2-7H21l6-8.5h-2.5ZM29.75 39h4.5v4.5h-4.5Z";
const WAVE = "M14 49.5q3.6-3.4 7.2 0t7.2 0 7.2 0 7.2 0 7.2 0";

type MarkProps = { className?: string; title?: string };

function MarkTile({ className, title, fill, stroke, children }: MarkProps & { fill: string; stroke: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
    >
      <rect x=".75" y=".75" width="62.5" height="62.5" rx="15.25" fill={fill} stroke={stroke} strokeWidth="1.5" />
      {children}
    </svg>
  );
}

/** Northline Snow Co.: an amber snowflake on warm charcoal. */
export function NorthlineMark(props: MarkProps) {
  return (
    <MarkTile {...props} fill="#211e19" stroke="#3a3329">
      <g stroke="#f2a33a" strokeWidth="4.6" strokeLinecap="round">
        {SPOKE_ANGLES.map((angle) => (
          <path key={angle} d={SPOKE} transform={`rotate(${angle} 32 32)`} />
        ))}
      </g>
    </MarkTile>
  );
}

/** Rideau Greenworks: a two-tone leaf whose vein winds like the Rideau, on deep green. */
export function GreenworksMark(props: MarkProps) {
  return (
    <MarkTile {...props} fill="#18241b" stroke="#2c3f30">
      <path fill="#6cd488" d={LEAF_SUN} />
      <path fill="#2f9a55" d={LEAF_SHADE} />
      <path d={STEM} stroke="#6cd488" strokeWidth="3.6" strokeLinecap="round" />
    </MarkTile>
  );
}

/** Harbour & Pine: a cream pine over a terracotta harbour wave, on dark walnut. */
export function HarbourMark(props: MarkProps) {
  return (
    <MarkTile {...props} fill="#221f1c" stroke="#3a342d">
      <path fill="#ebdfca" d={PINE} />
      <path d={WAVE} stroke="#df8a62" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
    </MarkTile>
  );
}
