"use client";

import { useId, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { Snowflake, Sprout } from "lucide-react";

// The divider position is the --season custom property (0–100, the share of the view in winter),
// registered in globals.css. Dragging writes it to the frame at most once per animation frame, and
// everything that moves follows with transforms on its own layer, so the scenes never re-render,
// re-lay out or repaint. React state only carries the rounded value for the slider's ARIA attributes.

/** Width of the soft melt edge between the seasons, in % of the frame. */
const BAND = 10;
const SPAN = 1 + BAND / 100;
const STEP = 2;
const PAGE = 10;

/** The divider line, from the frame's left edge. It runs half a band past either edge so each season can fill the view. */
const LINE = `calc(var(--season, 50) * ${SPAN}cqw - ${BAND / 2}cqw)`;
/** The handle follows the line but stops 4px inside the frame. */
const HANDLE = `clamp(1.625rem, ${LINE}, calc(100cqw - 1.625rem))`;
/** Handle radius + gap + tag inset + tag width: how close the handle gets before it nudges a season tag aside. */
const TAG_CLEARANCE = "8.125rem";

// Alpha mask for the winter window, which is 110% of the frame wide (660 × 520 here): solid winter, then a
// band where noise thresholded against a gradient breaks the snow into patches, like a thaw line.
const MELT_SVG = [
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 660 520' preserveAspectRatio='none'>",
  "<linearGradient id='g' gradientUnits='userSpaceOnUse' x1='606' x2='654'><stop offset='0' stop-color='#fff'/><stop offset='1' stop-color='#000'/></linearGradient>",
  "<linearGradient id='e' gradientUnits='userSpaceOnUse' x1='648' x2='660'><stop offset='0' stop-color='#fff'/><stop offset='1' stop-color='#000'/></linearGradient>",
  "<mask id='m'><rect width='660' height='520' fill='url(#e)'/></mask>",
  "<filter id='f' x='0' y='0' width='1' height='1' color-interpolation-filters='sRGB'>",
  "<feTurbulence type='fractalNoise' baseFrequency='0.08' numOctaves='2' seed='6'/>",
  "<feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0' result='n'/>",
  "<feColorMatrix in='SourceGraphic' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0'/>",
  "<feComposite in2='n' operator='arithmetic' k2='1' k3='1.5' k4='-0.75'/>",
  "<feComponentTransfer><feFuncA type='linear' slope='4.5' intercept='-1.75'/></feComponentTransfer>",
  "</filter>",
  "<rect width='604' height='520' fill='#fff'/>",
  "<rect x='590' width='70' height='520' fill='url(#g)' filter='url(#f)' mask='url(#m)'/>",
  "</svg>",
].join("");
const MELT_MASK = `url("data:image/svg+xml,${encodeURIComponent(MELT_SVG)}")`;

const clamp = (value: number) => Math.min(100, Math.max(0, value));

type Gesture = {
  id: number;
  startX: number;
  /** Pointer distance from the handle's centre when it was grabbed, so the handle doesn't jump. */
  offset: number;
  dragging: boolean;
  /** A touch away from the handle: wait to see whether it's a tap, a drag or a page scroll. */
  pending: boolean;
};

const tag =
  "season-mover pointer-events-none absolute top-1/2 flex w-[5.75rem] -translate-y-1/2 items-center justify-center gap-1.5 rounded-full border border-line-strong bg-surface/92 py-1 font-mono text-[10px] font-medium tracking-[0.12em] uppercase shadow-sm backdrop-blur-md will-change-transform sm:text-[11px]";

export function SeasonSlider({
  winter,
  summer,
  overlay,
  description,
  children,
}: {
  winter: ReactNode;
  summer: ReactNode;
  /** Drawn over both seasons, under the divider. */
  overlay?: ReactNode;
  /** Screen-reader description of the image, read with the slider. */
  description: string;
  /** Labels drawn above the divider. */
  children?: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const position = useRef(50);
  const gesture = useRef<Gesture | null>(null);
  const frame = useRef(0);
  const pointerX = useRef(0);
  const [value, setValue] = useState(50);
  // The CSS intro sweep owns --season until the first interaction.
  const [intro, setIntro] = useState(true);
  const descriptionId = useId();

  const apply = (next: number) => {
    position.current = next;
    rootRef.current?.style.setProperty("--season", next.toFixed(2));
    setValue(Math.round(next));
  };

  const current = () => {
    const root = rootRef.current;
    if (!intro || !root) return position.current;
    const animated = Number.parseFloat(getComputedStyle(root).getPropertyValue("--season"));
    return Number.isFinite(animated) ? animated : position.current;
  };

  // Pin the divider where the intro has it, then hand control to the visitor.
  const takeOver = () => {
    if (!intro) return;
    apply(current());
    setIntro(false);
  };

  // The frame's on-screen box, so this stays right while the hero's entrance animation scales it.
  const valueAt = (clientX: number) => {
    const box = rootRef.current?.getBoundingClientRect();
    if (!box || box.width === 0) return position.current;
    return clamp((((clientX - box.left) / box.width) * 100 + BAND / 2) / SPAN);
  };

  const grabFocus = () => handleRef.current?.focus({ preventScroll: true });

  const setDragging = (dragging: boolean) => rootRef.current?.toggleAttribute("data-dragging", dragging);

  const follow = (clientX: number) => {
    pointerX.current = clientX;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      apply(valueAt(pointerX.current));
    });
  };

  const end = () => {
    if (!gesture.current) return;
    gesture.current = null;
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    setDragging(false);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (gesture.current || !event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    const handle = handleRef.current;
    const onHandle = !!handle && handle.contains(event.target as Node);
    const mouse = event.pointerType === "mouse";
    const box = handle?.getBoundingClientRect();

    takeOver();
    gesture.current = {
      id: event.pointerId,
      startX: event.clientX,
      offset: onHandle && box ? event.clientX - (box.left + box.width / 2) : 0,
      dragging: onHandle,
      pending: !onHandle && !mouse,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    if (mouse) event.preventDefault();
    if (onHandle || mouse) grabFocus();

    if (onHandle) setDragging(true);
    else if (mouse) apply(valueAt(event.clientX));
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const active = gesture.current;
    if (!active || active.id !== event.pointerId) return;
    if (!active.dragging) {
      if (Math.abs(event.clientX - active.startX) < (active.pending ? 10 : 4)) return;
      if (active.pending) grabFocus();
      active.dragging = true;
      active.pending = false;
      setDragging(true);
    }
    follow(event.clientX - active.offset);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const active = gesture.current;
    if (!active || active.id !== event.pointerId) return;
    if (active.pending) {
      grabFocus();
      apply(valueAt(event.clientX));
    }
    end();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const from = current();
    const step = event.shiftKey ? PAGE : STEP;
    const targets: Record<string, number> = {
      ArrowLeft: from - step,
      ArrowDown: from - step,
      ArrowRight: from + step,
      ArrowUp: from + step,
      PageDown: from - PAGE,
      PageUp: from + PAGE,
      Home: 0,
      End: 100,
    };
    if (!(event.key in targets)) return;
    event.preventDefault();
    takeOver();
    apply(clamp(Math.round(targets[event.key])));
  };

  return (
    <div
      ref={rootRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={end}
      onLostPointerCapture={end}
      className={`group/season @container relative isolate aspect-[600/520] cursor-ew-resize overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-stage select-none [touch-action:pan-y_pinch-zoom] [@media(scripting:none)]:cursor-auto ${
        intro ? "anim-season-intro" : ""
      }`}
    >
      <div aria-hidden className="absolute inset-0">
        {summer}
      </div>
      {/* Winter sits in a window whose feathered right edge is the divider. The scene inside moves the
          other way, so the land stays put while the window slides across it. */}
      <div
        aria-hidden
        className="season-mover absolute inset-y-0 left-0 overflow-hidden will-change-transform"
        style={{
          width: `${100 * SPAN}cqw`,
          transform: `translateX(calc((var(--season, 50) - 100) * ${SPAN}cqw))`,
          maskImage: MELT_MASK,
          WebkitMaskImage: MELT_MASK,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      >
        <div
          className="season-mover absolute inset-y-0 left-0 w-[100cqw] will-change-transform"
          style={{ transform: `translateX(calc((100 - var(--season, 50)) * ${SPAN}cqw))` }}
        >
          {winter}
        </div>
      </div>
      {/* Static layers are grouped so the frame has few direct children: every one of them is restyled
          when --season changes, because the movers inherit it explicitly. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_42%,transparent_58%,rgb(8_19_13/0.28))]"
      >
        {overlay}
      </div>

      <span
        aria-hidden
        className="season-mover pointer-events-none absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-white/95 shadow-[0_0_0_1px_rgb(8_19_13/0.22),0_0_16px_rgb(86_202_139/0.4)] will-change-transform group-has-[[role=slider]:focus-visible]/season:bg-spruce"
        style={{ transform: `translateX(${LINE})` }}
      />

      <div className="pointer-events-none absolute inset-0 rounded-[calc(1rem-1px)] shadow-[inset_0_1px_0_rgb(255_255_255/0.14)]">
        {children}
        <p id={descriptionId} className="sr-only">
          {description}
        </p>
      </div>

      <span aria-hidden className={`left-3 text-ice ${tag}`} style={{ transform: `translateX(min(0px, ${HANDLE} - ${TAG_CLEARANCE}))` }}>
        <Snowflake aria-hidden className="size-3.5" /> Winter
      </span>
      <span
        aria-hidden
        className={`right-3 text-spruce ${tag}`}
        style={{ transform: `translateX(max(0px, ${HANDLE} + ${TAG_CLEARANCE} - 100cqw))` }}
      >
        <Sprout aria-hidden className="size-3.5" /> Summer
      </span>

      {/* Without scripts the divider can't move, so the handle isn't offered. */}
      <div
        className="season-mover pointer-events-none absolute top-1/2 left-0 will-change-transform [@media(scripting:none)]:hidden"
        style={{ transform: `translateX(${HANDLE})` }}
      >
        <div
          ref={handleRef}
          role="slider"
          tabIndex={0}
          aria-label="Season divider"
          aria-describedby={descriptionId}
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-valuetext={`${value}% winter, ${100 - value}% summer`}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-canvas ring-2 ring-white/85 shadow-[0_10px_28px_-6px_rgb(8_19_13/0.55)] outline-offset-4 hover:bg-primary-hover hover:shadow-[0_10px_28px_-6px_rgb(8_19_13/0.55),0_0_0_6px_color-mix(in_oklab,var(--color-spruce)_25%,transparent)] motion-safe:transition-[background-color,box-shadow,scale] motion-safe:duration-200 motion-safe:ease-out group-data-dragging/season:scale-95 group-data-dragging/season:shadow-[0_10px_28px_-6px_rgb(8_19_13/0.55),0_0_0_7px_color-mix(in_oklab,var(--color-spruce)_32%,transparent)] forced-colors:border-2 forced-colors:border-[CanvasText]"
        >
          <svg aria-hidden viewBox="0 0 20 20" className="size-4" fill="currentColor" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
            <path d="M7.6 6.2 3.8 10l3.8 3.8ZM12.4 6.2l3.8 3.8-3.8 3.8Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
