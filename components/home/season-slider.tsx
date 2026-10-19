"use client";

import {
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type Ref,
} from "react";
import { Snowflake, Sprout } from "lucide-react";

// The divider position is the --season custom property (0–100, the share of the view in winter),
// registered in globals.css. Dragging writes it to the frame at most once per animation frame, and
// everything that moves follows with transforms on its own layer, so the scenes never re-render,
// re-lay out or repaint. React state only carries the rounded value for the slider's ARIA attributes.

const STEP = 2;
const PAGE = 10;

/** The divider line, from the frame's left edge. */
const LINE = "calc(var(--season, 50) * 1cqw)";
/** The handle follows the line but stops inside the frame. */
const HANDLE = `clamp(1.5rem, ${LINE}, calc(100cqw - 1.5rem))`;
/** Handle radius + gap + tag inset + tag width: how close the handle gets before it nudges a season tag aside. */
const TAG_CLEARANCE = "7.25rem";

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export type SeasonSliderHandle = {
  getSeason: () => number;
  setSeason: (next: number) => void;
  setAnimating: (animating: boolean) => void;
};

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
  "season-mover pointer-events-none absolute top-1/2 flex w-[5.25rem] -translate-y-1/2 items-center justify-center gap-1.5 rounded-full bg-surface/90 py-1.5 text-xs font-medium text-fg shadow-[0_2px_8px_rgb(0_0_0/0.16),0_1px_2px_rgb(0_0_0/0.08)] ring-1 ring-line/65 backdrop-blur-md will-change-transform";

export function SeasonSlider({
  winter,
  summer,
  overlay,
  description,
  children,
  sliderRef,
  onUserInteract,
  onSeasonChange,
}: {
  winter: ReactNode;
  summer: ReactNode;
  /** Drawn over both seasons, under the divider. */
  overlay?: ReactNode;
  /** Screen-reader description of the image, read with the slider. */
  description: string;
  /** Labels drawn above the divider. */
  children?: ReactNode;
  sliderRef?: Ref<SeasonSliderHandle>;
  /** Fired when a pointer or keyboard gesture begins so external animations can cancel. */
  onUserInteract?: () => void;
  /** Fired when the user moves the divider via pointer or keyboard. */
  onSeasonChange?: (season: number) => void;
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

  const apply = (next: number, notifyUser = false) => {
    const clamped = clamp(next);
    position.current = clamped;
    rootRef.current?.style.setProperty("--season", clamped.toFixed(2));
    setValue(Math.round(clamped));
    if (notifyUser) onSeasonChange?.(clamped);
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

  const setDragging = (dragging: boolean) => rootRef.current?.toggleAttribute("data-dragging", dragging);
  const setAnimating = (animating: boolean) => rootRef.current?.toggleAttribute("data-animating", animating);

  useImperativeHandle(sliderRef, () => ({
    getSeason: current,
    setSeason: (next: number) => {
      if (intro) setIntro(false);
      apply(next);
    },
    setAnimating,
  }));

  // The frame's on-screen box, so this stays right while the hero's entrance animation scales it.
  const valueAt = (clientX: number) => {
    const box = rootRef.current?.getBoundingClientRect();
    if (!box || box.width === 0) return position.current;
    return clamp(((clientX - box.left) / box.width) * 100);
  };

  const grabFocus = () => handleRef.current?.focus({ preventScroll: true });

  const follow = (clientX: number) => {
    pointerX.current = clientX;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      apply(valueAt(pointerX.current), true);
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

    onUserInteract?.();
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
    else if (mouse) apply(valueAt(event.clientX), true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const active = gesture.current;
    if (!active || active.id !== event.pointerId) return;
    if (!active.dragging) {
      if (Math.abs(event.clientX - active.startX) < (active.pending ? 10 : 4)) return;
      if (active.pending) grabFocus();
      active.dragging = true;
      active.pending = false;
      onUserInteract?.();
      setDragging(true);
    }
    follow(event.clientX - active.offset);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const active = gesture.current;
    if (!active || active.id !== event.pointerId) return;
    if (active.pending) {
      grabFocus();
      apply(valueAt(event.clientX), true);
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
    onUserInteract?.();
    takeOver();
    apply(clamp(Math.round(targets[event.key])), true);
  };

  return (
    <div
      ref={rootRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={end}
      onLostPointerCapture={end}
      className={`group/season @container relative isolate aspect-[600/520] cursor-ew-resize overflow-hidden rounded-2xl bg-surface select-none [clip-path:inset(0_round_1rem)] [touch-action:pan-y_pinch-zoom] [@media(scripting:none)]:cursor-auto ${
        intro ? "anim-season-intro" : ""
      }`}
    >
      <div aria-hidden className="absolute inset-0">
        {summer}
      </div>
      {/* Winter sits in a clipped window whose right edge is the divider. The scene inside moves the
          other way, so the land stays put while the window slides across it. */}
      <div
        aria-hidden
        className="season-mover absolute inset-y-0 left-0 w-[100cqw] overflow-hidden will-change-transform"
        style={{
          transform: `translateX(calc((var(--season, 50) - 100) * 1cqw))`,
        }}
      >
        <div
          className="season-mover absolute inset-y-0 left-0 w-[100cqw] will-change-transform"
          style={{ transform: `translateX(calc((100 - var(--season, 50)) * 1cqw))` }}
        >
          {winter}
        </div>
      </div>
      {/* Static layers are grouped so the frame has few direct children: every one of them is restyled
          when --season changes, because the movers inherit it explicitly. */}
      <div
        aria-hidden
        className="season-inherit pointer-events-none absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_42%,transparent_62%,rgb(8_19_13/0.22))]"
      >
        {overlay}
      </div>

      <span
        aria-hidden
        className="season-mover pointer-events-none absolute inset-y-0 left-0 w-px -translate-x-1/2 bg-white/50 shadow-[0_0_10px_rgb(8_19_13/0.35),0_0_2px_rgb(8_19_13/0.2)] will-change-transform group-has-[[role=slider]:focus-visible]/season:w-0.5 group-has-[[role=slider]:focus-visible]/season:bg-primary"
        style={{ transform: `translateX(${LINE})` }}
      />

      <div className="season-inherit pointer-events-none absolute inset-0">
        {children}
        <p id={descriptionId} className="sr-only">
          {description}
        </p>
      </div>

      <span aria-hidden className={`left-3 ${tag}`} style={{ transform: `translateX(min(0px, ${HANDLE} - ${TAG_CLEARANCE}))` }}>
        <Snowflake aria-hidden className="size-3.5 text-ice" /> Winter
      </span>
      <span
        aria-hidden
        className={`right-3 ${tag}`}
        style={{ transform: `translateX(max(0px, ${HANDLE} + ${TAG_CLEARANCE} - 100cqw))` }}
      >
        <Sprout aria-hidden className="size-3.5 text-spruce" /> Summer
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
          className="pointer-events-auto absolute flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface/95 text-fg ring-1 ring-line/80 shadow-[0_4px_16px_rgb(8_19_13/0.28),0_1px_3px_rgb(8_19_13/0.14)] backdrop-blur-md outline-offset-4 before:absolute before:-inset-1.5 hover:bg-surface hover:shadow-[0_6px_20px_rgb(8_19_13/0.32),0_0_0_5px_rgb(255_255_255/0.18)] motion-safe:transition-[background-color,box-shadow,scale] motion-safe:duration-200 motion-safe:ease-out group-data-dragging/season:scale-95 group-data-dragging/season:bg-surface group-data-dragging/season:shadow-[0_8px_24px_rgb(8_19_13/0.38),0_0_0_6px_rgb(255_255_255/0.24)] forced-colors:border-2 forced-colors:border-[CanvasText]"
        >
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className="size-4 text-fg-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7.5 6.5 4 10l3.5 3.5M12.5 6.5 16 10l-3.5 3.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

