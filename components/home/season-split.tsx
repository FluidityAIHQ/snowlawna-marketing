"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Compass, Snowflake, Sprout } from "lucide-react";
import { SeasonSlider, type SeasonSliderHandle } from "@/components/home/season-slider";
import { PropertyAerial } from "@/components/illustrations/property-aerial";
import {
  LAWN_ZONES,
  PropertyTraces,
  SNOW_ZONES,
  formatSqm,
  type Season,
} from "@/components/illustrations/property-scene";
import { sampleQuote } from "@/lib/sample-quote";

const ANIMATION_DURATION_MS = 900;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

const areas = (zones: readonly { sqft: number }[]) => zones.map((zone) => formatSqm(zone.sqft)).join(" and ");

/** One season's aerial with only its own traces and labels on it, so the slider's clip reveals them with the imagery. */
function SeasonScene({ season }: { season: Season }) {
  return (
    <>
      <PropertyAerial season={season} idPrefix="hero" className="size-full" />
      <PropertyTraces season={season} className="pointer-events-none absolute inset-0 size-full" animate />
    </>
  );
}

/** The hero's winter/summer comparison: one property, traced once, in both seasons. */
export function SeasonSplit() {
  const sliderRef = useRef<SeasonSliderHandle>(null);
  const animFrameRef = useRef(0);
  const [targetSeason, setTargetSeason] = useState<Season>("summer");

  const cancelAnimation = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = 0;
    }
    sliderRef.current?.setAnimating(false);
  }, []);

  useEffect(() => () => cancelAnimation(), [cancelAnimation]);

  const handleSeasonChange = useCallback((season: number) => {
    setTargetSeason(season >= 50 ? "summer" : "winter");
  }, []);

  const toggleSeason = () => {
    cancelAnimation();
    const slider = sliderRef.current;
    if (!slider) return;

    const from = slider.getSeason();
    let nextSeason: Season = targetSeason;
    let to = nextSeason === "summer" ? 0 : 100;

    if (Math.abs(from - to) < 1) {
      nextSeason = nextSeason === "summer" ? "winter" : "summer";
      to = nextSeason === "summer" ? 0 : 100;
    }

    setTargetSeason(nextSeason === "summer" ? "winter" : "summer");

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      slider.setSeason(to);
      return;
    }

    slider.setAnimating(true);
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / ANIMATION_DURATION_MS);
      const eased = easeInOutCubic(progress);
      slider.setSeason(from + (to - from) * eased);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        animFrameRef.current = 0;
        slider.setSeason(to);
        slider.setAnimating(false);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  };

  const toLawn = targetSeason === "summer";

  return (
    <>
      <div className="mb-2.5 flex items-center justify-between gap-2 px-1.5 py-0.5 text-xs">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-fg-2">
          <span className="flex size-5 items-center justify-center rounded-full bg-spruce/12 text-spruce">
            <Compass aria-hidden className="size-3.5" />
          </span>
          {sampleQuote.address}
        </span>
        <button
          type="button"
          onClick={toggleSeason}
          aria-label={toLawn ? "Animate slider to summer lawn" : "Animate slider to winter snow"}
          aria-pressed={!toLawn}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line-strong bg-surface-2/80 px-2.5 py-1 text-[11px] font-medium text-fg-2 transition-colors hover:border-fg-3 hover:bg-surface-3 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
        >
          {toLawn ? (
            <>
              <Sprout aria-hidden className="size-3.5 text-spruce" />
              <span>Show lawn</span>
            </>
          ) : (
            <>
              <Snowflake aria-hidden className="size-3.5 text-ice" />
              <span>Show snow</span>
            </>
          )}
        </button>
      </div>
      <SeasonSlider
        sliderRef={sliderRef}
        onUserInteract={cancelAnimation}
        onSeasonChange={handleSeasonChange}
        winter={<SeasonScene season="winter" />}
        summer={<SeasonScene season="summer" />}
        description={`Aerial view of ${sampleQuote.address}, in winter on the left and summer on the right. The property is traced once, with ${areas(LAWN_ZONES)} in summer and ${areas(SNOW_ZONES)} in winter, and the same traces cover both seasons.`}
      />
    </>
  );
}



