"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronsLeftRight, Snowflake, Sprout } from "lucide-react";
import { PropertyScene, PropertyTraces } from "@/components/illustrations/property-scene";

const MIN = 8;
const MAX = 92;
// Horizontal lean of the divider, in % of width, either side of the handle — the same diagonal
// as the blade in the logo. With the 600:520 frame this is a 9.2° tilt.
const LEAN = 7;
const TILT_DEG = 9.2;

const clamp = (value: number) => Math.min(MAX, Math.max(MIN, value));

// Positions are in % of the 600×520 scene. "start" labels sit just right of their point.
const traceLabels = [
  { left: "50%", top: "13.8%", align: "center", tone: "spruce", text: "Lawn", value: "4,812 ft²" },
  { left: "69.8%", top: "71%", align: "center", tone: "ice", text: "Snow surface", value: "842 ft²" },
  { left: "43.6%", top: "62%", align: "start", tone: "ice", text: "Walkway", value: "34 lin ft" },
] as const;

export function SeasonSplit() {
  // null until the visitor interacts, so the CSS hint animation can run first.
  const [split, setSplit] = useState<number | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const value = split ?? 50;

  const moveTo = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setSplit(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) moveTo(event.clientX);
  };

  const stopDragging = () => {
    dragging.current = false;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const big = event.shiftKey ? 10 : 2;
    const next: Record<string, number> = {
      ArrowLeft: value - big,
      ArrowDown: value - big,
      ArrowRight: value + big,
      ArrowUp: value + big,
      PageDown: value - 10,
      PageUp: value + 10,
      Home: MIN,
      End: MAX,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    setSplit(clamp(next[event.key]));
  };

  const winterShare = Math.round(value);

  return (
    <div
      ref={frameRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      style={split === null ? undefined : ({ "--split": `${split}%` } as CSSProperties)}
      className={`group/split relative aspect-[600/520] cursor-ew-resize touch-pan-y overflow-hidden rounded-[1.25rem] border border-line-strong bg-surface shadow-[0_50px_120px_-40px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.02)] select-none ${
        split === null ? "anim-split-hint" : ""
      }`}
    >
      <PropertyScene season="summer" idPrefix="hero" className="absolute inset-0 size-full" />
      <div
        className="absolute inset-0"
        style={{
          clipPath: `polygon(0 0, calc(var(--split) + ${LEAN}%) 0, calc(var(--split) - ${LEAN}%) 100%, 0 100%)`,
        }}
      >
        <PropertyScene season="winter" idPrefix="hero" className="size-full" />
      </div>

      <PropertyTraces className="absolute inset-0 size-full" animate />

      {traceLabels.map((label, i) => (
        <span
          key={label.text}
          className={`anim-fade pointer-events-none absolute flex -translate-y-1/2 items-center ${label.align === "center" ? "-translate-x-1/2" : ""} gap-1.5 rounded-md border border-white/10 bg-canvas/85 px-2 py-1 font-mono text-[10px] leading-none whitespace-nowrap text-fg shadow-lg backdrop-blur-sm sm:text-[11px]`}
          style={{ left: label.left, top: label.top, "--delay": `${1500 + i * 150}ms` } as CSSProperties}
        >
          <span className={`size-1.5 rounded-full ${label.tone === "spruce" ? "bg-spruce" : "bg-ice"}`} />
          {label.text}
          <span className="text-fg-3">{label.value}</span>
        </span>
      ))}

      <span className="pointer-events-none absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-canvas/80 px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.12em] text-ice uppercase backdrop-blur-sm sm:top-4 sm:left-4 sm:text-[11px]">
        <Snowflake aria-hidden className="size-3.5" /> Winter
      </span>
      <span className="pointer-events-none absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-canvas/80 px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.12em] text-spruce uppercase backdrop-blur-sm sm:top-4 sm:right-4 sm:text-[11px]">
        <Sprout aria-hidden className="size-3.5" /> Summer
      </span>

      {/* Divider and handle */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 h-[106%] w-0.5 bg-snow/90 shadow-[0_0_0_1px_rgb(14_15_17/0.35),0_0_24px_rgb(146_198_210/0.55)]"
        style={{ left: "var(--split)", transform: `translate(-50%, -50%) rotate(${TILT_DEG}deg)` }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label="Season divider: drag to compare winter and summer"
        aria-orientation="horizontal"
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={winterShare}
        aria-valuetext={`${winterShare}% winter, ${100 - winterShare}% summer`}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-canvas/85 text-snow shadow-[0_8px_30px_rgb(0_0_0/0.5)] backdrop-blur-md transition-[scale,background-color] duration-200 group-active/split:scale-95 hover:bg-canvas focus-visible:outline-offset-4"
        style={{ left: "var(--split)" }}
      >
        <ChevronsLeftRight aria-hidden className="size-5" />
      </div>
    </div>
  );
}
