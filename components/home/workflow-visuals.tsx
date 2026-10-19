import { Check, Navigation, Send, ShieldCheck, Snowflake, Sprout, Truck } from "lucide-react";
import { sampleQuote } from "@/lib/sample-quote";

/**
 * Scoped CSS tokens & animations for the 5-step workflow section.
 * Every keyframe and transition sits behind `@media (prefers-reduced-motion: no-preference)`
 * so reduced-motion visitors see the finished static visuals with zero movement, and
 * animated states settle cleanly into the exact same final state.
 */
export function WorkflowStyles() {
  return (
    <style>{`
      :root,
      :root[data-theme="light"] {
        --wf-cyan-ink: #007a90;
        --wf-cyan-badge-bg: rgba(0, 180, 216, 0.12);
        --wf-cyan-badge-ring: rgba(0, 140, 170, 0.32);
        --wf-map-road: #ffffff;
        --wf-map-road-edge: #d8d8e0;
      }
      :root[data-theme="dark"] {
        --wf-cyan-ink: #00E5FF;
        --wf-cyan-badge-bg: rgba(0, 229, 255, 0.14);
        --wf-cyan-badge-ring: rgba(0, 229, 255, 0.35);
        --wf-map-road: #2a2a33;
        --wf-map-road-edge: #1e1e25;
      }

      .wf-progress-dot, .wf-dollar {
        opacity: 0;
      }
      @keyframes wf-progress-x {
        0% { left: 0%; opacity: 0; }
        1%, 24% { opacity: 1; }
        25%, 100% { left: 100%; opacity: 0; }
      }
      @keyframes wf-progress-y {
        0% { top: 0%; opacity: 0; }
        1%, 24% { opacity: 1; }
        25%, 100% { top: 100%; opacity: 0; }
      }
      @keyframes wf-contract-dollars {
        0% {
          opacity: 0;
          transform: translate(calc(-50% + var(--dollar-x)), 5px) scale(0.7);
        }
        4% { opacity: 0.9; }
        18%, 100% {
          opacity: 0;
          transform: translate(calc(-50% + var(--dollar-x)), -70px) scale(1.1);
        }
      }
      @keyframes wf-pin-drop {
        0% {
          transform: translateY(-8px);
        }
        60% {
          transform: translateY(0);
        }
        78% {
          transform: translateY(-2.5px);
        }
        100% {
          transform: translateY(0);
        }
      }
      @keyframes wf-pin-shadow {
        0% {
          transform: scale(0.65);
          opacity: 0.22;
        }
        60%, 100% {
          transform: scale(1);
          opacity: 0.45;
        }
        78% {
          transform: scale(0.85);
          opacity: 0.34;
        }
      }
      @keyframes wf-radar {
        0% {
          transform: scale(0.55);
          opacity: 0.75;
        }
        75% {
          transform: scale(2.1);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 0.35;
        }
      }
      @keyframes wf-trace-draw {
        0% {
          stroke-dashoffset: 1;
        }
        100% {
          stroke-dashoffset: 0;
        }
      }
      @keyframes wf-vertex-pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.25);
        }
      }
      @keyframes wf-send-float {
        0%, 100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(1.5px, -1.5px);
        }
      }
      @keyframes wf-sig-draw {
        0% {
          stroke-dashoffset: 1;
        }
        100% {
          stroke-dashoffset: 0;
        }
      }
      @keyframes wf-seal-pulse {
        0% {
          transform: scale(0.82);
        }
        65% {
          transform: scale(1.08);
        }
        100% {
          transform: scale(1);
        }
      }
      @keyframes wf-route-flow {
        to {
          stroke-dashoffset: -32;
        }
      }
      @keyframes wf-truck-run {
        0% {
          transform: translate(-110px, -52px);
        }
        38% {
          transform: translate(-38px, -52px);
        }
        70% {
          transform: translate(-38px, 0px);
        }
        100% {
          transform: translate(0px, 0px);
        }
      }
      @keyframes wf-icon-bob {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-2px);
        }
      }

      @media (prefers-reduced-motion: no-preference) {
        /* Four equal-duration segments make arrival timing independent of card height. */
        .wf-progress-dot {
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: wf-progress-y 6s linear infinite;
          animation-play-state: paused;
        }
        .wf-dollar {
          animation: wf-contract-dollars 6s ease-out infinite;
          animation-play-state: paused;
        }
        .wf-flow[data-revealed] .wf-progress-dot,
        .wf-flow[data-revealed] .wf-dollar {
          animation-play-state: running;
        }
        @media (min-width: 64rem) {
          .wf-progress-dot {
            top: 50%;
            left: 0;
            animation-name: wf-progress-x;
          }
        }
        .wf-pin-drop {
          transform-box: fill-box;
          transform-origin: center bottom;
          animation: wf-pin-drop 1.4s var(--ease-out-quint) both;
        }
        .wf-pin-shadow {
          transform-box: fill-box;
          transform-origin: center;
          animation: wf-pin-shadow 1.4s var(--ease-out-quint) both;
        }
        .wf-radar-1 {
          transform-box: fill-box;
          transform-origin: center;
          animation: wf-radar 2.8s var(--ease-out-quint) infinite;
        }
        .wf-radar-2 {
          transform-box: fill-box;
          transform-origin: center;
          animation: wf-radar 2.8s var(--ease-out-quint) 1.4s infinite;
        }
        .wf-trace-poly {
          stroke-dasharray: 1;
          animation: wf-trace-draw 1.8s var(--ease-in-out-quart) both;
        }
        .wf-trace-drive {
          stroke-dasharray: 1;
          animation: wf-trace-draw 1.8s var(--ease-in-out-quart) 0.25s both;
        }
        .wf-vertex-dot {
          transform-box: fill-box;
          transform-origin: center;
          animation: wf-vertex-pulse 2.6s ease-in-out infinite;
        }
        .wf-send-icon {
          animation: wf-send-float 2.8s ease-in-out infinite;
        }
        .wf-sig-path {
          stroke-dasharray: 1;
          animation: wf-sig-draw 1.8s var(--ease-in-out-quart) both;
        }
        .wf-seal-pop {
          animation: wf-seal-pulse 1.6s var(--ease-out-quint) both;
        }
        .wf-route-dash {
          animation: wf-route-flow 1.8s linear infinite;
        }
        .wf-truck-mover {
          animation: wf-truck-run 2.2s var(--ease-in-out-quart) both;
        }
        .wf-step-icon {
          animation: wf-icon-bob 3.4s ease-in-out infinite;
          animation-delay: var(--icon-delay, 0ms);
        }
      }
    `}</style>
  );
}

/** Stop 01 preview: dual-season mini satellite map with address search bar and centered pin on the house roof. */
export function FindPropertyPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden select-none">
      <svg viewBox="0 0 240 160" className="size-full" aria-hidden preserveAspectRatio="xMidYMid meet">
        <defs>
          <clipPath id="wf-s1-summer">
            <rect x="120" y="-30" width="180" height="156" />
          </clipPath>
          <pattern id="wf-s1-stripes" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(-6)">
            <rect width="16" height="8" fill="var(--scene-summer-lawn-hi)" />
            <rect y="8" width="16" height="8" fill="var(--scene-summer-ground)" />
          </pattern>
        </defs>

        {/* Winter ground base (left side, bleeding beyond viewBox so aspect ratios never letterbox) */}
        <rect x="-60" y="-30" width="360" height="220" fill="var(--scene-winter-ground)" />
        <rect x="14" y="42" width="50" height="80" rx="3" fill="var(--scene-winter-lawn-lo)" />
        <rect x="72" y="42" width="96" height="80" rx="3" fill="var(--scene-winter-lawn-lo)" />
        <ellipse cx="38" cy="54" rx="16" ry="5" fill="var(--scene-winter-drift)" opacity="0.85" />
        <ellipse cx="42" cy="108" rx="14" ry="4.5" fill="var(--scene-winter-drift)" opacity="0.7" />

        {/* Left neighbour house (winter) */}
        <rect
          x="22"
          y="64"
          width="34"
          height="28"
          rx="2"
          fill="var(--scene-winter-roof-s)"
          stroke="var(--scene-winter-roof-ridge)"
          strokeWidth="1"
        />

        {/* Summer clipped right half (strictly above sidewalk, no diagonal line into road) */}
        <g clipPath="url(#wf-s1-summer)">
          <rect x="120" y="-30" width="180" height="156" fill="var(--scene-summer-neighbour)" />
          <rect x="72" y="42" width="96" height="80" rx="3" fill="url(#wf-s1-stripes)" />
          <rect x="176" y="42" width="50" height="80" rx="3" fill="var(--scene-summer-ground)" opacity="0.55" />
          <rect x="184" y="64" width="34" height="28" rx="2" fill="#35353b" stroke="#4e4e56" strokeWidth="1" />
          <circle cx="156" cy="52" r="8" fill="var(--scene-summer-leaf-mid)" />
          <circle cx="154" cy="50" r="4.5" fill="var(--scene-summer-leaf-hi)" opacity="0.8" />
          <circle cx="204" cy="108" r="7.5" fill="var(--scene-summer-leaf-mid)" />
        </g>

        {/* Target property lot boundary — aligned with the target lot (x=72..168, y=42..122) */}
        <rect
          x="72"
          y="42"
          width="96"
          height="80"
          rx="3"
          fill="none"
          stroke="var(--scene-trace-stroke)"
          strokeOpacity="0.85"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Target walkway & driveway */}
        <rect x="116" y="96" width="8" height="28" fill="var(--scene-winter-walkway)" />
        <rect x="130" y="96" width="16" height="34" fill="var(--scene-winter-driveway)" />

        {/* Sidewalk and street along the bottom */}
        <rect x="-60" y="124" width="360" height="6" fill="var(--scene-winter-sidewalk)" />
        <rect x="-60" y="130" width="360" height="60" fill="var(--scene-winter-street)" />
        <line x1="-60" y1="145" x2="300" y2="145" stroke="#5c6470" strokeWidth="1.5" strokeDasharray="8 8" />

        {/* Target house centered in lot at (120, 78) */}
        <rect x="92" y="60" width="56" height="36" rx="2" fill="#35353b" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="92" y1="60" x2="106" y2="78" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="92" y1="96" x2="106" y2="78" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="148" y1="60" x2="134" y2="78" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="148" y1="96" x2="134" y2="78" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="106" y1="78" x2="134" y2="78" stroke="#4e4e56" strokeWidth="1.2" />

        {/* Neon cyan radar ripples centered on the house roof */}
        <circle
          cx="120"
          cy="78"
          r="11"
          fill="none"
          stroke="var(--scene-trace-stroke)"
          strokeWidth="1.6"
          opacity="0.35"
          className="wf-radar-1"
        />
        <circle
          cx="120"
          cy="78"
          r="11"
          fill="none"
          stroke="var(--scene-trace-stroke)"
          strokeWidth="1.4"
          opacity="0"
          className="wf-radar-2"
        />

        {/* Pin shadow on the roof */}
        <ellipse cx="120" cy="87.5" rx="5.5" ry="2.2" fill="rgba(0,0,0,0.45)" className="wf-pin-shadow" />

        {/* Map Pin centered on the house roof (spans y=62.5..86.5 inside roof y=60..96) */}
        <g className="wf-pin-drop">
          <path
            d="M120 86.5 C120 86.5 111.5 76.5 111.5 71 C111.5 66.3 115.3 62.5 120 62.5 C124.7 62.5 128.5 66.3 128.5 71 C128.5 76.5 120 86.5 120 86.5 Z"
            fill="var(--scene-trace-stroke)"
            stroke="#08130d"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="120" cy="71" r="3.4" fill="#08130d" />
          <circle cx="120" cy="71" r="1.5" fill="#ffffff" />
        </g>
      </svg>

      {/* Floating address search bar — sits in top band (y=8..32), well above lot (y=42) and pin (y=62.5) */}
      <div className="pointer-events-none absolute inset-x-2.5 top-2 flex items-center justify-between gap-1.5 rounded-lg border border-line-strong/90 bg-surface/94 px-2.5 py-1 shadow-sm backdrop-blur-md">
        <span className="flex min-w-0 items-center gap-1.5 text-[11px] leading-tight font-medium text-fg">
          <span className="size-2 shrink-0 rounded-full bg-[#00E5FF] ring-1 ring-black/20 shadow-[0_0_6px_#00E5FF]" />
          <span className="truncate">{sampleQuote.address}</span>
        </span>
        <span className="shrink-0 rounded bg-spruce/14 px-1.5 py-0.5 font-mono text-[9px] leading-none font-semibold tracking-wider text-spruce uppercase">
          GPS
        </span>
      </div>
    </div>
  );
}

// Back & side wrap-around lawn (1468 m²): hugs the lot perimeter (x=28..212, y=16..108)
// and wraps cleanly around the house/garage (x=76..184, y=44..74), driveway (x=154..184), and walkway (x=100..110).
const TRACE_BACK_LAWN_PTS: readonly [number, number][] = [
  [28, 16],
  [212, 16],
  [212, 108],
  [184, 108],
  [184, 44],
  [76, 44],
  [76, 74],
  [100, 74],
  [100, 108],
  [28, 108],
];

// Front lawn between walkway (x=110) and driveway (x=154), from house front (y=74) to sidewalk (y=108): 150 m².
const TRACE_FRONT_LAWN_PTS: readonly [number, number][] = [
  [110, 74],
  [154, 74],
  [154, 108],
  [110, 108],
];

/** Stop 02 preview: neon cyan polygon traces for back lawn (1468 m²) and front lawn (150 m²), total 1618 m². */
export function TracePropertyPreview() {
  const backLawnAttr = TRACE_BACK_LAWN_PTS.map((p) => p.join(",")).join(" ");
  const frontLawnAttr = TRACE_FRONT_LAWN_PTS.map((p) => p.join(",")).join(" ");

  return (
    <div className="relative h-full w-full overflow-hidden select-none">
      <svg viewBox="0 0 240 160" className="size-full" aria-hidden preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="wf-s2-lawn" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(-5)">
            <rect width="18" height="9" fill="var(--scene-summer-lawn-hi)" />
            <rect y="9" width="18" height="9" fill="var(--scene-summer-ground)" />
          </pattern>
        </defs>

        {/* Neighbour ground & striped lawn lot */}
        <rect x="-60" y="-30" width="360" height="220" fill="var(--scene-summer-neighbour)" />
        <rect x="28" y="16" width="184" height="92" fill="url(#wf-s2-lawn)" />

        {/* Walkway (x=100..110, y=74..110) & Driveway (x=154..184, y=74..116) */}
        <rect x="100" y="74" width="10" height="36" fill="#4e555e" />
        <rect x="154" y="74" width="30" height="42" fill="#3a3d44" />
        <line x1="154" y1="86" x2="184" y2="86" stroke="#2f3238" strokeWidth="1" />
        <line x1="154" y1="98" x2="184" y2="98" stroke="#2f3238" strokeWidth="1" />

        {/* Sidewalk & street at bottom (bottom bar sits over the street, well below y=108 vertices) */}
        <rect x="-60" y="108" width="360" height="6" fill="#464a52" />
        <rect x="-60" y="114" width="360" height="76" fill="#1e2026" />
        <line x1="-60" y1="124" x2="300" y2="124" stroke="#525864" strokeWidth="1.2" strokeDasharray="8 8" />

        {/* House + garage footprint (x=76..184, y=44..74) — untraced so polygons hug around it */}
        <rect x="76" y="44" width="76" height="30" rx="1.5" fill="#35353b" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="76" y1="44" x2="90" y2="59" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="76" y1="74" x2="90" y2="59" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="152" y1="44" x2="138" y2="59" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="152" y1="74" x2="138" y2="59" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="90" y1="59" x2="138" y2="59" stroke="#4e4e56" strokeWidth="1.2" />
        <rect x="152" y="44" width="32" height="30" rx="1.5" fill="#2f2f35" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="168" y1="44" x2="168" y2="74" stroke="#4e4e56" strokeWidth="1.2" />

        {/* Zone 1: Traced Back & Side Lawn Polygon (1468 m²) */}
        <polygon
          points={backLawnAttr}
          fill="none"
          stroke="rgba(0,0,0,0.4)"
          strokeWidth="3.8"
          strokeLinejoin="round"
        />
        <polygon
          points={backLawnAttr}
          fill="var(--scene-trace-fill)"
          stroke="var(--scene-trace-stroke)"
          strokeWidth="2"
          strokeLinejoin="round"
          pathLength={1}
          className="wf-trace-poly"
        />

        {/* Zone 2: Traced Front Lawn Polygon (150 m²) */}
        <polygon
          points={frontLawnAttr}
          fill="none"
          stroke="rgba(0,0,0,0.4)"
          strokeWidth="3.8"
          strokeLinejoin="round"
        />
        <polygon
          points={frontLawnAttr}
          fill="var(--scene-trace-fill)"
          stroke="var(--scene-trace-stroke)"
          strokeWidth="2"
          strokeLinejoin="round"
          pathLength={1}
          className="wf-trace-drive"
        />

        {/* Neon cyan vertex corner dots — all inside x∈[28,212], y∈[16,108] */}
        {[...TRACE_BACK_LAWN_PTS, ...TRACE_FRONT_LAWN_PTS].map(([cx, cy], idx) => (
          <circle
            key={`${cx}-${cy}-${idx}`}
            cx={cx}
            cy={cy}
            r="2.8"
            fill="var(--scene-trace-stroke)"
            stroke="rgba(0,0,0,0.65)"
            strokeWidth="1.2"
            className="wf-vertex-dot"
            style={{ animationDelay: `${(idx % 6) * 180}ms` }}
          />
        ))}

        {/* Geodesic area labels matching the hero season slider */}
        <text
          x="120"
          y="33"
          textAnchor="middle"
          fontSize="10.5"
          fontWeight="700"
          paintOrder="stroke"
          stroke="rgba(0,0,0,0.7)"
          strokeWidth="3"
          fill="var(--scene-trace-stroke)"
          style={{ fontFamily: "var(--font-plex-mono), monospace" }}
        >
          1468 m²
        </text>
        <text
          x="132"
          y="94"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="700"
          paintOrder="stroke"
          stroke="rgba(0,0,0,0.7)"
          strokeWidth="2.8"
          fill="var(--scene-trace-stroke)"
          style={{ fontFamily: "var(--font-plex-mono), monospace" }}
        >
          150 m²
        </text>
      </svg>

      {/* Bottom measurement telemetry chip (sits at y=130..152 over the street, clear of y=108 vertices) */}
      <div className="pointer-events-none absolute right-2.5 bottom-2 left-2.5 flex items-center justify-between rounded-md border border-line-strong/90 bg-surface/94 px-2.5 py-1 text-[10px] leading-tight shadow-sm backdrop-blur-md">
        <span className="inline-flex items-center gap-1.5 font-mono font-medium text-fg">
          <span className="size-2 rounded-[2px] bg-[#00E5FF] ring-1 ring-black/20" />
          2 zones traced
        </span>
        <span className="font-mono font-semibold text-spruce tabular-nums">1618 m²</span>
      </div>
    </div>
  );
}

/** Stop 03 preview: mini seasonal estimate card with Snow & lawn bundle, line items and total. */
export function SendEstimatePreview() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden p-3 select-none">
      {/* Subtle seasonal radial light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_70%_at_85%_15%,rgba(0,229,255,0.14),transparent_70%),radial-gradient(60%_65%_at_15%_90%,color-mix(in_oklab,var(--color-spruce)_18%,transparent),transparent_70%)]"
      />

      <div className="relative flex flex-col rounded-xl border border-line-strong/80 bg-surface px-3 py-2 shadow-sm">
        {/* Top season selector row */}
        <div className="flex items-center justify-between gap-1.5 border-b border-line pb-1.5 leading-tight">
          <span className="inline-flex items-center gap-1 rounded-md bg-spruce/12 px-1.5 py-0.5 text-[10px] font-semibold text-spruce ring-1 ring-spruce/30">
            <Snowflake aria-hidden className="size-2.5 text-fg-2" />
            <Sprout aria-hidden className="size-2.5 text-spruce" />
            Snow &amp; lawn
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[9px] font-medium"
            style={{
              backgroundColor: "var(--wf-cyan-badge-bg)",
              color: "var(--wf-cyan-ink)",
              boxShadow: "inset 0 0 0 1px var(--wf-cyan-badge-ring)",
            }}
          >
            <Send aria-hidden className="wf-send-icon size-2.5" />
            Share
          </span>
        </div>

        {/* Line items: $2,165.40 + $1,079.20 = $3,244.60; less 10% ($324.46) = $2,920.14 */}
        <dl className="mt-1.5 grid gap-1 text-[10.5px] leading-tight">
          <div className="flex items-center justify-between gap-1">
            <dt className="flex items-center gap-1.5 truncate text-fg-2">
              <span className="size-1.5 shrink-0 rounded-full bg-spruce" />
              Lawn (1618 m²)
            </dt>
            <dd className="font-mono text-fg tabular-nums">$2,165.40</dd>
          </div>
          <div className="flex items-center justify-between gap-1">
            <dt className="flex items-center gap-1.5 truncate text-fg-2">
              <span className="size-1.5 shrink-0 rounded-full bg-[#00E5FF] ring-1 ring-black/20" />
              Snow + walk
            </dt>
            <dd className="font-mono text-fg tabular-nums">$1,079.20</dd>
          </div>
          <div className="flex items-center justify-between gap-1">
            <dt className="truncate text-[10px] text-spruce">Bundle −10%</dt>
            <dd className="font-mono text-[10px] font-medium text-spruce tabular-nums">{sampleQuote.discount.amount}</dd>
          </div>
        </dl>

        {/* Seasonal total */}
        <div className="mt-1.5 flex items-baseline justify-between border-t border-line pt-1.5 leading-none">
          <span className="font-mono text-[9.5px] tracking-wider text-fg-3 uppercase">Total</span>
          <span className="font-wide text-[13px] font-bold text-snow tabular-nums">{sampleQuote.total}</span>
        </div>
      </div>
    </div>
  );
}

/** Stop 04 preview: active contract card with self-drawing signature on the baseline and checkmark seal. */
export function WinContractPreview() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden p-3 select-none">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_80%_20%,color-mix(in_oklab,var(--color-spruce)_20%,transparent),transparent_70%)]"
      />

      <div className="relative flex flex-col justify-between gap-1.5 rounded-xl border border-line-strong/80 bg-surface px-3 py-2 shadow-sm">
        {/* Top client & status row */}
        <div className="flex items-center justify-between gap-1.5 leading-tight">
          <div className="min-w-0">
            <p className="truncate text-[11px] leading-tight font-semibold text-snow">Hollis Residence</p>
            <p className="mt-0.5 truncate font-mono text-[9.5px] leading-tight text-fg-3">2026–27 · {sampleQuote.total}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-spruce/15 px-2 py-0.5 text-[10px] font-semibold text-spruce ring-1 ring-spruce/30">
            <span className="size-1.5 rounded-full bg-spruce" />
            Active
          </span>
        </div>

        {/* Signature pad + Checkmark seal */}
        <div className="flex items-center justify-between gap-2 rounded-lg border border-line bg-surface-2/70 px-2.5 py-1.5">
          <div className="min-w-0 flex-1">
            <span className="block font-mono text-[8.5px] leading-none tracking-wider text-fg-3 uppercase">
              Quote paid &amp; signed
            </span>
            <svg
              viewBox="0 0 150 30"
              className="mt-1 h-7 w-full overflow-visible"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden
              fill="none"
            >
              {/* Dotted signature baseline */}
              <line
                x1="2"
                y1="24"
                x2="148"
                y2="24"
                stroke="var(--color-line-strong)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              {/* Full cursive signature ("M. Hollis") sitting directly on the y=24 baseline */}
              <path
                d="M 10 23.5 C 12 10, 17 4.5, 20 6 C 23 7.5, 19 22, 22 23.5 C 25 24, 30 8, 33 6 C 36 4.5, 32 22, 36 23.5 C 40 24.5, 44 15, 48 15.5 C 52 16, 48 23.5, 53 23.5 C 58 23.5, 68 6, 71 5 C 74 4, 67 23.5, 72 23.5 C 77 23.5, 84 6, 87 5 C 90 4, 83 23.5, 88 23.5 C 93 23.5, 97 14, 102 14.5 C 106 15, 102 23.5, 107 23.5 C 112 23.5, 116 9, 119 8 C 122 7, 116 23.5, 121 23.5 C 125 23.5, 129 15, 134 17.5 C 138 19.5, 134 24, 140 22.5 C 143 21.5, 145 19, 147 17.5"
                stroke="var(--wf-cyan-ink)"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                className="wf-sig-path"
              />
            </svg>
          </div>
          <span className="wf-seal-pop flex size-7 shrink-0 items-center justify-center rounded-full bg-spruce text-white shadow-[0_0_12px_color-mix(in_oklab,var(--color-spruce)_55%,transparent)]">
            <Check aria-hidden className="size-4" strokeWidth={2.75} />
          </span>
        </div>

        {/* Auto-created records footer */}
        <div className="flex items-center justify-between gap-1 text-[9.5px] leading-tight font-medium text-fg-2">
          <span className="inline-flex items-center gap-1 truncate">
            <ShieldCheck aria-hidden className="size-3 shrink-0 text-spruce" />
            Client + contract ready
          </span>
          <span className="font-mono text-[9px] text-fg-3">#128</span>
        </div>
      </div>
    </div>
  );
}

/** Stop 05 preview: live dispatch route map with a truck moving along Route 3 toward the destination pin. */
export function RollCrewPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden select-none">
      <svg viewBox="0 0 240 160" className="size-full" aria-hidden preserveAspectRatio="xMidYMid meet" fill="none">
        {/* Cartographic map background (extended beyond viewBox so aspect ratios never letterbox) */}
        <rect x="-60" y="-30" width="360" height="220" fill="var(--map-bg)" />

        {/* Neighbourhood blocks nestled inside the street grid (x=44, 116, 192; y=62, 114) */}
        <rect x="52" y="70" width="56" height="36" rx="4" fill="var(--scene-winter-lawn-lo)" opacity="0.28" />
        <rect x="124" y="70" width="60" height="36" rx="4" fill="var(--map-park)" />
        <rect x="52" y="122" width="56" height="26" rx="4" fill="var(--map-lot)" />
        <rect x="124" y="122" width="60" height="26" rx="4" fill="var(--map-park)" opacity="0.7" />
        <rect x="124" y="36" width="60" height="18" rx="3" fill="var(--map-lot)" />

        {/* Street grid casing (subtle edge so white roads pop in both light & dark modes) */}
        <g stroke="var(--wf-map-road-edge)" strokeWidth="12" strokeLinecap="round">
          <path d="M-60 62H300" />
          <path d="M-60 114H300" />
          <path d="M44 -30V190" />
          <path d="M116 -30V190" />
          <path d="M192 -30V190" />
        </g>

        {/* White street grid (horizontal streets at y=62 and y=114, vertical at x=44, 116, 192) */}
        <g stroke="var(--wf-map-road)" strokeWidth="9.5" strokeLinecap="round">
          <path d="M-60 62H300" />
          <path d="M-60 114H300" />
          <path d="M44 -30V190" />
          <path d="M116 -30V190" />
          <path d="M192 -30V190" />
        </g>

        {/* Active Route 3 Halo & Path — aligned 100% on the white streets (y=62 -> x=116 -> y=114) ending at pin (192,114) */}
        <path
          d="M 20 62 H 116 V 114 H 192"
          stroke="var(--color-spruce)"
          strokeOpacity="0.24"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 20 62 H 116 V 114 H 192"
          stroke="var(--color-spruce)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 20 62 H 116 V 114 H 192"
          stroke="var(--scene-trace-stroke)"
          strokeWidth="2"
          strokeDasharray="5 11"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="wf-route-dash"
        />

        {/* Completed route stops along y=62 */}
        <circle cx="44" cy="62" r="4.2" fill="var(--color-spruce)" stroke="var(--map-node-bg)" strokeWidth="1.75" />
        <circle cx="116" cy="62" r="4.2" fill="var(--color-spruce)" stroke="var(--map-node-bg)" strokeWidth="1.75" />

        {/* Destination stop at (192, 114): 18 Juniper Cres. */}
        <circle
          cx="192"
          cy="114"
          r="9"
          fill="none"
          stroke="var(--scene-trace-stroke)"
          strokeWidth="1.5"
          opacity="0.35"
          className="wf-radar-1"
        />
        <circle cx="192" cy="114" r="5.5" fill="var(--scene-trace-stroke)" stroke="#08130d" strokeWidth="2" />

        {/* Animated Truck moving along the route path and resting on the route at (154, 114) */}
        <g transform="translate(154, 114)">
          <g className="wf-truck-mover">
            <rect
              x="-11"
              y="-11"
              width="22"
              height="22"
              rx="6.5"
              fill="var(--map-chip-bg)"
              stroke="var(--color-spruce)"
              strokeWidth="2"
            />
            <Truck x={-6.5} y={-6.5} width={13} height={13} color="var(--color-spruce)" strokeWidth={2.2} />
          </g>
        </g>
      </svg>

      {/* Top Route & Vehicle dispatch pill (sits in y=8..32, well above the y=62 top street) */}
      <div className="pointer-events-none absolute top-2 right-2.5 left-2.5 flex items-center justify-between gap-1 rounded-md border border-line-strong/90 bg-surface/94 px-2.5 py-1 text-[10px] leading-tight shadow-sm backdrop-blur-md">
        <span className="inline-flex items-center gap-1.5 font-medium text-fg">
          <span className="size-2 rounded-full bg-spruce" />
          Route 3 · Plow 12
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[9.5px] font-semibold text-spruce">
          <Navigation aria-hidden className="size-2.5" />
          En route
        </span>
      </div>
    </div>
  );
}
