import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Layers,
  Maximize2,
  Minus,
  PenLine,
  Plus,
  Search,
  SlidersHorizontal,
  Spline,
  Square,
  Trash2,
} from "lucide-react";
import { PropertyScene, PropertyTraces } from "@/components/illustrations/property-scene";
import { ROUTES, StreetMap } from "@/components/illustrations/street-map";
import { RouteTag, StatusPill } from "@/components/mockups/app-frame";
import { sampleQuote } from "@/lib/sample-quote";

const ROUTE_COLOR = Object.fromEntries(ROUTES.map((route) => [route.name, route.color]));

const chip =
  "inline-flex h-7 items-center gap-1.5 rounded-md border border-line bg-surface-2/60 px-2.5 text-[12px] whitespace-nowrap text-fg-2";

/* ---------------- Dispatch ---------------- */

const JOBS = [
  { time: "04:10", property: "18 Juniper Cres.", service: "Plow + salt", route: "Route 3", crew: "Plow 12", status: "Done" },
  { time: "04:25", property: "402 Aspen Row", service: "Plow", route: "Route 3", crew: "Plow 12", status: "Done" },
  { time: "04:40", property: "77 Birchwood Ln", service: "Walkway clear", route: "Route 3", crew: "Crew B", status: "In progress" },
  { time: "04:55", property: "Frostline Plaza lot", service: "Lot plow + salt", route: "Route 5", crew: "Loader 3", status: "In progress" },
  { time: "05:10", property: "1260 Harbour Rd", service: "Plow", route: "Route 5", crew: "Loader 3", status: "Scheduled" },
  { time: "05:20", property: "35 Maple Hollow", service: "Plow + salt", route: "Route 7", crew: "Plow 8", status: "Delayed" },
  { time: "05:35", property: "9 Cedar Bend", service: "Walkway clear", route: "Route 7", crew: "Crew D", status: "Scheduled" },
] as const;

const statusTone = {
  Done: "success",
  "In progress": "info",
  Scheduled: "neutral",
  Delayed: "warning",
} as const;

export function DispatchPanel() {
  return (
    <div className="flex h-full">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3 @xl:px-5">
          <span className={`${chip} text-fg`}>
            <ChevronLeft aria-hidden className="size-3.5 text-fg-3" />
            <CalendarDays aria-hidden className="size-3.5 text-fg-3" />
            Tue, Jan 12
            <ChevronRight aria-hidden className="size-3.5 text-fg-3" />
          </span>
          <span className="inline-flex h-7 items-center rounded-md bg-fg/12 px-2.5 text-[12px] font-medium text-fg">
            Storm response
          </span>
          <span className={`${chip} hidden @2xl:inline-flex`}>
            Service: Snow <ChevronDown aria-hidden className="size-3" />
          </span>
          <span className={`${chip} hidden @4xl:inline-flex`}>
            Status: All <ChevronDown aria-hidden className="size-3" />
          </span>
        </div>

        <dl className="grid grid-cols-4 border-b border-line text-[12px]">
          {[
            ["Jobs", "52", "text-fg"],
            ["Done", "38", "text-success"],
            ["In progress", "9", "text-fg"],
            ["Delayed", "5", "text-warning"],
          ].map(([label, value, color]) => (
            <div key={label} className="border-r border-line px-4 py-2.5 last:border-r-0 @xl:px-5">
              <dt className="truncate text-fg-3">{label}</dt>
              <dd className={`font-wide text-lg font-semibold ${color}`}>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="min-h-0 flex-1 overflow-hidden">
          <table className="w-full text-left text-[12.5px]">
            <thead className="text-[11px] text-fg-3">
              <tr className="border-b border-line">
                <th className="py-2 pr-2 pl-4 font-medium @xl:pl-5">Time</th>
                <th className="px-2 py-2 font-medium">Property</th>
                <th className="hidden px-2 py-2 font-medium @2xl:table-cell">Service</th>
                <th className="hidden px-2 py-2 font-medium @4xl:table-cell">Route</th>
                <th className="hidden px-2 py-2 font-medium @5xl:table-cell">Crew</th>
                <th className="py-2 pr-4 pl-2 font-medium @xl:pr-5">Status</th>
              </tr>
            </thead>
            <tbody>
              {JOBS.map((job, i) => (
                <tr key={job.time} className={`border-b border-line/70 ${i === 2 ? "bg-fg/[0.06]" : ""}`}>
                  <td className="relative py-2.5 pr-2 pl-4 font-mono text-[12px] text-fg-3 @xl:pl-5">
                    {i === 2 && <span className="absolute inset-y-0 left-0 w-0.5 bg-fg" />}
                    {job.time}
                  </td>
                  <td className="px-2 py-2.5 font-medium text-fg">{job.property}</td>
                  <td className="hidden px-2 py-2.5 text-fg-2 @2xl:table-cell">{job.service}</td>
                  <td className="hidden px-2 py-2.5 @4xl:table-cell">
                    <RouteTag color={ROUTE_COLOR[job.route]}>{job.route}</RouteTag>
                  </td>
                  <td className="hidden px-2 py-2.5 text-fg-2 @5xl:table-cell">{job.crew}</td>
                  <td className="py-2.5 pr-4 pl-2 @xl:pr-5">
                    <StatusPill tone={statusTone[job.status]}>{job.status}</StatusPill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <aside className="hidden w-72 shrink-0 flex-col gap-4 border-l border-line bg-canvas/40 p-5 @6xl:flex">
        <div>
          <p className="font-mono text-[10px] tracking-[0.14em] text-fg-3 uppercase">Job · 04:40</p>
          <p className="mt-1 text-[15px] font-semibold text-fg">77 Birchwood Ln</p>
          <p className="text-[12px] text-fg-3">Chen Residence · Seasonal snow</p>
        </div>
        <div className="grid gap-3 text-[12px]">
          {[
            ["Status", "In progress"],
            ["Scheduled", "04:40"],
            ["Crew", "Crew B · Priya"],
          ].map(([label, value]) => (
            <label key={label} className="grid gap-1">
              <span className="text-fg-3">{label}</span>
              <span className="flex h-8 items-center justify-between rounded-md border border-line bg-surface-2/70 px-2.5 text-fg">
                {value}
                <ChevronDown aria-hidden className="size-3.5 text-fg-3" />
              </span>
            </label>
          ))}
          <div className="grid gap-1">
            <span className="text-fg-3">Notes</span>
            <p className="rounded-md border border-line bg-surface-2/70 p-2.5 leading-relaxed text-fg-2">
              Clear the front walk and side steps, then salt. Gate code is in the client file.
            </p>
          </div>
        </div>
        <ol className="grid gap-2 border-t border-line pt-4 text-[12px]">
          <li className="flex gap-2 text-fg-2">
            <span className="font-mono text-fg-3">04:41</span> Crew B checked in on site
          </li>
          <li className="flex gap-2 text-fg-2">
            <span className="font-mono text-fg-3">03:30</span> Storm response started
          </li>
        </ol>
        <span className="mt-auto inline-flex h-8 items-center justify-center rounded-md bg-primary text-[12px] font-medium text-canvas">
          Save changes
        </span>
      </aside>
    </div>
  );
}

/* ---------------- Live map ---------------- */

const VEHICLES = [
  { name: "Plow 12", status: "En route", tone: "info" },
  { name: "Loader 3", status: "Salting", tone: "success" },
  { name: "Plow 8", status: "Delayed 12 min", tone: "warning" },
  { name: "Mower 4", status: "In storage", tone: "neutral" },
] as const;

const ROUTE_PROGRESS = { r3: [9, 14], r5: [4, 11], r7: [3, 16] } as const;

export function MapPanel() {
  return (
    <div className="flex h-full">
      <div className="relative min-w-0 flex-1 overflow-hidden">
        <StreetMap className="absolute inset-0 size-full" animate />
        <span className="absolute top-3 left-3 flex h-8 w-48 items-center gap-2 rounded-md border border-line-strong bg-surface/92 px-2.5 text-[12px] text-fg-3 shadow-md backdrop-blur">
          <Search aria-hidden className="size-3.5" /> Search routes
        </span>
        <div className="absolute top-3 right-3 hidden gap-1.5 @xl:flex">
          {[
            ["Traffic", false],
            ["Pickets", false],
            ["Visits", true],
          ].map(([label, on]) => (
            <span
              key={label as string}
              className={`inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-[12px] shadow-md backdrop-blur ${
                on ? "border-fg/40 bg-surface/95 font-medium text-fg" : "border-line-strong bg-surface/92 text-fg-2"
              }`}
            >
              {on ? <Check aria-hidden className="size-3.5" /> : <Layers aria-hidden className="size-3.5" />}
              {label}
            </span>
          ))}
        </div>
        <div className="absolute right-3 bottom-3 grid overflow-hidden rounded-md border border-line-strong bg-surface/92 text-fg-2 shadow-md">
          <span className="flex size-8 items-center justify-center border-b border-line">
            <Maximize2 aria-hidden className="size-3.5" />
          </span>
          <span className="flex size-8 items-center justify-center border-b border-line">
            <Plus aria-hidden className="size-3.5" />
          </span>
          <span className="flex size-8 items-center justify-center">
            <Minus aria-hidden className="size-3.5" />
          </span>
        </div>
      </div>

      <aside className="hidden w-64 shrink-0 flex-col border-l border-line bg-canvas/40 @4xl:flex">
        <div className="border-b border-line p-4">
          <p className="font-mono text-[10px] tracking-[0.14em] text-fg-3 uppercase">Routes · Storm 03</p>
          <ul className="mt-3 grid gap-3">
            {ROUTES.map((route) => {
              const [done, total] = ROUTE_PROGRESS[route.id];
              return (
                <li key={route.id} className={`rounded-lg p-2.5 ${route.id === "r3" ? "bg-fg/[0.07] ring-1 ring-fg/25" : ""}`}>
                  <div className="flex items-center justify-between text-[12.5px]">
                    <RouteTag color={route.color}>
                      <span className="font-medium text-fg">{route.name}</span>
                    </RouteTag>
                    <span className="font-mono text-[11px] text-fg-3">
                      {done}/{total}
                    </span>
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-3">
                    <div className="h-full rounded-full" style={{ width: `${(done / total) * 100}%`, backgroundColor: route.color }} />
                  </div>
                  <p className="mt-1.5 text-[11px] text-fg-3">{route.vehicle}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="p-4">
          <p className="font-mono text-[10px] tracking-[0.14em] text-fg-3 uppercase">Vehicles</p>
          <ul className="mt-3 grid gap-2.5 text-[12.5px]">
            {VEHICLES.map((vehicle) => (
              <li key={vehicle.name} className="flex items-center justify-between gap-2">
                <span className="text-fg">{vehicle.name}</span>
                <StatusPill tone={vehicle.tone}>{vehicle.status}</StatusPill>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

/* ---------------- Contracts ---------------- */

const CONTRACTS = [
  { client: "Hollis Residence", property: "18 Juniper Cres.", service: "Snow & lawn", route: "Route 3", price: sampleQuote.total, status: "Active" },
  { client: "Aspen Row Condos", property: "402 Aspen Row", service: "Snow", route: "Route 3", price: "$18,400.00", status: "Active" },
  { client: "Chen Residence", property: "77 Birchwood Ln", service: "Snow", route: "Route 3", price: "$1,180.00", status: "Active" },
  { client: "Frostline Plaza", property: "9 Frostline Rd", service: "Snow", route: "Route 5", price: "$26,750.00", status: "Pending" },
  { client: "Okafor Residence", property: "35 Maple Hollow", service: "Snow & lawn", route: "Route 7", price: "$3,140.00", status: "Active" },
  { client: "Birchwood Dental", property: "1260 Harbour Rd", service: "Lawn", route: "Route 5", price: "$4,980.00", status: "Active" },
  { client: "Lindqvist Residence", property: "9 Cedar Bend", service: "Snow", route: "Route 7", price: "$960.00", status: "Cancelled" },
] as const;

const contractTone = { Active: "success", Pending: "warning", Cancelled: "danger" } as const;

export function ContractsPanel() {
  return (
    <div className="flex h-full flex-col">
      <dl className="grid grid-cols-3 gap-3 border-b border-line p-4 @xl:px-5">
        {[
          ["Active contracts", "128"],
          ["Season value", "$412,380"],
          ["Pending", "9"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-line bg-surface-2/50 px-3 py-2.5">
            <dt className="truncate text-[11px] text-fg-3">{label}</dt>
            <dd className="mt-0.5 truncate font-wide text-base font-semibold text-fg @2xl:text-lg">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex items-center gap-2 border-b border-line px-4 py-3 @xl:px-5">
        <span className="flex h-7 min-w-0 flex-1 items-center gap-2 rounded-md border border-line bg-canvas/60 px-2.5 text-[12px] text-fg-3 @3xl:max-w-64">
          <Search aria-hidden className="size-3.5 shrink-0" />
          <span className="truncate">Search clients or addresses</span>
        </span>
        <span className={`${chip} hidden @3xl:inline-flex`}>
          Season 2026–27 <ChevronDown aria-hidden className="size-3" />
        </span>
        <span className={`${chip} text-fg`}>
          <SlidersHorizontal aria-hidden className="size-3.5" /> Filter
          <span className="rounded bg-fg/12 px-1 font-mono text-[10px] text-fg">2</span>
        </span>
        <span className={`${chip} ml-auto hidden @2xl:inline-flex`}>
          <Download aria-hidden className="size-3.5" /> Export CSV
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <table className="w-full text-left text-[12.5px]">
          <thead className="text-[11px] text-fg-3">
            <tr className="border-b border-line">
              <th className="py-2 pr-2 pl-4 font-medium @xl:pl-5">Client</th>
              <th className="hidden px-2 py-2 font-medium @4xl:table-cell">Property</th>
              <th className="hidden px-2 py-2 font-medium @2xl:table-cell">Service</th>
              <th className="hidden px-2 py-2 font-medium @5xl:table-cell">Route</th>
              <th className="px-2 py-2 text-right font-medium">Season price</th>
              <th className="hidden py-2 pr-4 pl-2 font-medium @xl:table-cell @xl:pr-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {CONTRACTS.map((contract) => (
              <tr key={contract.client} className="border-b border-line/70">
                <td className="py-2.5 pr-2 pl-4 font-medium text-fg @xl:pl-5">{contract.client}</td>
                <td className="hidden px-2 py-2.5 text-fg-2 @4xl:table-cell">{contract.property}</td>
                <td className="hidden px-2 py-2.5 text-fg-2 @2xl:table-cell">{contract.service}</td>
                <td className="hidden px-2 py-2.5 @5xl:table-cell">
                  <RouteTag color={ROUTE_COLOR[contract.route]}>{contract.route}</RouteTag>
                </td>
                <td className="px-2 py-2.5 text-right font-mono text-[12px] text-fg tabular-nums">{contract.price}</td>
                <td className="hidden py-2.5 pr-4 pl-2 @xl:table-cell @xl:pr-5">
                  <StatusPill tone={contractTone[contract.status]}>{contract.status}</StatusPill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-[11px] text-fg-3 @xl:px-5">
        <span>1–7 of 128</span>
        <span className="flex gap-1">
          <ChevronLeft aria-hidden className="size-4" />
          <ChevronRight aria-hidden className="size-4" />
        </span>
      </div>
    </div>
  );
}

/* ---------------- Quotations: measure workspace ---------------- */

const TOOLS = [
  { label: "Lawn area", Icon: Square, tone: "text-spruce" },
  { label: "Snow surface", Icon: Square, tone: "text-fg" },
  { label: "Driveway", Icon: Spline, tone: "text-fg" },
  { label: "Walkway", Icon: Spline, tone: "text-fg" },
  { label: "Edit", Icon: PenLine, tone: "text-fg-2" },
  { label: "Delete", Icon: Trash2, tone: "text-fg-2" },
];

export function MeasurePanel() {
  return (
    <div className="flex h-full">
      <div className="relative min-w-0 flex-1 overflow-hidden bg-canvas">
        <PropertyScene season="summer" idPrefix="tour" className="absolute inset-0 size-full" />
        <PropertyTraces className="absolute inset-0 size-full" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1 rounded-lg border border-line-strong bg-surface/92 p-1 shadow-md backdrop-blur">
          {TOOLS.map(({ label, Icon, tone }, i) => (
            <span
              key={label}
              className={`inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[12px] ${
                i === 0 ? "bg-surface-3 font-medium text-fg" : "text-fg-2"
              } ${i > 1 ? "hidden @2xl:inline-flex" : ""}`}
            >
              <Icon aria-hidden className={`size-3.5 ${tone}`} />
              {label}
            </span>
          ))}
        </div>
        <span className="absolute right-3 bottom-3 inline-flex overflow-hidden rounded-md border border-line-strong bg-surface/92 text-[11px] shadow-md">
          <span className="bg-surface-3 px-2.5 py-1.5 font-medium text-fg">Satellite</span>
          <span className="px-2.5 py-1.5 text-fg-3">Map</span>
        </span>
      </div>

      <aside className="hidden w-72 shrink-0 flex-col border-l border-line bg-canvas/40 p-5 @4xl:flex">
        <p className="font-mono text-[10px] tracking-[0.14em] text-fg-3 uppercase">New quotation</p>
        <p className="mt-1 text-[15px] font-semibold text-fg">{sampleQuote.address}</p>
        <p className="text-[12px] text-fg-3">Dana Hollis · Lead</p>

        <div className="mt-4 grid grid-cols-3 rounded-md border border-line bg-surface-2/60 p-0.5 text-center text-[11.5px]">
          <span className="rounded px-1 py-1.5 text-fg-3">Snow</span>
          <span className="rounded px-1 py-1.5 text-fg-3">Lawn</span>
          <span className="rounded bg-surface-3 px-1 py-1.5 font-medium text-fg">Snow & lawn</span>
        </div>

        <dl className="mt-4 grid gap-2 text-[12px]">
          {sampleQuote.lines.map((line) => (
            <div key={line.label} className="flex items-baseline justify-between gap-2">
              <dt className="text-fg-2">
                {line.label}
                <span className="block font-mono text-[11px] text-fg-3">
                  {line.qty} × {line.rate}
                </span>
              </dt>
              <dd className="font-mono text-fg tabular-nums">{line.amount}</dd>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-2">
            <dt className="text-fg-2">{sampleQuote.discount.label}</dt>
            <dd className="font-mono text-spruce tabular-nums">{sampleQuote.discount.amount}</dd>
          </div>
        </dl>
        <div className="mt-4 flex items-baseline justify-between border-t border-line pt-3">
          <span className="text-[12px] text-fg-2">Seasonal total</span>
          <span className="font-wide text-xl font-semibold text-snow tabular-nums">{sampleQuote.total}</span>
        </div>
        <p className="mt-1 text-right text-[11px] text-fg-3">CAD, before tax</p>

        <div className="mt-auto grid grid-cols-2 gap-2 text-[12px] font-medium">
          <span className="inline-flex h-8 items-center justify-center rounded-md border border-line-strong text-fg">Save draft</span>
          <span className="inline-flex h-8 items-center justify-center rounded-md bg-primary text-canvas">Send quote</span>
        </div>
      </aside>
    </div>
  );
}
