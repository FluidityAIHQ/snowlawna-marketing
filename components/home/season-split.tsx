import type { CSSProperties } from "react";
import { SeasonSlider } from "@/components/home/season-slider";
import { PropertyAerial } from "@/components/illustrations/property-aerial";
import { PropertyTraces } from "@/components/illustrations/property-scene";
import { sampleQuote } from "@/lib/sample-quote";

const [lawn, snowSurface, walkway] = sampleQuote.lines;

// Positions are in % of the 600×520 scene. "start" labels sit just right of their point.
const traceLabels = [
  { left: "50%", top: "13.8%", align: "center", tone: "spruce", text: "Lawn", value: lawn.qty },
  { left: "69.8%", top: "71%", align: "center", tone: "ice", text: "Snow surface", value: snowSurface.qty },
  { left: "43.6%", top: "62%", align: "start", tone: "ice", text: "Walkway", value: walkway.qty },
] as const;

/** The hero's winter/summer comparison: one property, traced once, in both seasons. */
export function SeasonSplit() {
  return (
    <SeasonSlider
      winter={<PropertyAerial season="winter" idPrefix="hero" className="size-full" />}
      summer={<PropertyAerial season="summer" idPrefix="hero" className="size-full" />}
      overlay={<PropertyTraces className="pointer-events-none absolute inset-0 size-full" animate />}
      description={`Aerial view of ${sampleQuote.address}, in winter on the left and summer on the right. The property is traced once, with ${lawn.qty} of lawn, ${snowSurface.qty} of snow surface and ${walkway.qty} of walkway, and the same traces cover both seasons.`}
    >
      {traceLabels.map((label, i) => (
        <span
          key={label.text}
          aria-hidden
          className={`anim-fade pointer-events-none absolute flex -translate-y-1/2 items-center ${label.align === "center" ? "-translate-x-1/2" : ""} gap-1.5 rounded-md border border-line-strong bg-surface/92 px-2 py-1 font-mono text-[10px] leading-none whitespace-nowrap text-fg shadow-md backdrop-blur-md sm:text-[11px]`}
          style={{ left: label.left, top: label.top, "--delay": `${1500 + i * 150}ms` } as CSSProperties}
        >
          <span className={`size-1.5 rounded-full ${label.tone === "spruce" ? "bg-spruce" : "bg-ice"}`} />
          {label.text}
          <span className="text-fg-3">{label.value}</span>
        </span>
      ))}
    </SeasonSlider>
  );
}
