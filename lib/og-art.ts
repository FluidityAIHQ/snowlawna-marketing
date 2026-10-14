// SVG artwork embedded (as data URIs) in the generated Open Graph image and Apple touch icon.

const RIDGE = "M48 13H29c-10 0-16 6-16 14 0 5 3 8 9 10l13-8-7-2c-2-.5-3-1-3-2 0-2 2-2 4-2h12Z";
const SWEEP = "M16 51h19c10 0 16-6 16-13 0-5-3-8-9-10l-13 8 7 2c2 .5 3 1 3 2 0 2-2 2-4 2H23Z";
const BLADE = "m16 51 7-9h16l-14 9Z";

export const toDataUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

export const markSvg = (tile = "#1c1c1c", stroke = "#2e2e2e", rounded = true) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${
    rounded
      ? `<rect x=".75" y=".75" width="62.5" height="62.5" rx="15.25" fill="${tile}" stroke="${stroke}" stroke-width="1.5"/>`
      : `<rect width="64" height="64" fill="${tile}"/>`
  }<path fill="#f3f6f7" d="${RIDGE}"/><path fill="#92c6d2" d="${SWEEP}"/><path fill="#6cbb91" d="${BLADE}"/></svg>`;

const hipRoof = (roof: string, line: string) =>
  `<rect x="100" y="170" width="200" height="130" fill="${roof}"/>` +
  `<g stroke="${line}" stroke-width="3" stroke-linecap="round"><path d="M100 170 165 235M100 300 165 235M300 170 235 235M300 300 235 235M165 235H235"/></g>`;

const summer =
  `<rect width="400" height="486" fill="url(#stripes)"/>` +
  hipRoof("#34383e", "#4c5158") +
  `<rect x="236" y="300" width="64" height="130" fill="#3a3d42"/>` +
  `<rect y="430" width="400" height="56" fill="#1e2023"/>` +
  `<path d="M0 458H400" stroke="#6b6e72" stroke-width="2" stroke-dasharray="16 14"/>` +
  `<polygon points="330,52 338,74 360,66 348,86 368,98 346,102 350,124 330,112 310,124 314,102 292,98 312,86 300,66 322,74" fill="#24573d"/>`;

const winter =
  `<rect width="400" height="486" fill="#aebdc3"/>` +
  `<ellipse cx="70" cy="330" rx="46" ry="12" fill="#b9c7cd"/><ellipse cx="160" cy="380" rx="40" ry="10" fill="#a4b4bb"/>` +
  hipRoof("#b8c6cc", "#94a6ad") +
  `<rect x="236" y="300" width="64" height="130" fill="#25282c"/>` +
  `<rect x="228" y="302" width="9" height="104" rx="4" fill="#c4d0d5"/><rect x="299" y="302" width="9" height="104" rx="4" fill="#c4d0d5"/>` +
  `<rect y="430" width="400" height="56" fill="#1c1e21"/><rect y="430" width="400" height="7" fill="#9fb0b7"/>` +
  `<g stroke="#48443f" stroke-width="3" stroke-linecap="round"><path d="M80 90 110 70M80 90 60 60M80 90 50 100M80 90 96 122M80 90 108 104M80 90 74 56"/></g>`;

/** A miniature of the homepage hero: one lot, winter on the left, summer on the right, same traces. */
export const seasonSplitSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 486">
<defs>
<pattern id="stripes" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="20" fill="#1f3a2a"/><rect y="20" width="40" height="20" fill="#1a3224"/></pattern>
<clipPath id="frame"><rect width="400" height="486" rx="28"/></clipPath>
<clipPath id="winter"><polygon points="0,0 236,0 164,486 0,486"/></clipPath>
</defs>
<g clip-path="url(#frame)">
${summer}
<g clip-path="url(#winter)">${winter}</g>
<polygon points="30,36 370,36 370,128 30,132" fill="#6cbb91" fill-opacity="0.18" stroke="#6cbb91" stroke-width="3" stroke-linejoin="round"/>
<polygon points="238,302 298,302 298,424 238,424" fill="#92c6d2" fill-opacity="0.2" stroke="#92c6d2" stroke-width="3" stroke-linejoin="round"/>
<g fill="#f3f6f7" stroke="#0e0f11" stroke-width="2">
<rect x="25" y="31" width="10" height="10" rx="2"/><rect x="365" y="31" width="10" height="10" rx="2"/><rect x="365" y="123" width="10" height="10" rx="2"/><rect x="25" y="127" width="10" height="10" rx="2"/>
<rect x="233" y="297" width="10" height="10" rx="2"/><rect x="293" y="297" width="10" height="10" rx="2"/><rect x="293" y="419" width="10" height="10" rx="2"/><rect x="233" y="419" width="10" height="10" rx="2"/>
</g>
<path d="M236 -10 164 496" stroke="#f3f6f7" stroke-width="4"/>
<circle cx="200" cy="243" r="26" fill="#0e0f11" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2"/>
<path d="M192 235 184 243 192 251M208 235 216 243 208 251" stroke="#f3f6f7" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<rect x="1" y="1" width="398" height="484" rx="27" fill="none" stroke="#32353a" stroke-width="2"/>
</svg>`;
