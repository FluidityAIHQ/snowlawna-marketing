// Top-down "satellite" view of one suburban lot, drawn for both seasons. The same traces
// (PropertyTraces) sit over either season: measure once, quote snow and lawn.

export type Season = "winter" | "summer";

const palettes = {
  summer: {
    ground: "#17271d",
    lawnA: "#1f3a2a",
    lawnB: "#1a3224",
    hedge: "#132419",
    hedgeTop: "#1b3526",
    roof: "#34383e",
    roofLine: "#4c5158",
    roofAlt: "#2e3237",
    paving: "#3a3d42",
    seam: "#323539",
    walk: "#46494e",
    street: "#1e2023",
    streetMark: "#6b6e72",
    curb: "#2c2f33",
    deck: "#4a3a2c",
    deckLine: "#3b2e23",
    canopy: "#1f4b33",
    canopyHi: "#2b6443",
    shadow: "rgba(0,0,0,0.38)",
  },
  winter: {
    ground: "#a1b1b8",
    lawnA: "#aebdc3",
    lawnB: "#a4b4bb",
    hedge: "#98aab2",
    hedgeTop: "#c0ccd1",
    roof: "#b8c6cc",
    roofLine: "#94a6ad",
    roofAlt: "#b1c0c6",
    paving: "#25282c",
    seam: "#2f3337",
    walk: "#2d3034",
    street: "#1c1e21",
    streetMark: "#45484c",
    curb: "#9aabb3",
    deck: "#abbac0",
    deckLine: "#98a8af",
    canopy: "#1a2622",
    canopyHi: "#c6d2d7",
    shadow: "rgba(22,34,44,0.32)",
  },
} as const;

type Tree = { x: number; y: number; r: number; kind: "maple" | "spruce" };

const TREES: Tree[] = [
  { x: 92, y: 72, r: 34, kind: "maple" },
  { x: 514, y: 66, r: 40, kind: "spruce" },
  { x: 104, y: 356, r: 24, kind: "maple" },
  { x: 538, y: 362, r: 20, kind: "spruce" },
];

// Hedge shrubs along both side lot lines: [y, radius] pairs, hand-jittered so the rows look planted.
const SHRUBS: [number, number][] = [
  [10, 12], [30, 10], [49, 13], [70, 11], [90, 12], [111, 10], [130, 13], [152, 11], [173, 12], [194, 10],
  [214, 13], [236, 11], [257, 12], [278, 10], [298, 13], [320, 11], [341, 12], [362, 10], [382, 12], [402, 9],
];

const round = (value: number) => Math.round(value * 10) / 10;

/** Star outline seen from above: alternating outer and inner radii. */
function sprucePoints(x: number, y: number, r: number, spikes = 11) {
  return Array.from({ length: spikes * 2 }, (_, i) => {
    const radius = i % 2 === 0 ? r : r * 0.7;
    const angle = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    return `${round(x + Math.cos(angle) * radius)},${round(y + Math.sin(angle) * radius)}`;
  }).join(" ");
}

function BareTree({ x, y, r }: { x: number; y: number; r: number }) {
  const limbs = 7;
  return (
    <g stroke="#48443f" strokeLinecap="round">
      {Array.from({ length: limbs }, (_, i) => {
        const a = (i / limbs) * Math.PI * 2 + 0.35;
        const mid = { x: x + Math.cos(a) * r * 0.55, y: y + Math.sin(a) * r * 0.55 };
        return (
          <g key={i}>
            <line x1={x} y1={y} x2={round(x + Math.cos(a) * r)} y2={round(y + Math.sin(a) * r)} strokeWidth="2.4" />
            <line
              x1={round(mid.x)}
              y1={round(mid.y)}
              x2={round(mid.x + Math.cos(a + 0.6) * r * 0.36)}
              y2={round(mid.y + Math.sin(a + 0.6) * r * 0.36)}
              strokeWidth="1.3"
            />
            <line
              x1={round(mid.x)}
              y1={round(mid.y)}
              x2={round(mid.x + Math.cos(a - 0.55) * r * 0.3)}
              y2={round(mid.y + Math.sin(a - 0.55) * r * 0.3)}
              strokeWidth="1.3"
            />
          </g>
        );
      })}
      <circle cx={x} cy={y} r="3.5" fill="#48443f" stroke="none" />
    </g>
  );
}

export function PropertyScene({
  season,
  idPrefix,
  className,
  viewBox = "0 0 600 520",
}: {
  season: Season;
  /** Unique per instance so pattern ids don't collide when several scenes share a page. */
  idPrefix: string;
  className?: string;
  /** Crop to part of the 600×520 scene. */
  viewBox?: string;
}) {
  const c = palettes[season];
  const winter = season === "winter";
  const lawnId = `${idPrefix}-lawn-${season}`;

  return (
    <svg viewBox={viewBox} className={className} aria-hidden preserveAspectRatio="xMidYMid slice">
      <defs>
        {winter ? (
          <pattern id={lawnId} width="96" height="96" patternUnits="userSpaceOnUse">
            <rect width="96" height="96" fill={c.lawnA} />
            <ellipse cx="22" cy="30" rx="26" ry="9" fill={c.lawnB} opacity="0.7" />
            <ellipse cx="70" cy="74" rx="30" ry="8" fill={c.lawnB} opacity="0.6" />
            <ellipse cx="78" cy="18" rx="14" ry="5" fill="#b9c7cd" opacity="0.8" />
            <ellipse cx="30" cy="80" rx="12" ry="4" fill="#b9c7cd" opacity="0.7" />
          </pattern>
        ) : (
          <pattern id={lawnId} width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(-4)">
            <rect width="40" height="20" fill={c.lawnA} />
            <rect y="20" width="40" height="20" fill={c.lawnB} />
          </pattern>
        )}
      </defs>

      {/* Ground and lawns */}
      <rect width="600" height="520" fill={c.ground} />
      <rect x="26" y="16" width="548" height="398" fill={`url(#${lawnId})`} />

      {/* Hedges along the side lot lines. In winter they're soft snow mounds with a shaded side. */}
      {[14, 586].map((cx) => (
        <g key={cx}>
          {SHRUBS.map(([y, r], i) => (
            <circle key={y} cx={cx + (i % 2 ? -2 : 1) + (winter ? 2 : 0)} cy={y + (cx > 300 ? 6 : 0) + (winter ? 2 : 0)} r={r} fill={c.hedge} />
          ))}
          {SHRUBS.map(([y, r], i) => (
            <circle
              key={y}
              cx={cx + (i % 2 ? -2 : 1) - r * (winter ? 0.12 : 0.25)}
              cy={y + (cx > 300 ? 6 : 0) - r * (winter ? 0.12 : 0.3)}
              r={r * (winter ? 0.92 : 0.55)}
              fill={c.hedgeTop}
              opacity={winter ? 1 : 0.55}
            />
          ))}
        </g>
      ))}

      {/* Back fence */}
      <line x1="26" y1="16" x2="574" y2="16" stroke={winter ? "#7d8e96" : "#2f3a33"} strokeWidth="3" strokeDasharray="10 4" />

      {/* Deck */}
      <rect x="330" y="112" width="74" height="40" rx="2" fill={c.deck} />
      {!winter &&
        Array.from({ length: 6 }, (_, i) => (
          <line key={i} x1={330 + 12 * (i + 1)} y1="112" x2={330 + 12 * (i + 1)} y2="152" stroke={c.deckLine} strokeWidth="1.5" />
        ))}

      {/* House shadow, then house */}
      <path d="M160 160H380V206H476V300H160Z" fill={c.shadow} />
      <rect x="204" y="112" width="112" height="40" fill={c.roofAlt} />
      <line x1="204" y1="132" x2="316" y2="132" stroke={c.roofLine} strokeWidth="1.5" />
      <rect x="150" y="150" width="220" height="140" fill={c.roof} />
      <g stroke={c.roofLine} strokeWidth="2" strokeLinecap="round">
        <line x1="150" y1="150" x2="220" y2="220" />
        <line x1="150" y1="290" x2="220" y2="220" />
        <line x1="370" y1="150" x2="300" y2="220" />
        <line x1="370" y1="290" x2="300" y2="220" />
        <line x1="220" y1="220" x2="300" y2="220" />
      </g>
      <rect x="370" y="196" width="96" height="94" fill={c.roofAlt} />
      <line x1="418" y1="196" x2="418" y2="290" stroke={c.roofLine} strokeWidth="2" />
      <rect x="326" y="168" width="14" height="14" fill={winter ? "#3a3f45" : "#44484e"} />

      {/* Planting bed along the front */}
      {!winter && (
        <g>
          <rect x="152" y="292" width="80" height="9" rx="2" fill="#3a2e24" />
          {[160, 176, 192, 208, 224].map((x) => (
            <circle key={x} cx={x} cy="296" r="5" fill="#245a3c" />
          ))}
        </g>
      )}

      {/* Porch and walkway */}
      <rect x="234" y="290" width="34" height="16" fill={c.walk} />
      <rect x="244" y="306" width="14" height="106" fill={c.walk} />
      {winter && (
        <g fill="#5d6368">
          {[318, 334, 351, 366, 383, 398].map((y, i) => (
            <circle key={y} cx={i % 2 ? 254 : 248} cy={y} r="1.3" />
          ))}
        </g>
      )}

      {/* Driveway */}
      <rect x="382" y="290" width="74" height="154" fill={c.paving} />
      {winter ? (
        <g>
          <line x1="400" y1="296" x2="400" y2="444" stroke="#34383d" strokeWidth="6" opacity="0.8" />
          <line x1="438" y1="296" x2="438" y2="444" stroke="#34383d" strokeWidth="6" opacity="0.8" />
          <rect x="374" y="292" width="9" height="118" rx="4" fill="#c4d0d5" />
          <rect x="455" y="292" width="9" height="118" rx="4" fill="#c4d0d5" />
        </g>
      ) : (
        [320, 350, 380].map((y) => <line key={y} x1="382" y1={y} x2="456" y2={y} stroke={c.seam} strokeWidth="1.5" />)
      )}

      {/* Sidewalk, boulevard, street */}
      <rect x="0" y="412" width="600" height="20" fill={winter ? "#2a2d31" : c.walk} />
      {!winter &&
        Array.from({ length: 25 }, (_, i) => (
          <line key={i} x1={i * 24 + 12} y1="412" x2={i * 24 + 12} y2="432" stroke={c.seam} strokeWidth="1" />
        ))}
      {winter && <rect x="0" y="410" width="600" height="5" fill="#b3c1c7" />}
      <rect x="0" y="432" width="382" height="12" fill={winter ? c.lawnA : c.lawnA} />
      <rect x="456" y="432" width="144" height="12" fill={winter ? c.lawnA : c.lawnA} />
      <rect x="0" y="444" width="600" height="76" fill={c.street} />
      <rect x="0" y="444" width="600" height="3" fill={c.curb} />
      {winter ? (
        <g>
          <rect x="0" y="446" width="382" height="7" rx="3" fill="#9fb0b7" />
          <rect x="456" y="446" width="144" height="7" rx="3" fill="#9fb0b7" />
          <line x1="0" y1="468" x2="600" y2="468" stroke="#272a2e" strokeWidth="9" />
          <line x1="0" y1="500" x2="600" y2="500" stroke="#272a2e" strokeWidth="9" />
        </g>
      ) : (
        <line x1="0" y1="484" x2="600" y2="484" stroke={c.streetMark} strokeWidth="2" strokeDasharray="18 16" />
      )}

      {/* Trees */}
      {TREES.map(({ x, y, r, kind }) => (
        <g key={`${x}-${y}`}>
          {kind === "spruce" ? (
            <>
              <polygon points={sprucePoints(x + r * 0.2, y + r * 0.22, r)} fill={c.shadow} />
              <polygon points={sprucePoints(x, y, r)} fill={winter ? "#1b2a24" : "#1a4230"} />
              <polygon points={sprucePoints(x, y, r * 0.62, 9)} fill={winter ? "#c3cfd4" : "#24573d"} opacity={winter ? 0.75 : 1} />
              <circle cx={x} cy={y} r={r * 0.16} fill={winter ? "#dde6e9" : "#2e6a4a"} />
            </>
          ) : winter ? (
            <BareTree x={x} y={y} r={r} />
          ) : (
            <>
              <circle cx={x + r * 0.22} cy={y + r * 0.24} r={r} fill={c.shadow} />
              <circle cx={x} cy={y} r={r} fill={c.canopy} />
              <circle cx={x - r * 0.25} cy={y - r * 0.25} r={r * 0.55} fill={c.canopyHi} opacity="0.75" />
              <circle cx={x + r * 0.3} cy={y + r * 0.2} r={r * 0.3} fill={c.canopyHi} opacity="0.35" />
            </>
          )}
        </g>
      ))}

      {/* Property line */}
      <rect
        x="30"
        y="20"
        width="540"
        height="390"
        fill="none"
        stroke={winter ? "#3d4a50" : "#8fa39a"}
        strokeOpacity={winter ? 0.55 : 0.35}
        strokeWidth="1.5"
        strokeDasharray="3 6"
      />
    </svg>
  );
}

export const LAWN_POLYGONS = [
  "50,40 550,40 550,102 322,106 200,106 50,102",
  "50,308 226,308 234,402 50,402",
  "268,314 372,304 374,402 266,402",
];
export const SNOW_POLYGON = "382,292 456,292 456,408 382,408";
export const WALKWAY_LINE = "251,308 251,410";

const vertices = [...LAWN_POLYGONS, SNOW_POLYGON, WALKWAY_LINE].flatMap((points) =>
  points.split(" ").map((pair) => pair.split(",").map(Number) as [number, number]),
);

/** Measurement overlay: lawn areas (spruce), a snow surface and a walkway (ice). */
export function PropertyTraces({
  className,
  animate = false,
  viewBox = "0 0 600 520",
}: {
  className?: string;
  animate?: boolean;
  viewBox?: string;
}) {
  return (
    <svg viewBox={viewBox} className={className} aria-hidden preserveAspectRatio="xMidYMid slice">
      <g strokeLinejoin="round" strokeWidth="2.25">
        {LAWN_POLYGONS.map((points, i) => (
          <polygon
            key={points}
            points={points}
            fill="rgb(86 202 139 / 0.2)"
            stroke="#56ca8b"
            pathLength={1}
            className={animate ? "anim-draw" : undefined}
            style={animate ? ({ "--delay": `${500 + i * 250}ms` } as React.CSSProperties) : undefined}
          />
        ))}
        <polygon
          points={SNOW_POLYGON}
          fill="rgb(126 200 216 / 0.22)"
          stroke="#7ec8d8"
          pathLength={1}
          className={animate ? "anim-draw" : undefined}
          style={animate ? ({ "--delay": "1250ms" } as React.CSSProperties) : undefined}
        />
      </g>
      <polyline points={WALKWAY_LINE} fill="none" stroke="#7ec8d8" strokeWidth="3" strokeDasharray="5 5" strokeLinecap="round" />
      <g className={animate ? "anim-fade" : undefined} style={animate ? ({ "--delay": "1500ms" } as React.CSSProperties) : undefined}>
        {vertices.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x - 4} y={y - 4} width="8" height="8" rx="1.5" fill="#f4faf7" stroke="#0b110f" strokeWidth="1.5" />
        ))}
      </g>
    </svg>
  );
}
