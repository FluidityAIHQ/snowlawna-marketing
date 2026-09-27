import { TourTabs } from "@/components/home/tour-tabs";
import { AppFrame } from "@/components/mockups/app-frame";
import { ContractsPanel, DispatchPanel, MapPanel, MeasurePanel } from "@/components/mockups/panels";
import { SectionHeading } from "@/components/section-heading";

export function ProductTour() {
  return (
    <section id="product" aria-labelledby="product-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="hairline-x absolute inset-x-0 top-0 h-px" />
      <div className="wrap">
        <SectionHeading id="product-title" eyebrow="The workspace" align="center" title="Everything the dispatch desk juggles, on one screen.">
          <p>
            Contracts, quotes, routes and crews share the same records. The job you sold in October is on the plow
            route the night it snows.
          </p>
        </SectionHeading>

        <div data-reveal className="mt-12">
          <TourTabs
            panels={[
              <AppFrame key="dispatch" path="/operations/dispatch" active="dispatch" section="Operations" title="Dispatch">
                <DispatchPanel />
              </AppFrame>,
              <AppFrame key="map" path="/operations/map" active="map" section="Operations" title="Live map">
                <MapPanel />
              </AppFrame>,
              <AppFrame key="contracts" path="/contracts" active="contracts" section="Sales" title="Contracts">
                <ContractsPanel />
              </AppFrame>,
              <AppFrame key="quotations" path="/quotations/new" active="quotations" section="Sales · Quotations" title="New measure">
                <MeasurePanel />
              </AppFrame>,
            ]}
          />
          <p className="mt-5 text-center font-mono text-[11px] tracking-wide text-fg-3">
            Screens shown with illustrative data.
          </p>
        </div>
      </div>
    </section>
  );
}
