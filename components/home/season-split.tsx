import type { CSSProperties } from "react";
import { SeasonSlider } from "@/components/home/season-slider";
import { PropertyAerial } from "@/components/illustrations/property-aerial";
import { LAWN_ZONES, PropertyTraces, SNOW_ZONES, formatSqm } from "@/components/illustrations/property-scene";
import { sampleQuote } from "@/lib/sample-quote";

const SCENE_WIDTH = 600;
const SCENE_HEIGHT = 520;

const LAWN_LABEL_OPACITY = "calc(0.25 + 0.75 * (100 - var(--season, 50)) / 100)";
const SNOW_LABEL_OPACITY = "calc(0.25 + 0.75 * var(--season, 50) / 100)";

const zoneLabels = [
  ...LAWN_ZONES.map((zone) => ({
    key: `lawn-${zone.x}-${zone.y}`,
    left: `${((zone.x + zone.width / 2) / SCENE_WIDTH) * 100}%`,
    top: `${((zone.y + zone.height / 2) / SCENE_HEIGHT) * 100}%`,
    area: formatSqm(zone.sqft),
    opacity: LAWN_LABEL_OPACITY,
  })),
  ...SNOW_ZONES.map((zone) => ({
    key: `snow-${zone.x}-${zone.y}`,
    left: `${((zone.x + zone.width / 2) / SCENE_WIDTH) * 100}%`,
    top: `${((zone.y + zone.height / 2) / SCENE_HEIGHT) * 100}%`,
    area: formatSqm(zone.sqft),
    opacity: SNOW_LABEL_OPACITY,
  })),
];

/** The hero's winter/summer comparison: one property, traced once, in both seasons. */
export function SeasonSplit() {
  return (
    <SeasonSlider
      winter={<PropertyAerial season="winter" idPrefix="hero" className="size-full" />}
      summer={<PropertyAerial season="summer" idPrefix="hero" className="size-full" />}
      overlay={<PropertyTraces className="pointer-events-none absolute inset-0 size-full" animate seasonFade />}
      description={`Aerial view of ${sampleQuote.address}, in winter on the left and summer on the right. The property is traced once, with ${formatSqm(LAWN_ZONES[0].sqft)}, ${formatSqm(LAWN_ZONES[1].sqft)} and ${formatSqm(LAWN_ZONES[2].sqft)} in summer and ${formatSqm(SNOW_ZONES[0].sqft)} and ${formatSqm(SNOW_ZONES[1].sqft)} in winter, and the same traces cover both seasons.`}
    >
      {zoneLabels.map((zone, i) => (
        <span
          key={zone.key}
          aria-hidden
          className="season-inherit pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: zone.left,
            top: zone.top,
            opacity: zone.opacity,
          }}
        >
          <span
            className="anim-fade block text-[11px] leading-none font-semibold whitespace-nowrap text-ink tabular-nums [text-shadow:0_0_2px_rgb(255_255_255/0.98),0_0_6px_rgb(255_255_255/0.92),0_0_12px_rgb(255_255_255/0.75)] sm:text-xs"
            style={{ "--delay": `${1500 + i * 120}ms` } as CSSProperties}
          >
            {zone.area}
          </span>
        </span>
      ))}
    </SeasonSlider>
  );
}


