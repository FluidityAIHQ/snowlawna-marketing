import Image from "next/image";

const SEGMENTS = [
  { label: "Residential plowing", image: "/features/dispatch.webp", position: "55% 55%" },
  { label: "Commercial lots", image: "/audiences/commercial-lots.webp", position: "50% 60%" },
  { label: "Condo & HOA contracts", image: "/hero/hero-snowfall-poster.jpg", position: "75% 50%" },
  { label: "Lawn & landscaping", image: "/features/contracts.webp", position: "40% 65%" },
  { label: "Property management", image: "/hero/hero-snowfall-poster.jpg", position: "20% 55%" },
] as const;

export function BuiltFor() {
  return (
    <section aria-label="Who Snowlawna is for" className="border-y border-line bg-canvas">
      <h2 className="sr-only">Built for crews in</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {SEGMENTS.map(({ label, image, position }) => (
          <li
            key={label}
            className="group relative isolate flex min-h-28 items-center justify-center overflow-hidden border-b border-line px-6 py-9 text-center last:border-b-0 sm:min-h-36 sm:odd:border-r sm:last:col-span-2 sm:last:border-r-0 lg:min-h-44 lg:border-r lg:border-b-0 lg:last:col-span-1 lg:last:border-r-0"
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.04]"
              style={{ objectPosition: position }}
            />
            <span aria-hidden className="absolute inset-0 bg-canvas/75 dark:bg-canvas/80" />
            <span className="relative max-w-[16ch] font-wide text-lg leading-snug font-semibold text-balance text-snow">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

