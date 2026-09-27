// The "Seasonal Switch" mark from the product (see snowlawna LOGO.md), recoloured for charcoal:
// snow ridge, ice sweep and a spruce lawn blade. Geometry must stay in sync with public/brand/*.svg.

const RIDGE = "M48 13H29c-10 0-16 6-16 14 0 5 3 8 9 10l13-8-7-2c-2-.5-3-1-3-2 0-2 2-2 4-2h12Z";
const SWEEP = "M16 51h19c10 0 16-6 16-13 0-5-3-8-9-10l-13 8 7 2c2 .5 3 1 3 2 0 2-2 2-4 2H23Z";
const BLADE = "m16 51 7-9h16l-14 9Z";

const LETTERS: [number, string][] = [
  [82, "M28 13C25 10 21 9 15 9 6 9 1 14 1 21c0 7 5 10 13 12l3 1c5 1 7 3 7 6 0 4-3 6-8 6-5 0-9-2-12-5l-4 5c4 4 9 6 16 6 9 0 15-5 15-12 0-7-4-11-13-13l-3-1c-5-1-7-3-7-5 0-4 3-6 8-6 4 0 7 1 10 4Z"],
  [120, "M0 22h6v4c2-3 5-5 10-5 8 0 12 5 12 13v17h-6V34c0-5-2-8-7-8s-9 4-9 9v16H0Z"],
  [154, "M15 21C6 21 0 27 0 36s6 16 15 16 15-7 15-16-6-15-15-15Zm0 5c6 0 9 4 9 10s-3 11-9 11-9-5-9-11 3-10 9-10Z"],
  [189, "M0 22h6l6 22 7-22h6l7 22 6-22h6l-9 29h-6l-7-21-7 21H9Z"],
  [239, "M0 10h6v41H0Z"],
  [252, "M14 21c5 0 8 2 10 5v-4h6v29h-6v-4c-2 3-5 5-10 5C6 52 0 45 0 36s6-15 14-15Zm1 5c-6 0-9 4-9 10s3 11 9 11 9-5 9-11-3-10-9-10Z"],
  [287, "M0 22h6l6 22 7-22h6l7 22 6-22h6l-9 29h-6l-7-21-7 21H9Z"],
  [336, "M0 22h6v4c2-3 5-5 10-5 8 0 12 5 12 13v17h-6V34c0-5-2-8-7-8s-9 4-9 9v16H0Z"],
  [370, "M14 21c5 0 8 2 10 5v-4h6v29h-6v-4c-2 3-5 5-10 5C6 52 0 45 0 36s6-15 14-15Zm1 5c-6 0-9 4-9 10s3 11 9 11 9-5 9-11-3-10-9-10Z"],
];

function Glyph() {
  return (
    <>
      <path fill="#f3f6f7" d={RIDGE} />
      <path fill="#92c6d2" d={SWEEP} />
      <path fill="#6cbb91" d={BLADE} />
    </>
  );
}

function Tile() {
  return <rect x=".75" y=".75" width="62.5" height="62.5" rx="15.25" fill="#1a1c1f" stroke="#32353a" strokeWidth="1.5" />;
}

/** Mark + lettering. Lettering uses currentColor. */
export function Wordmark({ className, title = "Snowlawna" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 404 64" className={className} role="img" aria-label={title} fill="none">
      <Tile />
      <Glyph />
      <g fill="currentColor" fillRule="evenodd">
        {LETTERS.map(([x, d]) => (
          <path key={x} transform={`translate(${x})`} d={d} />
        ))}
      </g>
    </svg>
  );
}

/** The mark alone. `tile` adds the charcoal app-icon tile. */
export function Mark({ className, tile = true, title }: { className?: string; tile?: boolean; title?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
    >
      {tile && <Tile />}
      <Glyph />
    </svg>
  );
}
