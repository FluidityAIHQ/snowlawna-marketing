import { Check, Navigation, Send, ShieldCheck, Snowflake, Sprout, Truck } from "lucide-react";
import { sampleQuote } from "@/lib/sample-quote";

/**
 * Scoped CSS tokens & animations for the 5-step workflow section.
 * Every keyframe and transition sits behind `@media (prefers-reduced-motion: no-preference)`
 * so reduced-motion visitors see the finished static visuals with zero movement.
 */
export function WorkflowStyles() {
  return (
    <style>{`
      :root,
      :root[data-theme="light"] {
        --wf-cyan-ink: #007a90;
        --wf-cyan-badge-bg: rgba(0, 180, 216, 0.12);
        --wf-cyan-badge-ring: rgba(0, 140, 170, 0.32);
      }
      @media (prefers-color-scheme: dark) {
        :root:not([data-theme="light"]) {
          --wf-cyan-ink: #00E5FF;
          --wf-cyan-badge-bg: rgba(0, 229, 255, 0.14);
          --wf-cyan-badge-ring: rgba(0, 229, 255, 0.35);
        }
      }
      :root[data-theme="dark"] {
        --wf-cyan-ink: #00E5FF;
        --wf-cyan-badge-bg: rgba(0, 229, 255, 0.14);
        --wf-cyan-badge-ring: rgba(0, 229, 255, 0.35);
      }

      @keyframes wf-dash-x {
        to {
          background-position: 32px 0;
        }
      }
      @keyframes wf-dash-y {
        to {
          background-position: 0 32px;
        }
      }
      @keyframes wf-runner-x {
        0% {
          left: 0%;
          opacity: 0;
        }
        8% {
          opacity: 1;
        }
        92% {
          opacity: 1;
        }
        100% {
          left: 100%;
          opacity: 0;
        }
      }
      @keyframes wf-runner-y {
        0% {
          top: 0%;
          opacity: 0;
        }
        8% {
          opacity: 1;
        }
        92% {
          opacity: 1;
        }
        100% {
          top: 100%;
          opacity: 0;
        }
      }
      @keyframes wf-pin-drop {
        0%, 100% {
          transform: translateY(0);
        }
        12% {
          transform: translateY(-13px);
        }
        24% {
          transform: translateY(0);
        }
        30% {
          transform: translateY(-3.5px);
        }
        36% {
          transform: translateY(0);
        }
      }
      @keyframes wf-pin-shadow {
        0%, 24%, 36%, 100% {
          transform: scale(1);
          opacity: 0.45;
        }
        12% {
          transform: scale(0.55);
          opacity: 0.2;
        }
        30% {
          transform: scale(0.82);
          opacity: 0.32;
        }
      }
      @keyframes wf-radar {
        0% {
          transform: scale(0.45);
          opacity: 0.85;
        }
        80%, 100% {
          transform: scale(2.35);
          opacity: 0;
        }
      }
      @keyframes wf-trace-loop {
        0% {
          stroke-dashoffset: 1;
        }
        45%, 82% {
          stroke-dashoffset: 0;
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
          transform: scale(1.35);
        }
      }
      @keyframes wf-send-float {
        0%, 100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(2px, -2px);
        }
      }
      @keyframes wf-sig-draw {
        0% {
          stroke-dashoffset: 1;
        }
        40%, 100% {
          stroke-dashoffset: 0;
        }
      }
      @keyframes wf-seal-pulse {
        0%, 32% {
          transform: scale(0.88);
        }
        46% {
          transform: scale(1.08);
        }
        58%, 100% {
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
          transform: translate(-102px, -38px);
        }
        35% {
          transform: translate(-34px, -38px);
        }
        60% {
          transform: translate(-34px, 0px);
        }
        88%, 100% {
          transform: translate(14px, 0px);
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
        .wf-connector-dash-x {
          background-image: repeating-linear-gradient(
            90deg,
            rgba(0, 229, 255, 0.75) 0 8px,
            transparent 8px 16px
          );
          background-size: 32px 100%;
          animation: wf-dash-x 1.6s linear infinite;
        }
        .wf-connector-dash-y {
          background-image: repeating-linear-gradient(
            180deg,
            rgba(0, 229, 255, 0.75) 0 8px,
            transparent 8px 16px
          );
          background-size: 100% 32px;
          animation: wf-dash-y 1.6s linear infinite;
        }
        .wf-runner-x {
          animation: wf-runner-x 5.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .wf-runner-x-delayed {
          animation: wf-runner-x 5.5s cubic-bezier(0.4, 0, 0.2, 1) 2.75s infinite;
        }
        .wf-runner-y {
          animation: wf-runner-y 5.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .wf-runner-y-delayed {
          animation: wf-runner-y 5.5s cubic-bezier(0.4, 0, 0.2, 1) 2.75s infinite;
        }
        .wf-pin-drop {
          transform-box: fill-box;
          transform-origin: center bottom;
          animation: wf-pin-drop 4.2s var(--ease-out-quint) infinite;
        }
        .wf-pin-shadow {
          transform-box: fill-box;
          transform-origin: center;
          animation: wf-pin-shadow 4.2s var(--ease-out-quint) infinite;
        }
        .wf-radar-1 {
          transform-box: fill-box;
          transform-origin: center;
          animation: wf-radar 3.2s var(--ease-out-quint) infinite;
        }
        .wf-radar-2 {
          transform-box: fill-box;
          transform-origin: center;
          animation: wf-radar 3.2s var(--ease-out-quint) 1.6s infinite;
        }
        .wf-trace-poly {
          stroke-dasharray: 1;
          animation: wf-trace-loop 5s var(--ease-in-out-quart) infinite;
        }
        .wf-trace-drive {
          stroke-dasharray: 1;
          animation: wf-trace-loop 5s var(--ease-in-out-quart) 0.35s infinite;
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
          animation: wf-sig-draw 4.6s var(--ease-in-out-quart) infinite;
        }
        .wf-seal-pop {
          animation: wf-seal-pulse 4.6s var(--ease-out-quint) infinite;
        }
        .wf-route-dash {
          animation: wf-route-flow 1.8s linear infinite;
        }
        .wf-truck-mover {
          animation: wf-truck-run 5.2s var(--ease-in-out-quart) infinite alternate;
        }
        .wf-step-icon {
          animation: wf-icon-bob 3.4s ease-in-out infinite;
          animation-delay: var(--icon-delay, 0ms);
        }
      }
    `}</style>
  );
}

/** Stop 01 preview: dual-season mini satellite map with address search bar and dropping cyan pin. */
export function FindPropertyPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden select-none">
      <svg viewBox="0 0 240 144" className="size-full" aria-hidden preserveAspectRatio="xMidYMid slice">
        <defs>
          <clipPath id="wf-s1-summer">
            <polygon points="108,0 240,0 240,144 62,144" />
          </clipPath>
          <pattern id="wf-s1-stripes" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            <rect width="16" height="8" fill="var(--scene-summer-lawn-hi)" />
            <rect y="8" width="16" height="8" fill="var(--scene-summer-ground)" />
          </pattern>
        </defs>

        {/* Winter base (left side) */}
        <rect width="240" height="144" fill="var(--scene-winter-ground)" />
        <rect x="16" y="14" width="208" height="94" rx="4" fill="var(--scene-winter-lawn-lo)" />
        <ellipse cx="52" cy="52" rx="22" ry="7" fill="var(--scene-winter-drift)" opacity="0.85" />
        <ellipse cx="66" cy="88" rx="18" ry="6" fill="var(--scene-winter-drift)" opacity="0.7" />

        {/* Neighbour lots (winter) */}
        <rect x="24" y="48" width="34" height="26" rx="2" fill="var(--scene-winter-roof-s)" stroke="var(--scene-winter-roof-ridge)" strokeWidth="1" />
        <rect x="182" y="46" width="34" height="28" rx="2" fill="var(--scene-winter-roof-s)" />

        {/* Summer clipped window (right side) */}
        <g clipPath="url(#wf-s1-summer)">
          <rect width="240" height="144" fill="var(--scene-summer-neighbour)" />
          <rect x="74" y="14" width="96" height="94" fill="url(#wf-s1-stripes)" />
          <rect x="182" y="46" width="34" height="28" rx="2" fill="#35353b" stroke="#4e4e56" strokeWidth="1" />
          <circle cx="158" cy="36" r="11" fill="var(--scene-summer-leaf-mid)" />
          <circle cx="155" cy="33" r="6" fill="var(--scene-summer-leaf-hi)" opacity="0.8" />
          <circle cx="198" cy="88" r="9" fill="var(--scene-summer-leaf-mid)" />
        </g>

        {/* Street along the bottom */}
        <rect x="0" y="108" width="240" height="6" fill="var(--scene-winter-sidewalk)" />
        <rect x="0" y="114" width="240" height="30" fill="var(--scene-winter-street)" />
        <line x1="0" y1="129" x2="240" y2="129" stroke="#5c6470" strokeWidth="1.5" strokeDasharray="8 8" />

        {/* Target property lot boundary */}
        <rect
          x="74"
          y="26"
          width="96"
          height="80"
          rx="3"
          fill="none"
          stroke="var(--scene-trace-stroke)"
          strokeOpacity="0.6"
          strokeWidth="1.25"
          strokeDasharray="3 3"
        />

        {/* Target house + driveway */}
        <rect x="132" y="76" width="18" height="38" fill="var(--scene-winter-driveway)" />
        <rect x="94" y="48" width="54" height="34" rx="2" fill="#35353b" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="94" y1="48" x2="108" y2="65" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="94" y1="82" x2="108" y2="65" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="148" y1="48" x2="134" y2="65" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="148" y1="82" x2="134" y2="65" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="108" y1="65" x2="134" y2="65" stroke="#4e4e56" strokeWidth="1.2" />

        {/* Season split seam */}
        <line x1="108" y1="0" x2="62" y2="144" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="1.2" />

        {/* Neon cyan radar ripples around the pin target */}
        <circle
          cx="121"
          cy="65"
          r="11"
          fill="none"
          stroke="var(--scene-trace-stroke)"
          strokeWidth="1.75"
          className="wf-radar-1"
        />
        <circle
          cx="121"
          cy="65"
          r="11"
          fill="none"
          stroke="var(--scene-trace-stroke)"
          strokeWidth="1.5"
          className="wf-radar-2"
        />

        {/* Pin shadow */}
        <ellipse cx="121" cy="67" rx="6" ry="2.6" fill="rgba(0,0,0,0.45)" className="wf-pin-shadow" />

        {/* Dropping Map Pin */}
        <g className="wf-pin-drop">
          <path
            d="M121 65 C121 65 110 51.5 110 43.5 C110 37.4 114.9 32.5 121 32.5 C127.1 32.5 132 37.4 132 43.5 C132 51.5 121 65 121 65 Z"
            fill="var(--scene-trace-stroke)"
            stroke="#08130d"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="121" cy="43.5" r="4.2" fill="#08130d" />
          <circle cx="121" cy="43.5" r="1.8" fill="#ffffff" />
        </g>
      </svg>

      {/* Floating address search bar */}
      <div className="pointer-events-none absolute inset-x-2.5 top-2.5 flex items-center justify-between gap-1.5 rounded-lg border border-line-strong/90 bg-surface/92 px-2.5 py-1 shadow-sm backdrop-blur-md">
        <span className="flex min-w-0 items-center gap-1.5 text-[11px] font-medium text-fg">
          <span className="size-2 shrink-0 rounded-full bg-[#00E5FF] ring-1 ring-black/20 shadow-[0_0_6px_#00E5FF]" />
          <span className="truncate">{sampleQuote.address}</span>
        </span>
        <span className="shrink-0 rounded bg-spruce/14 px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-spruce uppercase">
          GPS
        </span>
      </div>
    </div>
  );
}

const TRACE_LAWN_PTS: readonly [number, number][] = [
  [20, 16],
  [148, 16],
  [148, 110],
  [112, 110],
  [112, 74],
  [66, 74],
  [66, 34],
  [20, 34],
];

const TRACE_SNOW_PTS: readonly [number, number][] = [
  [158, 54],
  [214, 54],
  [214, 114],
  [158, 114],
];

/** Stop 02 preview: neon cyan polygon & snow driveway trace with corner vertex dots and live m² chips. */
export function TracePropertyPreview() {
  const lawnAttr = TRACE_LAWN_PTS.map((p) => p.join(",")).join(" ");
  const snowAttr = TRACE_SNOW_PTS.map((p) => p.join(",")).join(" ");

  return (
    <div className="relative h-full w-full overflow-hidden select-none">
      <svg viewBox="0 0 240 144" className="size-full" aria-hidden preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="wf-s2-lawn" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(-5)">
            <rect width="18" height="9" fill="var(--scene-summer-lawn-hi)" />
            <rect y="9" width="18" height="9" fill="var(--scene-summer-ground)" />
          </pattern>
        </defs>

        {/* Summer lawn side (left) + Winter snow driveway side (right) */}
        <rect width="154" height="144" fill="url(#wf-s2-lawn)" />
        <rect x="154" width="86" height="144" fill="var(--scene-winter-ground)" />
        <ellipse cx="196" cy="30" rx="24" ry="8" fill="var(--scene-winter-drift)" opacity="0.85" />
        <line x1="154" y1="0" x2="154" y2="144" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1" />

        {/* House footprint */}
        <rect x="66" y="32" width="68" height="42" rx="2" fill="#35353b" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="66" y1="32" x2="82" y2="53" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="66" y1="74" x2="82" y2="53" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="134" y1="32" x2="118" y2="53" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="134" y1="74" x2="118" y2="53" stroke="#4e4e56" strokeWidth="1.2" />
        <line x1="82" y1="53" x2="118" y2="53" stroke="#4e4e56" strokeWidth="1.2" />

        {/* Driveway surface in winter zone */}
        <rect x="158" y="54" width="56" height="60" rx="2" fill="var(--scene-winter-driveway)" />
        <rect x="153" y="56" width="4" height="52" rx="2" fill="var(--scene-winter-bank)" />
        <rect x="215" y="56" width="4" height="52" rx="2" fill="var(--scene-winter-bank)" />

        {/* Sidewalk & street at bottom */}
        <rect x="0" y="114" width="240" height="30" fill="var(--scene-winter-street)" />
        <rect x="0" y="112" width="240" height="3" fill="var(--scene-winter-curb)" />

        {/* Traced Lawn Polygon (Neon Cyan) */}
        <polygon
          points={lawnAttr}
          fill="none"
          stroke="rgba(0,0,0,0.4)"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <polygon
          points={lawnAttr}
          fill="var(--scene-trace-fill)"
          stroke="var(--scene-trace-stroke)"
          strokeWidth="2.2"
          strokeLinejoin="round"
          pathLength={1}
          className="wf-trace-poly"
        />

        {/* Traced Snow Driveway Polygon (Neon Cyan) */}
        <polygon
          points={snowAttr}
          fill="none"
          stroke="rgba(0,0,0,0.4)"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <polygon
          points={snowAttr}
          fill="var(--scene-trace-fill)"
          stroke="var(--scene-trace-stroke)"
          strokeWidth="2.2"
          strokeLinejoin="round"
          pathLength={1}
          className="wf-trace-drive"
        />

        {/* Neon cyan vertex corner dots */}
        {[...TRACE_LAWN_PTS, ...TRACE_SNOW_PTS].map(([cx, cy], idx) => (
          <circle
            key={`${cx}-${cy}-${idx}`}
            cx={cx}
            cy={cy}
            r="3.4"
            fill="var(--scene-trace-stroke)"
            stroke="rgba(0,0,0,0.6)"
            strokeWidth="1.4"
            className="wf-vertex-dot"
            style={{ animationDelay: `${(idx % 6) * 180}ms` }}
          />
        ))}

        {/* Geodesic area labels */}
        <text
          x="64"
          y="94"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          paintOrder="stroke"
          stroke="rgba(0,0,0,0.65)"
          strokeWidth="3"
          fill="var(--scene-trace-stroke)"
          style={{ fontFamily: "var(--font-plex-mono), monospace" }}
        >
          447 m²
        </text>
        <text
          x="186"
          y="86"
          textAnchor="middle"
          fontSize="10.5"
          fontWeight="700"
          paintOrder="stroke"
          stroke="rgba(0,0,0,0.65)"
          strokeWidth="3"
          fill="var(--scene-trace-stroke)"
          style={{ fontFamily: "var(--font-plex-mono), monospace" }}
        >
          78 m²
        </text>
      </svg>

      {/* Bottom measurement telemetry chip */}
      <div className="pointer-events-none absolute right-2 bottom-2 left-2 flex items-center justify-between rounded-md border border-line-strong/90 bg-surface/92 px-2 py-1 text-[10px] shadow-sm backdrop-blur-md">
        <span className="inline-flex items-center gap-1 font-mono font-medium text-fg">
          <span className="size-2 rounded-[2px] bg-[#00E5FF] ring-1 ring-black/20" />
          2 zones traced
        </span>
        <span className="font-mono font-semibold text-spruce">525 m²</span>
      </div>
    </div>
  );
}

/** Stop 03 preview: mini seasonal estimate card with Snow & lawn bundle, line items and total. */
export function SendEstimatePreview() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden p-2.5 select-none">
      {/* Subtle seasonal radial light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_70%_at_85%_15%,rgba(0,229,255,0.14),transparent_70%),radial-gradient(60%_65%_at_15%_90%,color-mix(in_oklab,var(--color-spruce)_18%,transparent),transparent_70%)]"
      />

      <div className="relative flex flex-col rounded-xl border border-line-strong/80 bg-surface p-2.5 shadow-sm">
        {/* Top season selector row */}
        <div className="flex items-center justify-between gap-1.5 border-b border-line pb-1.5">
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

        {/* Line items */}
        <dl className="mt-1.5 grid gap-1 text-[10.5px]">
          <div className="flex items-center justify-between gap-1">
            <dt className="flex items-center gap-1.5 truncate text-fg-2">
              <span className="size-1.5 shrink-0 rounded-full bg-spruce" />
              Lawn (447 m²)
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
        <div className="mt-1.5 flex items-baseline justify-between border-t border-line pt-1.5">
          <span className="font-mono text-[9.5px] tracking-wider text-fg-3 uppercase">Total</span>
          <span className="font-wide text-sm font-bold text-snow tabular-nums">{sampleQuote.total}</span>
        </div>
      </div>
    </div>
  );
}

/** Stop 04 preview: active contract card with self-drawing signature and checkmark seal. */
export function WinContractPreview() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden p-2.5 select-none">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_80%_20%,color-mix(in_oklab,var(--color-spruce)_20%,transparent),transparent_70%)]"
      />

      <div className="relative flex flex-col justify-between gap-1.5 rounded-xl border border-line-strong/80 bg-surface p-2.5 shadow-sm">
        {/* Top client & status row */}
        <div className="flex items-center justify-between gap-1.5">
          <div className="min-w-0">
            <p className="truncate text-[11px] leading-tight font-semibold text-snow">Hollis Residence</p>
            <p className="truncate font-mono text-[9.5px] text-fg-3">2026–27 · {sampleQuote.total}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-spruce/15 px-2 py-0.5 text-[10px] font-semibold text-spruce ring-1 ring-spruce/30">
            <span className="size-1.5 rounded-full bg-spruce" />
            Active
          </span>
        </div>

        {/* Signature pad + Checkmark seal */}
        <div className="flex items-center justify-between gap-2 rounded-lg border border-line bg-surface-2/70 px-2.5 py-1.5">
          <div className="min-w-0 flex-1">
            <span className="block font-mono text-[8.5px] tracking-wider text-fg-3 uppercase">Quote paid &amp; signed</span>
            <svg viewBox="0 0 120 24" className="mt-0.5 h-5 w-full overflow-visible" aria-hidden fill="none">
              <line x1="0" y1="20" x2="112" y2="20" stroke="var(--color-line-strong)" strokeWidth="1" strokeDasharray="2 2" />
              <path
                d="M4 16 C12 5, 18 18, 25 10 C30 4, 33 17, 42 13 C50 9, 56 5, 63 15 C68 19, 76 7, 86 12 C94 16, 102 8, 108 11"
                stroke="var(--wf-cyan-ink)"
                strokeWidth="2"
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
        <div className="flex items-center justify-between gap-1 text-[9.5px] font-medium text-fg-2">
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

/** Stop 05 preview: live dispatch route map with a truck moving along Route 3 toward the property. */
export function RollCrewPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden select-none">
      <svg viewBox="0 0 240 144" className="size-full" aria-hidden preserveAspectRatio="xMidYMid slice" fill="none">
        {/* Cartographic map background */}
        <rect width="240" height="144" fill="var(--map-bg)" />

        {/* Winter snow block (left) and summer lawn park block (right) */}
        <rect x="12" y="64" width="88" height="62" rx="6" fill="var(--scene-winter-lawn-lo)" opacity="0.22" />
        <rect x="132" y="10" width="94" height="50" rx="6" fill="var(--map-park)" />
        <rect x="132" y="100" width="94" height="32" rx="6" fill="var(--map-park)" opacity="0.7" />
        <rect x="18" y="14" width="68" height="24" rx="4" fill="var(--map-lot)" />

        {/* Street grid */}
        <g stroke="var(--map-street-minor)" strokeWidth="6" strokeLinecap="round">
          <path d="M0 26H240" />
          <path d="M0 116H240" />
          <path d="M46 0V144" />
          <path d="M196 0V144" />
        </g>
        <g stroke="var(--map-street-major)" strokeWidth="9" strokeLinecap="round">
          <path d="M0 50H240" />
          <path d="M0 88H240" />
          <path d="M114 0V144" />
        </g>

        {/* Active Route 3 Halo & Path */}
        <path
          d="M 18 50 H 114 V 88 H 206"
          stroke="var(--color-spruce)"
          strokeOpacity="0.25"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 18 50 H 114 V 88 H 206"
          stroke="var(--color-spruce)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 18 50 H 114 V 88 H 206"
          stroke="var(--scene-trace-stroke)"
          strokeWidth="2"
          strokeDasharray="5 11"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="wf-route-dash"
        />

        {/* Completed route stops */}
        <circle cx="46" cy="50" r="4.5" fill="var(--color-spruce)" stroke="var(--map-node-bg)" strokeWidth="1.75" />
        <circle cx="114" cy="50" r="4.5" fill="var(--color-spruce)" stroke="var(--map-node-bg)" strokeWidth="1.75" />

        {/* Destination stop: 18 Juniper Cres. */}
        <circle cx="186" cy="88" r="9" fill="none" stroke="var(--scene-trace-stroke)" strokeWidth="1.5" className="wf-radar-1" />
        <circle cx="186" cy="88" r="5.5" fill="var(--scene-trace-stroke)" stroke="#08130d" strokeWidth="2" />

        {/* Animated Truck moving along the route path (rests at (148, 88) in reduced motion) */}
        <g className="wf-truck-mover">
          <g transform="translate(148, 88)">
            <rect
              x="-12"
              y="-12"
              width="24"
              height="24"
              rx="7"
              fill="var(--map-chip-bg)"
              stroke="var(--color-spruce)"
              strokeWidth="2"
            />
            <Truck x={-7} y={-7} width={14} height={14} color="var(--color-spruce)" strokeWidth={2.2} />
          </g>
        </g>
      </svg>

      {/* Top Route & Vehicle dispatch pill */}
      <div className="pointer-events-none absolute top-2 right-2 left-2 flex items-center justify-between gap-1 rounded-md border border-line-strong/90 bg-surface/92 px-2 py-1 text-[10px] shadow-sm backdrop-blur-md">
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
