import type { Season } from "@/components/illustrations/property-scene";

// The PropertyScene lot drawn as dimmed aerial imagery for the hero's season comparison. The footprint
// matches PropertyScene so PropertyTraces lines up, and both seasons share one low sun from the top left,
// so the two halves read as one place photographed twice rather than as two drawings.

/** Seeded PRNG (mulberry32) so the generated foliage is identical on every render. */
function random(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (value: number) => Math.round(value * 10) / 10;

type Disc = [x: number, y: number, r: number];
type Tree = { x: number; y: number; r: number; seed: number };

const MAPLES: Tree[] = [
  { x: 92, y: 72, r: 34, seed: 3 },
  { x: 104, y: 356, r: 24, seed: 8 },
];
const SPRUCES: Tree[] = [
  { x: 514, y: 66, r: 40, seed: 5 },
  { x: 538, y: 362, r: 20, seed: 13 },
];

/** A broadleaf crown from above: lobes around a central dome, each shaded like a lit sphere. */
function crownLobes({ x, y, r, seed }: Tree): Disc[] {
  const rand = random(seed);
  const lobes: Disc[] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + rand() * 0.6;
    const distance = r * (0.4 + rand() * 0.14);
    lobes.push([round(x + Math.cos(angle) * distance), round(y + Math.sin(angle) * distance), round(r * (0.4 + rand() * 0.14))]);
  }
  lobes.push([round(x - r * 0.06), round(y - r * 0.08), round(r * 0.52)]);
  return lobes;
}

/** Bare branches from above, as three paths (limbs, branches, twigs) so each tree stays light in the DOM. */
function bareBranches({ x, y, r, seed }: Tree) {
  const rand = random(seed);
  const paths = ["", "", ""];
  const grow = (x0: number, y0: number, angle: number, length: number, depth: number) => {
    const x1 = x0 + Math.cos(angle) * length;
    const y1 = y0 + Math.sin(angle) * length;
    const bend = (rand() - 0.5) * length * 0.35;
    const cx = (x0 + x1) / 2 - Math.sin(angle) * bend;
    const cy = (y0 + y1) / 2 + Math.cos(angle) * bend;
    paths[depth] += `M${round(x0)} ${round(y0)}Q${round(cx)} ${round(cy)} ${round(x1)} ${round(y1)}`;
    if (depth === 2) return;
    const forks = depth === 0 ? 3 : 2;
    for (let i = 0; i < forks; i++) {
      const along = 0.3 + (i / forks) * 0.5 + rand() * 0.12;
      const side = i % 2 === 0 ? -1 : 1;
      grow(
        x0 + (x1 - x0) * along,
        y0 + (y1 - y0) * along,
        angle + side * (0.35 + rand() * 0.4),
        (r - Math.hypot(x0 + (x1 - x0) * along - x, y0 + (y1 - y0) * along - y)) * (0.55 + rand() * 0.4),
        depth + 1,
      );
    }
  };
  for (let i = 0; i < 10; i++) {
    grow(x, y, (i / 10) * Math.PI * 2 + (rand() - 0.5) * 0.45, r * (0.55 + rand() * 0.25), 0);
  }
  return paths;
}

/** A conifer from above: overlapping branch sprays radiating from the leader, as one path. */
function coniferSprays(x: number, y: number, r: number, seed: number, count: number) {
  const rand = random(seed);
  const at = (angle: number, distance: number) => `${round(x + Math.cos(angle) * distance)} ${round(y + Math.sin(angle) * distance)}`;
  let d = "";
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (rand() - 0.5) * 0.3;
    const length = r * (0.84 + rand() * 0.16);
    const width = (Math.PI / count) * (2.2 + rand() * 0.6);
    d += `M${at(angle, r * 0.05)}L${at(angle - width, length * 0.62)}L${at(angle, length)}L${at(angle + width, length * 0.62)}Z`;
  }
  return d;
}

/** Shrubs planted along a side lot line. */
function hedgeLobes(x: number, seed: number): Disc[] {
  const rand = random(seed);
  const lobes: Disc[] = [];
  for (let y = -10; y < 416; y += 12 + rand() * 5) {
    lobes.push([round(x + (rand() - 0.5) * 7), round(y), round(10 + rand() * 5)]);
  }
  return lobes;
}

const CROWNS = MAPLES.map(crownLobes);
const BRANCHES = MAPLES.map(bareBranches);
// Each conifer has a lower and an upper tier of sprays, the upper one nudged toward the light.
const CONIFERS = SPRUCES.map(({ x, y, r, seed }) => [
  coniferSprays(x, y, r, seed, 20),
  coniferSprays(x - r * 0.05, y - r * 0.06, r * 0.64, seed + 1, 14),
]);
const HEDGES = [hedgeLobes(8, 17), hedgeLobes(593, 41)];

// House: a hip-roofed main block, a gabled rear addition and a gabled garage (PropertyScene's footprint).
const ROOF_OUTLINE = "M204 112H316V150H370V196H466V290H150V150H204Z";
const MAIN_ROOF = {
  north: "M150 150H370L300 220H220Z",
  west: "M150 150 220 220 150 290Z",
  south: "M150 290H370L300 220H220Z",
  east: "M370 150 300 220 370 290Z",
};
const RIDGES = "M150 150 220 220H300L370 150M150 290 220 220M300 220 370 290M204 132H316M418 196V290";

const SIDEWALK_JOINTS = Array.from({ length: 25 }, (_, i) => `M${i * 24 + 12} 412V432`).join("");
const DRIVEWAY_JOINTS = "M382 322H456M382 354H456M382 386H456M382 412H456M419 290V444";
const WALKWAY_JOINTS = "M244 318H258M244 330H258M244 342H258M244 354H258M244 366H258M244 378H258M244 390H258M244 402H258";
const DECK_BOARDS = Array.from({ length: 7 }, (_, i) => `M330 ${117 + i * 5}H404`).join("");
const BED_SHRUBS = [160, 176, 192, 208, 224];

const palettes = {
  summer: {
    ground: "var(--scene-summer-ground)",
    stripeHi: "var(--scene-summer-lawn-hi)",
    stripeLo: "var(--scene-summer-ground)",
    neighbour: "var(--scene-summer-neighbour)",
    street: "#1c1c1f",
    streetMark: "#57575c",
    curb: "#3c3c40",
    sidewalk: "#353539",
    driveway: "#3b3b40",
    porch: "#46464b",
    walkway: "#414146",
    joint: "rgb(0 0 0 / 0.22)",
    deck: "#4a3b2f",
    deckJoint: "rgb(0 0 0 / 0.26)",
    bed: "#332920",
    fence: "#2f2c27",
    fencePost: "#3a362f",
    chimney: "#4a3c35",
    vent: "#202024",
    roofStroke: "rgb(0 0 0 / 0.4)",
    shadow: "var(--scene-summer-shadow)",
    roof: { north: "#45454a", west: "#3d3d42", south: "#303035", east: "#2a2a2e", ridge: "#57575e" },
    leaf: ["var(--scene-summer-leaf-hi)", "var(--scene-summer-leaf-mid)", "var(--scene-summer-leaf-lo)"],
    hedgeBase: "var(--scene-summer-hedge-base)",
    needles: {
      low: ["#43893f", "#2d642b", "#1c441b"],
      high: ["#68b85b", "#41863d", "#295a27"],
      seam: "rgb(12 36 14 / 0.32)",
      apex: "#82d173",
    },
  },
  winter: {
    ground: "var(--scene-winter-ground)",
    stripeHi: "var(--scene-winter-ground)",
    stripeLo: "var(--scene-winter-ground)",
    neighbour: "var(--scene-winter-neighbour)",
    street: "var(--scene-winter-street)",
    streetMark: "#646c78",
    curb: "var(--scene-winter-curb)",
    sidewalk: "var(--scene-winter-sidewalk)",
    driveway: "var(--scene-winter-driveway)",
    porch: "var(--scene-winter-porch)",
    walkway: "var(--scene-winter-walkway)",
    joint: "rgb(15 23 34 / 0.24)",
    deck: "var(--scene-winter-deck)",
    deckJoint: "rgb(110 138 166 / 0.24)",
    bed: "var(--scene-winter-bed)",
    fence: "#4a5562",
    fencePost: "#3b4450",
    chimney: "#464b52",
    vent: "#64707d",
    roofStroke: "var(--scene-winter-roof-stroke)",
    shadow: "var(--scene-winter-shadow)",
    roof: {
      north: "var(--scene-winter-roof-n)",
      west: "var(--scene-winter-roof-w)",
      south: "var(--scene-winter-roof-s)",
      east: "var(--scene-winter-roof-e)",
      ridge: "var(--scene-winter-roof-ridge)",
    },
    leaf: ["var(--scene-winter-snow-hi)", "var(--scene-winter-snow-mid)", "var(--scene-winter-snow-lo)"],
    hedgeBase: "var(--scene-winter-hedge-base)",
    needles: {
      low: ["#2d5440", "#1e3d2d", "#14291e"],
      high: ["var(--scene-winter-snow-hi)", "var(--scene-winter-snow-mid)", "var(--scene-winter-snow-lo)"],
      seam: "rgb(35 55 75 / 0.26)",
      apex: "var(--scene-winter-snow-hi)",
    },
  },
} as const;

export function PropertyAerial({
  season,
  idPrefix,
  className,
}: {
  season: Season;
  /** Unique per instance so filter and gradient ids don't collide. */
  idPrefix: string;
  className?: string;
}) {
  const winter = season === "winter";
  const c = palettes[season];
  const id = (name: string) => `${idPrefix}-aerial-${season}-${name}`;
  const url = (name: string) => `url(#${id(name)})`;

  return (
    <svg viewBox="0 0 600 520" className={className} aria-hidden preserveAspectRatio="xMidYMid slice">
      <defs>
        {/* Fine sensor grain. Same seed in both seasons, so it runs on across the divider. */}
        <filter id={id("grain")} x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} seed={9} />
          <feColorMatrix values="1.4 0 0 0 -0.2 1.4 0 0 0 -0.2 1.4 0 0 0 -0.2 0 0 0 0 1" />
        </filter>
        {/* Broad ground variation: uneven turf in summer, wind-blown drifts in winter. */}
        <filter id={id("texture")} x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency={winter ? "0.004 0.014" : "0.012 0.02"} numOctaves={3} seed={4} />
          <feColorMatrix values="1.7 0 0 0 -0.35 1.7 0 0 0 -0.35 1.7 0 0 0 -0.35 0 0 0 0 1" />
        </filter>
        {/* Foliage: ragged edge plus fine leaf texture inside the shape. */}
        <filter id={id("foliage")} x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves={2} seed={2} result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale={5} xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.32" numOctaves={2} seed={12} />
          <feColorMatrix values="1.1 0 0 0 -0.05 1.1 0 0 0 -0.05 1.1 0 0 0 -0.05 0 0 0 0 1" />
          <feBlend in2="shape" mode="soft-light" />
          <feComposite in2="shape" operator="in" />
        </filter>
        <filter id={id("shadow")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={4} />
        </filter>
        <filter id={id("soften")} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation={0.8} />
        </filter>

        {/* Each shrub or crown lobe shaded like a lit sphere; snow-capped in winter. */}
        <radialGradient id={id("leaf")} cx="0.38" cy="0.34" r="0.72">
          <stop offset="0" stopColor={c.leaf[0]} />
          <stop offset="0.6" stopColor={c.leaf[1]} />
          <stop offset="1" stopColor={c.leaf[2]} />
        </radialGradient>
        {(["low", "high"] as const).map((tier) => (
          <radialGradient key={tier} id={id(`needles-${tier}`)} cx="0.44" cy="0.42" r="0.62">
            <stop offset="0" stopColor={c.needles[tier][0]} />
            <stop offset="0.55" stopColor={c.needles[tier][1]} />
            <stop offset="1" stopColor={c.needles[tier][2]} />
          </radialGradient>
        ))}

        {winter ? (
          <radialGradient id={id("crown-haze")}>
            <stop offset="0" stopColor="var(--scene-winter-haze)" stopOpacity="0.22" />
            <stop offset="1" stopColor="var(--scene-winter-haze)" stopOpacity="0" />
          </radialGradient>
        ) : (
          <>
            {/* Mowing stripes */}
            <linearGradient id={id("stripes")} x1="0" y1="0" x2="0" y2="46" gradientUnits="userSpaceOnUse" spreadMethod="repeat">
              <stop offset="0" stopColor={c.stripeHi} />
              <stop offset="0.44" stopColor={c.stripeHi} />
              <stop offset="0.5" stopColor={c.stripeLo} />
              <stop offset="0.94" stopColor={c.stripeLo} />
              <stop offset="1" stopColor={c.stripeHi} />
            </linearGradient>
            {/* Shingle courses run parallel to each roof plane's eave. */}
            <pattern id={id("courses-h")} width="8" height="4" patternUnits="userSpaceOnUse">
              <path d="M0 3.5H8" stroke="rgb(0 0 0 / 0.2)" strokeWidth="0.7" />
            </pattern>
            <pattern id={id("courses-v")} width="4" height="8" patternUnits="userSpaceOnUse">
              <path d="M3.5 0V8" stroke="rgb(0 0 0 / 0.2)" strokeWidth="0.7" />
            </pattern>
          </>
        )}
      </defs>

      {/* Ground: lawn or snow, with the neighbour's yard beyond the back fence */}
      <rect width="600" height="520" fill={c.ground} />
      {!winter && <rect y="16" width="600" height="428" fill={url("stripes")} />}
      <rect width="600" height="444" fill="#808080" filter={url("texture")} opacity={winter ? 0.5 : 0.3} style={{ mixBlendMode: "soft-light" }} />
      <rect width="600" height="16" fill={c.neighbour} />

      {/* Street, sidewalk and boulevard: identical geometry in both seasons */}
      <g>
        <rect y="444" width="600" height="76" fill={c.street} />
        <path d="M0 483H600" stroke={c.streetMark} strokeWidth="2" strokeDasharray="20 18" opacity="0.8" />
        <path d="M0 445.5H600" stroke={c.curb} strokeWidth="3" />
        <rect y="412" width="600" height="20" fill={c.sidewalk} />
        <path d={SIDEWALK_JOINTS} stroke={c.joint} strokeWidth="1" />
      </g>

      {/* Driveway, porch and walkway: identical geometry in both seasons */}
      <g>
        <rect x="382" y="290" width="74" height="154" fill={c.driveway} />
        <path d={DRIVEWAY_JOINTS} stroke={c.joint} strokeWidth="1.2" />
        <rect x="234" y="290" width="34" height="16" fill={c.porch} />
        <rect x="244" y="306" width="14" height="106" fill={c.walkway} />
        <path d={WALKWAY_JOINTS} stroke={c.joint} strokeWidth="1" />
      </g>

      {/* Deck */}
      <g>
        <rect x="330" y="112" width="74" height="40" fill={c.deck} />
        <path d={DECK_BOARDS} stroke={c.deckJoint} strokeWidth="0.8" />
      </g>

      {/* Shadows, all cast toward the bottom right */}
      <g fill={c.shadow} filter={url("shadow")}>
        <path d={ROOF_OUTLINE} transform="translate(9 11)" />
        <rect x="333" y="115" width="74" height="40" opacity={0.6} />
        {!winter && MAPLES.map(({ x, y, r }) => <circle key={x} cx={x + r * 0.3} cy={y + r * 0.36} r={r * 0.96} />)}
        {SPRUCES.map(({ x, r }, i) => (
          <path key={x} d={CONIFERS[i][0]} transform={`translate(${round(r * 0.32)} ${round(r * 0.38)})`} />
        ))}
        <rect x="10" y="-10" width="18" height="424" rx="9" transform="translate(6 6)" />
        <path d="M26 16H574" stroke={c.shadow} strokeWidth="4" transform="translate(2 4)" />
      </g>

      {/* House */}
      <g>
        <path d="M204 112H316V132H204Z" fill={c.roof.north} />
        <path d="M204 132H316V152H204Z" fill={c.roof.south} />
        <path d="M370 196H418V290H370Z" fill={c.roof.west} />
        <path d="M418 196H466V290H418Z" fill={c.roof.east} />
        <path d={MAIN_ROOF.north} fill={c.roof.north} />
        <path d={MAIN_ROOF.west} fill={c.roof.west} />
        <path d={MAIN_ROOF.south} fill={c.roof.south} />
        <path d={MAIN_ROOF.east} fill={c.roof.east} />
        {!winter && (
          <g>
            <path d={`M204 112H316V152H204Z${MAIN_ROOF.north}${MAIN_ROOF.south}`} fill={url("courses-h")} />
            <path d={`M370 196H466V290H370Z${MAIN_ROOF.west}${MAIN_ROOF.east}`} fill={url("courses-v")} />
          </g>
        )}
        <path d={RIDGES} fill="none" stroke={c.roof.ridge} strokeWidth="1.4" strokeLinecap="round" opacity={winter ? 0.7 : 0.8} />
        <path d={ROOF_OUTLINE} fill="none" stroke={c.roofStroke} strokeWidth="1.2" />
        {/* Chimney (snow melts off it) and two roof vents */}
        <rect x="330" y="172" width="14" height="14" fill={c.shadow} filter={url("soften")} />
        <rect x="326" y="168" width="14" height="14" rx="1" fill={c.chimney} />
        <rect x="329.5" y="171.5" width="7" height="7" rx="0.5" fill="#141211" />
        <g fill={c.vent}>
          <circle cx="246" cy="262" r="2.6" />
          <circle cx="334" cy="258" r="2.6" />
        </g>
      </g>

      {/* Planting bed along the front of the house */}
      <g>
        <rect x="152" y="292" width="80" height="9" rx="2" fill={c.bed} />
        <g fill={url("leaf")} filter={url("foliage")}>
          {BED_SHRUBS.map((x) => (
            <circle key={x} cx={x} cy="296" r="5.5" />
          ))}
        </g>
      </g>

      {/* Back fence: posts every few metres */}
      <path d="M26 16H574" stroke={c.fence} strokeWidth="2.5" />
      <g fill={c.fencePost}>
        {Array.from({ length: 17 }, (_, i) => (
          <rect key={i} x={26 + i * 34 - 2} y="14" width="4" height="4" />
        ))}
      </g>

      {/* Hedges along the side lot lines: dark foliage, shrub tops lit (or snow-capped) above it */}
      <g filter={url("foliage")}>
        <path d="M-10 -10H20V414H-10ZM582 -10H610V414H582Z" fill={c.hedgeBase} />
        <g fill={url("leaf")}>
          {HEDGES.flat().map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
          ))}
        </g>
      </g>

      {/* Broadleaf trees: full crowns in summer, bare branches over their own shadows in winter */}
      {winter ? (
        MAPLES.map((tree, i) => {
          const [limbs, branches, twigs] = BRANCHES[i];
          return (
            <g key={tree.x} fill="none" strokeLinecap="round">
              <g stroke={c.shadow} transform="translate(10 12)" filter={url("soften")}>
                <path d={limbs} strokeWidth="2.4" />
                <path d={branches} strokeWidth="1.3" />
                <path d={twigs} strokeWidth="0.8" />
              </g>
              <circle cx={tree.x} cy={tree.y} r={tree.r} fill={url("crown-haze")} />
              <g stroke="#3e3e44">
                <path d={limbs} strokeWidth="1.8" opacity="0.9" />
                <path d={branches} strokeWidth="1" opacity="0.8" />
                <path d={twigs} strokeWidth="0.55" opacity="0.65" />
              </g>
              <circle cx={tree.x} cy={tree.y} r="2.6" fill="#2e2e33" />
            </g>
          );
        })
      ) : (
        <g fill={url("leaf")} filter={url("foliage")}>
          {CROWNS.flat().map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
          ))}
        </g>
      )}

      {/* Spruces: dark lower sprays, upper sprays lit (and heavy with snow in winter) */}
      <g filter={url("foliage")} stroke={c.needles.seam} strokeLinejoin="round">
        {CONIFERS.map(([lower, upper], i) => {
          const { x, y, r } = SPRUCES[i];
          return (
            <g key={x}>
              <path d={lower} fill={url("needles-low")} strokeWidth="0.6" />
              <path d={upper} fill={url("needles-high")} strokeWidth="0.5" />
              <circle cx={round(x - r * 0.08)} cy={round(y - r * 0.1)} r={round(r * 0.1)} fill={c.needles.apex} stroke="none" />
            </g>
          );
        })}
      </g>

      {/* Grain */}
      <rect width="600" height="520" fill="#808080" filter={url("grain")} opacity="0.12" style={{ mixBlendMode: "overlay" }} />
    </svg>
  );
}
