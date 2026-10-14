// Top-down "satellite" view of one suburban lot, drawn for both seasons. The same traces
// (PropertyTraces) sit over either season: measure once, quote snow and lawn.

export type Season = "winter" | "summer";

const palettes = {
  summer: {
    ground: "var(--scene-summer-neighbour)",
    lawnA: "var(--scene-summer-lawn-hi)",
    lawnB: "var(--scene-summer-ground)",
    hedge: "#2d6e2b",
    hedgeTop: "var(--scene-summer-leaf-hi)",
    roof: "#35353b",
    roofLine: "#4e4e56",
    roofAlt: "#2f2f35",
    paving: "#3a3a40",
    seam: "#323238",
    walk: "#46464d",
    street: "#1e1e22",
    streetMark: "#6c6c74",
    curb: "#2c2c32",
    deck: "#4a3a2c",
    deckLine: "#3b2e23",
    canopy: "var(--scene-summer-leaf-mid)",
    canopyHi: "var(--scene-summer-leaf-hi)",
    shadow: "var(--scene-summer-shadow)",
  },
  winter: {
    ground: "var(--scene-winter-ground)",
    lawnA: "var(--scene-winter-lawn-hi)",
    lawnB: "var(--scene-winter-lawn-lo)",
    hedge: "var(--scene-winter-snow-lo)",
    hedgeTop: "var(--scene-winter-snow-hi)",
    roof: "var(--scene-winter-roof-s)",
    roofLine: "var(--scene-winter-roof-ridge)",
    roofAlt: "var(--scene-winter-roof-e)",
    paving: "var(--scene-winter-driveway)",
    seam: "#363d47",
    walk: "var(--scene-winter-walkway)",
    street: "var(--scene-winter-street)",
    streetMark: "#5c6470",
    curb: "var(--scene-winter-curb)",
    deck: "var(--scene-winter-deck)",
    deckLine: "var(--scene-winter-snow-lo)",
    canopy: "#274736",
    canopyHi: "var(--scene-winter-snow-hi)",
    shadow: "var(--scene-winter-shadow)",
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
            <ellipse cx="78" cy="18" rx="14" ry="5" fill="var(--scene-winter-drift)" opacity="0.8" />
            <ellipse cx="30" cy="80" rx="12" ry="4" fill="var(--scene-winter-drift)" opacity="0.7" />
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
      <line x1="26" y1="16" x2="574" y2="16" stroke={winter ? "#8fa4b8" : "#2f5230"} strokeWidth="3" strokeDasharray="10 4" />

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
      <rect x="326" y="168" width="14" height="14" fill={winter ? "#464b52" : "#44484e"} />

      {/* Planting bed along the front */}
      {!winter && (
        <g>
          <rect x="152" y="292" width="80" height="9" rx="2" fill="#3a2e24" />
          {[160, 176, 192, 208, 224].map((x) => (
            <circle key={x} cx={x} cy="296" r="5" fill="#3b8c36" />
          ))}
        </g>
      )}

      {/* Porch and walkway */}
      <rect x="234" y="290" width="34" height="16" fill={c.walk} />
      <rect x="244" y="306" width="14" height="106" fill={c.walk} />
      {winter && (
        <g fill="#737d8c">
          {[318, 334, 351, 366, 383, 398].map((y, i) => (
            <circle key={y} cx={i % 2 ? 254 : 248} cy={y} r="1.3" />
          ))}
        </g>
      )}

      {/* Driveway */}
      <rect x="382" y="290" width="74" height="154" fill={c.paving} />
      {winter ? (
        <g>
          <line x1="400" y1="296" x2="400" y2="444" stroke="#363d47" strokeWidth="6" opacity="0.8" />
          <line x1="438" y1="296" x2="438" y2="444" stroke="#363d47" strokeWidth="6" opacity="0.8" />
          <rect x="374" y="292" width="9" height="118" rx="4" fill="var(--scene-winter-bank)" />
          <rect x="455" y="292" width="9" height="118" rx="4" fill="var(--scene-winter-bank)" />
        </g>
      ) : (
        [320, 350, 380].map((y) => <line key={y} x1="382" y1={y} x2="456" y2={y} stroke={c.seam} strokeWidth="1.5" />)
      )}

      {/* Sidewalk, boulevard, street */}
      <rect x="0" y="412" width="600" height="20" fill={winter ? "var(--scene-winter-sidewalk)" : c.walk} />
      {!winter &&
        Array.from({ length: 25 }, (_, i) => (
          <line key={i} x1={i * 24 + 12} y1="412" x2={i * 24 + 12} y2="432" stroke={c.seam} strokeWidth="1" />
        ))}
      {winter && <rect x="0" y="410" width="600" height="5" fill="var(--scene-winter-bank-mid)" />}
      <rect x="0" y="432" width="382" height="12" fill={winter ? c.lawnA : c.lawnA} />
      <rect x="456" y="432" width="144" height="12" fill={winter ? c.lawnA : c.lawnA} />
      <rect x="0" y="444" width="600" height="76" fill={c.street} />
      <rect x="0" y="444" width="600" height="3" fill={c.curb} />
      {winter ? (
        <g>
          <rect x="0" y="446" width="382" height="7" rx="3" fill="var(--scene-winter-bank)" />
          <rect x="456" y="446" width="144" height="7" rx="3" fill="var(--scene-winter-bank)" />
          <line x1="0" y1="468" x2="600" y2="468" stroke="#1e2228" strokeWidth="9" />
          <line x1="0" y1="500" x2="600" y2="500" stroke="#1e2228" strokeWidth="9" />
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
              <polygon points={sprucePoints(x, y, r)} fill={winter ? "#234434" : "#2d6e2b"} />
              <polygon points={sprucePoints(x, y, r * 0.62, 9)} fill={winter ? "var(--scene-winter-snow-mid)" : "#4aa043"} opacity={winter ? 0.9 : 1} />
              <circle cx={x} cy={y} r={r * 0.16} fill={winter ? "var(--scene-winter-snow-hi)" : "#7ed45e"} />
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
        stroke={winter ? "#647d94" : "#d8f0d4"}
        strokeOpacity={winter ? 0.55 : 0.45}
        strokeWidth="1.5"
        strokeDasharray="3 6"
      />
    </svg>
  );
}

const SQM_PER_SQFT = 0.092903;
/** Scene scale: 10 SVG units = 1 m, so 100 SVG² = 1 m². */
const PX2_PER_SQM = 100;

export type Point = readonly [x: number, y: number];

export type TraceZone = {
  x: number;
  y: number;
  width: number;
  height: number;
  points?: readonly Point[];
  rx?: number;
  delay?: number;
  sqft: number;
};

/** Convert square feet to whole square meters (m² = ft² × 0.092903). */
export function formatSqm(sqft: number) {
  return `${Math.round(sqft * SQM_PER_SQFT)} m²`;
}

function corners(z: { x: number; y: number; width: number; height: number }): readonly Point[] {
  return [
    [z.x, z.y],
    [z.x + z.width, z.y],
    [z.x + z.width, z.y + z.height],
    [z.x, z.y + z.height],
  ] as const;
}

export function zonePoints(zone: TraceZone): readonly Point[] {
  return zone.points ?? corners(zone);
}

/** Shoelace polygon area in scene square units. */
export function polygonArea(points: readonly Point[]) {
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    sum += x1 * y2 - x2 * y1;
  }
  return Math.abs(sum) / 2;
}

function sqftFromPoints(points: readonly Point[]) {
  return Math.round(polygonArea(points) / PX2_PER_SQM / SQM_PER_SQFT);
}

function pointInPolygon([px, py]: Point, points: readonly Point[]) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i];
    const [xj, yj] = points[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

/** Visual centroid guaranteed to sit inside the polygon (even for concave U-shapes that wrap around the house). */
export function visualCentroid(points: readonly Point[]): Point {
  let signedArea2 = 0;
  let cx = 0;
  let cy = 0;
  let minX = Infinity;
  let maxX = -Infinity;

  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    const cross = x1 * y2 - x2 * y1;
    signedArea2 += cross;
    cx += (x1 + x2) * cross;
    cy += (y1 + y2) * cross;
    if (x1 < minX) minX = x1;
    if (x1 > maxX) maxX = x1;
  }

  if (signedArea2 !== 0) {
    const candidate: Point = [cx / (3 * signedArea2), cy / (3 * signedArea2)];
    if (pointInPolygon(candidate, points)) {
      return candidate;
    }
  }

  // For concave shapes where the area centroid falls outside (e.g. on the house roof),
  // intersect a vertical line at the horizontal midpoint and pick the longest interior span's center.
  const midX = (minX + maxX) / 2;
  const ys: number[] = [];
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    if (x1 === x2) continue;
    if ((x1 <= midX && midX < x2) || (x2 <= midX && midX < x1)) {
      const t = (midX - x1) / (x2 - x1);
      ys.push(y1 + t * (y2 - y1));
    }
  }
  ys.sort((a, b) => a - b);

  let bestY = (points[0][1] + points[Math.floor(points.length / 2)][1]) / 2;
  let bestSpan = -1;
  for (let i = 0; i + 1 < ys.length; i += 2) {
    const span = ys[i + 1] - ys[i];
    if (span > bestSpan) {
      bestSpan = span;
      bestY = (ys[i] + ys[i + 1]) / 2;
    }
  }
  return [midX, bestY];
}

// Single wrap-around lawn polygon covering the back yard and both side yards around the house,
// excluding the house/deck, driveway, walkway and sidewalk.
const BACK_AND_SIDE_LAWN_POINTS: readonly Point[] = [
  [46, 34],
  [554, 34],
  [554, 400],
  [474, 400],
  [474, 186],
  [412, 186],
  [412, 102],
  [196, 102],
  [196, 140],
  [140, 140],
  [140, 298],
  [46, 298],
] as const;

export const LAWN_ZONES: readonly TraceZone[] = [
  {
    x: 46,
    y: 34,
    width: 508,
    height: 366,
    points: BACK_AND_SIDE_LAWN_POINTS,
    sqft: sqftFromPoints(BACK_AND_SIDE_LAWN_POINTS),
  },
  { x: 46, y: 310, width: 180, height: 90, rx: 14, sqft: 1744 },
  { x: 270, y: 310, width: 100, height: 90, rx: 14, sqft: 969 },
] as const;

export const SNOW_ZONES = [
  { x: 384, y: 294, width: 70, height: 112, rx: 12, delay: 1150, sqft: 842 },
  { x: 243, y: 308, width: 16, height: 98, rx: 8, delay: 1300, sqft: 168 },
] as const;

/** Measurement overlay: point-traced polygons for lawn areas and snow surfaces.
 * With `seasonFade`, snow traces fade linearly to 0 in summer and lawn traces fade linearly to 0 in winter
 * (driven by the inherited --season custom property, 0–100 = share of the view in winter). */
export const SNOW_OPACITY = "calc(var(--season, 50) / 100)";
export const LAWN_OPACITY = "calc((100 - var(--season, 50)) / 100)";
export const TRACE_STROKE = "#326CCB";
export const TRACE_FILL = "rgba(50, 108, 203, 0.16)";

function Trace({
  zone,
  fill = TRACE_FILL,
  stroke = TRACE_STROKE,
  animate,
  delay,
  opacity,
}: {
  zone: TraceZone;
  fill?: string;
  stroke?: string;
  animate: boolean;
  delay: number;
  opacity?: string;
}) {
  const pts = zonePoints(zone);
  return (
    <g className="season-inherit" style={opacity ? { opacity } : undefined}>
      <polygon
        points={pts.map((p) => p.join(",")).join(" ")}
        fill={fill}
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinejoin="round"
        pathLength={1}
        className={animate ? "anim-draw" : undefined}
        style={
          {
            fill: `var(--scene-trace-fill, ${fill})`,
            stroke: `var(--scene-trace-stroke, ${stroke})`,
            ...(animate ? { "--delay": `${delay}ms` } : undefined),
          } as React.CSSProperties
        }
      />
      {pts.map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="3"
          fill={stroke}
          stroke={stroke}
          strokeWidth="1.5"
          style={{
            fill: `var(--scene-trace-stroke, ${stroke})`,
            stroke: `var(--scene-trace-stroke, ${stroke})`,
          }}
        />
      ))}
    </g>
  );
}

export function PropertyTraces({
  className,
  animate = false,
  seasonFade = false,
  viewBox = "0 0 600 520",
}: {
  className?: string;
  animate?: boolean;
  seasonFade?: boolean;
  viewBox?: string;
}) {
  return (
    <svg viewBox={viewBox} className={`season-inherit ${className ?? ""}`} aria-hidden preserveAspectRatio="xMidYMid slice">
      {LAWN_ZONES.map((zone, i) => (
        <Trace
          key={`${zone.x}-${zone.y}`}
          zone={zone}
          fill={TRACE_FILL}
          stroke={TRACE_STROKE}
          animate={animate}
          delay={500 + i * 220}
          opacity={seasonFade ? LAWN_OPACITY : undefined}
        />
      ))}
      {SNOW_ZONES.map((zone) => (
        <Trace
          key={`${zone.x}-${zone.y}`}
          zone={zone}
          fill={TRACE_FILL}
          stroke={TRACE_STROKE}
          animate={animate}
          delay={zone.delay}
          opacity={seasonFade ? SNOW_OPACITY : undefined}
        />
      ))}
    </svg>
  );
}



