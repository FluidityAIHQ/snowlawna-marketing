import type { CSSProperties } from "react";
import { Truck } from "lucide-react";

// A stylised dark street map with three plow routes. Street names and addresses are fictional.

export const ROUTES = [
  {
    id: "r3",
    name: "Route 3",
    color: "#5fccce",
    vehicle: "Plow 12",
    d: "M120 50H300V230H420C420 290 480 290 480 230V130H680V330",
    stops: [
      [120, 50, 1],
      [210, 50, 1],
      [300, 140, 1],
      [300, 230, 1],
      [380, 230, 1],
      [480, 180, 0],
      [580, 130, 0],
      [680, 230, 0],
      [680, 330, 0],
    ],
    truck: [450, 274],
  },
  {
    id: "r5",
    name: "Route 5",
    color: "#f2a33a",
    vehicle: "Loader 3",
    d: "M200 420V330H420V420H680V480H760",
    stops: [
      [200, 420, 1],
      [300, 330, 1],
      [420, 380, 0],
      [560, 420, 0],
      [680, 452, 0],
      [760, 480, 0],
    ],
    truck: [420, 350],
  },
  {
    id: "r7",
    name: "Route 7",
    color: "#b39cf2",
    vehicle: "Plow 8",
    d: "M560 50H760V230H560V330",
    stops: [
      [620, 50, 1],
      [760, 110, 1],
      [700, 230, 0],
      [560, 290, 0],
    ],
    truck: [760, 170],
  },
] as const;

const MINOR_STREETS = [
  "M0 50H800",
  "M0 230H800",
  "M0 420H800",
  "M120 0V520",
  "M200 0V520",
  "M420 0V230",
  "M420 330V520",
  "M480 0V230",
  "M680 0V520",
  "M760 0V520",
  "M420 230C420 290 480 290 480 230",
];
const MAJOR_STREETS = ["M0 130H800", "M0 330H800", "M300 0V520", "M560 0V520"];

// Deterministic "houses" along the blocks for texture.
const LOTS = Array.from({ length: 64 }, (_, i) => {
  const col = i % 16;
  const row = Math.floor(i / 16);
  const x = 14 + col * 50 + (row % 2) * 12;
  const y = [78, 172, 262, 372][row] + ((col * 7) % 3) * 4;
  return [x, y, 14 + ((col * 5) % 4) * 3, 10 + ((col * 3) % 3) * 2] as const;
});

export function StreetMap({
  className,
  viewBox = "0 0 800 520",
  selected = "r3",
  animate = false,
  labels = true,
}: {
  className?: string;
  viewBox?: string;
  selected?: string;
  /** Draw the routes in once the nearest [data-reveal] ancestor is revealed. */
  animate?: boolean;
  labels?: boolean;
}) {
  return (
    <svg viewBox={viewBox} className={className} aria-hidden preserveAspectRatio="xMidYMid slice" fill="none">
      <rect x="-200" y="-200" width="1200" height="920" fill="#121417" />

      {/* Parks and river */}
      <rect x="566" y="344" width="104" height="66" rx="10" fill="#14231b" />
      <rect x="132" y="146" width="58" height="72" rx="10" fill="#14231b" />
      <path d="M-30 372C60 356 130 420 214 468S360 540 420 580" stroke="#152730" strokeWidth="46" strokeLinecap="round" />

      {/* Buildings */}
      <g fill="#181b1f">
        {LOTS.map(([x, y, w, h]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="1.5" />
        ))}
      </g>

      {/* Streets */}
      <g stroke="#1e2126" strokeWidth="7" strokeLinecap="round">
        {MINOR_STREETS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g stroke="#272b31" strokeWidth="12" strokeLinecap="round">
        {MAJOR_STREETS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      {labels && (
        <g fill="#50565d" fontSize="9" letterSpacing="1.5" style={{ fontFamily: "var(--font-plex-mono), monospace" }}>
          <text x="330" y="124">
            FROSTLINE RD
          </text>
          <text x="600" y="324">
            HARBOUR RD
          </text>
          <text x="306" y="470" transform="rotate(-90 306 470)">
            ASPEN ROW
          </text>
          <text x="424" y="306">
            JUNIPER CRES
          </text>
        </g>
      )}

      {/* Routes: the selected one gets the product's ice halo */}
      {ROUTES.map((route, i) => (
        <g key={route.id}>
          {route.id === selected && (
            <path d={route.d} stroke="#92c6d2" strokeOpacity="0.28" strokeWidth="15" strokeLinejoin="round" strokeLinecap="round" />
          )}
          <path
            d={route.d}
            stroke={route.color}
            strokeWidth={route.id === selected ? 4.5 : 3}
            strokeOpacity={route.id === selected ? 1 : 0.8}
            strokeLinejoin="round"
            strokeLinecap="round"
            pathLength={1}
            className={animate ? "reveal-draw" : undefined}
            style={animate ? ({ "--delay": `${200 + i * 250}ms` } as CSSProperties) : undefined}
          />
          {route.stops.map(([x, y, done]) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="5"
              fill={done ? route.color : "#121417"}
              stroke={done ? "#121417" : route.color}
              strokeWidth="2"
            />
          ))}
        </g>
      ))}

      {/* Vehicles */}
      {ROUTES.map((route) => {
        const [x, y] = route.truck;
        return (
          <g key={route.vehicle}>
            <rect x={x - 12} y={y - 12} width="24" height="24" rx="7" fill="#0e0f11" stroke={route.color} strokeWidth="2" />
            <Truck x={x - 7} y={y - 7} width={14} height={14} color={route.color} strokeWidth={2.2} />
            {labels && (
              <g>
                <rect x={x + 16} y={y - 10} width={route.vehicle.length * 6.4 + 14} height="20" rx="5" fill="#0e0f11" fillOpacity="0.9" stroke="#32353a" />
                <text
                  x={x + 23}
                  y={y + 4}
                  fill="#e6e7e8"
                  fontSize="10.5"
                  style={{ fontFamily: "var(--font-plex-mono), monospace" }}
                >
                  {route.vehicle}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
