import type { CSSProperties } from "react";
import { SeasonSlider } from "@/components/home/season-slider";
import { PropertyAerial } from "@/components/illustrations/property-aerial";
import { PropertyTraces } from "@/components/illustrations/property-scene";
import { sampleQuote } from "@/lib/sample-quote";

const [lawn, snowSurface, walkway] = sampleQuote.lines;

// Positions are in % of the 600×520 scene. "start" labels sit just right of their point.
const traceLabels = [
  { left: "50%", top: "13.5%", align: "center", tone: "spruce", text: "Lawn", value: lawn.qty },
  { left: "69.8%", top: "72%", align: "center", tone: "snow", text: "Snow surface", value: snowSurface.qty },
  { left: "43.6%", top: "61%", align: "start", tone: "snow", text: "Walkway", value: walkway.qty },
] as const;

/** The hero's winter/summer comparison: one property, traced once, in both seasons. */
export function SeasonSplit() {
  return (
    <SeasonSlider
      winter={<PropertyAerial season="winter" idPrefix="hero" className="size-full" />}
      summer={<PropertyAerial season="summer" idPrefix="hero" className="size-full" />}
      overlay={<PropertyTraces className="pointer-events-none absolute inset-0 size-full" animate seasonFade />}
      description={`Aerial view of ${sampleQuote.address}, in winter on the left and summer on the right. The property is traced once, with ${lawn.qty} of lawn, ${snowSurface.qty} of snow surface and ${walkway.qty} of walkway, and the same traces cover both seasons.`}
    >
      {traceLabels.map((label, i) => (
        <span
          key={label.text}
          aria-hidden
          className={`season-inherit pointer-events-none absolute -translate-y-1/2 ${label.align === "center" ? "-translate-x-1/2" : ""} transition-opacity duration-300 motion-reduce:transition-none`}
          style={{
            left: label.left,
            top: label.top,
            opacity:
              label.tone === "spruce"
                ? "calc(0.25 + 0.75 * (100 - var(--season, 50)) / 100)"
                : "calc(0.25 + 0.75 * var(--season, 50) / 100)",
          }}
        >
          <span
            className="anim-fade flex items-center gap-1.5 rounded-full bg-surface/92 px-2.5 py-1 text-[11px] leading-none font-medium whitespace-nowrap text-fg shadow-[0_2px_8px_rgb(0_0_0/0.18),0_1px_2px_rgb(0_0_0/0.1)] ring-1 ring-line/65 backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-xs"
            style={{ "--delay": `${1500 + i * 150}ms` } as CSSProperties}
          >
            <span className={`size-1.5 shrink-0 rounded-full ${label.tone === "spruce" ? "bg-spruce" : "bg-fg-2"}`} />
            <span>{label.text}</span>
            <span className="font-normal text-fg-3 tabular-nums">{label.value}</span>
          </span>
        </span>
      ))}
    </SeasonSlider>
  );
}

