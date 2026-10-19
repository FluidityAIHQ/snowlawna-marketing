import { SeasonSlider } from "@/components/home/season-slider";
import { PropertyAerial } from "@/components/illustrations/property-aerial";
import {
  LAWN_ZONES,
  PropertyTraces,
  SNOW_ZONES,
  formatSqm,
  type Season,
} from "@/components/illustrations/property-scene";
import { sampleQuote } from "@/lib/sample-quote";

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
  return (
    <SeasonSlider
      winter={<SeasonScene season="winter" />}
      summer={<SeasonScene season="summer" />}
      description={`Aerial view of ${sampleQuote.address}, in winter on the left and summer on the right. The property is traced once, with ${areas(LAWN_ZONES)} in summer and ${areas(SNOW_ZONES)} in winter, and the same traces cover both seasons.`}
    />
  );
}
