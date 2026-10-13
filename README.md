# Snowlawna marketing site

The public website for **Snowlawna**, lawn and snow operations software: dispatch, live maps,
satellite measure-to-quote, seasonal contracts and multi-company branding.

It includes a landing page, contact, privacy and terms pages, a lead endpoint for "Book a demo",
"Join the waitlist" and "Contact sales", and generated social images. The product itself lives in a
separate app; this site links to the live demo at <https://snowlawna.vercel.app> and has no runtime
dependency on it.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 ·
`lucide-react` icons. No animation library: motion is CSS plus a single IntersectionObserver.

## Run locally

Requires Node.js 20.9 or newer (22 LTS recommended).

```sh
npm install
npm run dev          # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (also type-checks) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (flat config, `eslint-config-next`) |
| `npm run typecheck` | Generates route types (`next typegen`), then `tsc --noEmit` |

The build downloads the two web fonts (Archivo, IBM Plex Mono) through `next/font/google`, so it
needs network access to Google Fonts. Vercel builds have this.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository. The framework preset is
   **Next.js**; keep the default build command (`npm run build`), output settings and install
   command.
3. Optional: add the environment variables below (**Settings → Environment Variables**).
4. Deploy. Every push to the default branch deploys to production; other branches get preview URLs.

With the Vercel CLI instead: `npx vercel` for a preview, `npx vercel --prod` for production.

When you add a custom domain, set `NEXT_PUBLIC_SITE_URL` to it (e.g. `https://www.snowlawna.com`) so
canonical URLs, Open Graph images, `robots.txt` and `sitemap.xml` use that domain. Without it, the
site uses Vercel's production domain (`VERCEL_PROJECT_PRODUCTION_URL`), or `http://localhost:3000`
locally.

### Environment variables

All are optional; see `.env.example`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata, OG images, robots and sitemap |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Shown on `/contact`, and offered as a prefilled `mailto:` if a form submission fails. Unset = no email shown anywhere |
| `LEADS_FILE` | Path for the demo lead file (defaults below) |

## Leads: `/api/leads`

The lead form (home page `#get-started` and `/contact`) supports three intents: `demo`, `waitlist`
and `contact`. The browser and the server validate with the same code (`lib/lead-schema.ts`).

- **JSON** (the form, with JavaScript): `201 { ok, id }`, `422 { ok: false, errors }` with
  per-field messages, `429` with `Retry-After` when rate limited, `413`/`415`/`400` for oversized,
  non-JSON/form or unreadable bodies.
- **Form posts** (the same form without JavaScript): `303` redirect to `/thanks?intent=…`, or back
  to `/contact?error=invalid|rate`.
- **Spam:** a hidden honeypot field (`website`). Bots that fill it get a normal success response,
  but nothing is stored. There's also a best-effort limit of 5 submissions per IP per 10 minutes,
  kept in memory per server instance.

```sh
curl -X POST http://localhost:3000/api/leads -H 'Content-Type: application/json' \
  -d '{"intent":"demo","name":"Jordan Tremblay","email":"jordan@example.com","company":"Northline Snow Co.","fleetSize":"4-10","services":["snow"]}'
```

**Demo storage (`lib/leads.ts`)** appends one JSON object per line and logs the lead:

- locally to `.data/leads.jsonl` (gitignored);
- on Vercel to `/tmp/snowlawna-leads.jsonl`. That's the only writable path there, but it's
  **ephemeral and per instance**, so the runtime log line (`[leads] {...}`) is the only copy you
  can rely on. Vercel keeps runtime logs only briefly.

### Wiring leads for production

Before launch, send leads somewhere durable. Both options below replace or extend the body of
`saveLead()` in `lib/leads.ts`. Once a real sink exists, let failures throw so the API returns a
`500` and the form shows its error state (and `mailto:` fallback) instead of a false success.

**Supabase (store every lead).** Create a table that only the server can touch:

```sql
create table public.marketing_leads (
  id uuid primary key,
  received_at timestamptz not null default now(),
  intent text not null check (intent in ('demo', 'waitlist', 'contact')),
  name text not null,
  email text not null,
  company text,
  fleet_size text,
  services text[] not null default '{}',
  message text,
  source text
);
alter table public.marketing_leads enable row level security; -- no policies: server key only
```

Then `npm install @supabase/supabase-js`, set `SUPABASE_URL` and `SUPABASE_SECRET_KEY` (server-only;
never a `NEXT_PUBLIC_` variable), and insert from `saveLead()`:

```ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
  auth: { persistSession: false },
});

const { error } = await supabase.from("marketing_leads").insert({
  id: lead.id,
  received_at: lead.receivedAt,
  intent: lead.intent,
  name: lead.name,
  email: lead.email,
  company: lead.company || null,
  fleet_size: lead.fleetSize ?? null,
  services: lead.services,
  message: lead.message || null,
  source: lead.source ?? null,
});
if (error) throw error;
```

**Resend (email the team about each lead).** Verify a sending domain in Resend, set
`RESEND_API_KEY` and `LEADS_NOTIFY_EMAIL`, and call the REST API (no SDK needed):

```ts
const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    from: "Snowlawna leads <leads@your-verified-domain.com>",
    to: [process.env.LEADS_NOTIFY_EMAIL],
    reply_to: lead.email,
    subject: `New ${lead.intent} lead: ${lead.company || lead.name}`,
    text: JSON.stringify(lead, null, 2),
  }),
});
if (!response.ok) throw new Error(`Resend responded ${response.status}`);
```

For stricter rate limiting across instances, use Vercel Firewall rate-limit rules or a shared store
(e.g. Upstash Redis) instead of `lib/rate-limit.ts`.

## Before launch: placeholder content to review

- **Testimonials** (`lib/content.ts`) are stubs, not real customer quotes. While
  `testimonials.isPlaceholder` is `true` the section says so on the page. Replace them with
  approved, attributable quotes, then set it to `false`.
- **Pricing** (`lib/content.ts` → `plans`) lists what each tier includes and sends people to
  "Contact sales"; no prices are published. Confirm the tiers match what sales will offer.
- **Privacy and Terms** are plain-language drafts marked "Draft" on the page. Have them reviewed,
  then remove the notice in `components/legal-page.tsx`.
- **"Early access for the 2026–27 winter"** (hero pill and `/contact`): update it as the launch
  status changes.
- **Product screens** are HTML/SVG replicas of the app with illustrative data (fictional streets,
  clients and example brands), labelled as such on the page. To show real screenshots instead, add
  images under `public/` and swap them into `components/mockups/`.
- **FAQ** mentions the demo login email (`alex@snowlawna.demo`) but never the password.

Product claims in the copy are taken from the app's own docs (README, QUOTATIONS.md, THEME.md): for
example, the measure-to-quote pricing in the sample estimate uses the app's demo rates. Keep them in
sync as the product changes.

## Design system

- **Colour:** the product's charcoal theme. Canvas `#0e0f11`, surfaces `#141518`/`#1a1c1f`,
  text `#e6e7e8`/`#b4b8bc`, ice `#92c6d2` for links, focus and winter, spruce `#6cbb91` for success
  and lawn. Tokens are Tailwind v4 theme variables in `app/globals.css`, and the default Tailwind
  palette is removed so off-brand colours can't creep in. Primary buttons are light neutral on
  charcoal, as in the app.
- **Type:** Archivo, using its width axis semi-expanded (`font-wide`) for headlines, with IBM Plex
  Mono for labels, measurements and eyebrows. The OG image uses static Archivo TTFs in
  `assets/fonts` (SIL Open Font License, see `assets/fonts/OFL.txt`).
- **Logo:** the product's "Seasonal Switch" S mark, recoloured for charcoal: a snow ridge, an ice
  sweep and a spruce lawn blade. Files are in `public/brand/` (mark, glyph, wordmark for dark and
  light backgrounds), plus `app/icon.svg`, a generated `apple-icon` and `opengraph-image`. The
  inline React version is `components/brand/logo.tsx`; keep its geometry in sync with the SVGs.
- **Motifs:** survey grid, trace vertices, ft² labels, routes with stops. The logo's diagonal
  blade marks eyebrows.
- **Motion:** staggered hero entrance, traces that draw in, scroll reveals (`data-reveal`, see
  `components/reveal-observer.tsx`), a one-time thaw on the season divider and small hover lifts.
  Every animation sits behind `prefers-reduced-motion: no-preference`. Scroll-revealed content is
  only hidden when scripting is available, so the page reads fully with JavaScript off.
- **Accessibility:** skip link, landmarks, visible focus rings, an ARIA slider for the season
  divider and ARIA tabs for the product tour (both keyboard operable), native radios and checkboxes
  in forms, errors tied to fields with `aria-describedby`, and focus moved to the first invalid
  field or the success message.

## Project structure

```
app/
  page.tsx              Landing page (hero → tour → features → how it works → branding
                        → testimonials → pricing → FAQ → get started)
  contact/  thanks/  privacy/  terms/  not-found.tsx
  api/leads/route.ts    Lead endpoint (JSON + no-JS form posts)
  opengraph-image.tsx  apple-icon.tsx  icon.svg  robots.ts  sitemap.ts
  globals.css           Tokens, utilities, motion
components/
  home/                 Landing page sections
  mockups/              App frame and product screens (dispatch, map, contracts, measure)
  illustrations/        Property scene, its aerial winter/summer version for the hero, and street
                        map, as SVG
  brand/logo.tsx        Mark and wordmark
  lead-form.tsx  intent-link.tsx  site-header.tsx  site-footer.tsx  …
lib/
  site.ts               URLs and site constants
  content.ts            FAQ, plans, testimonials
  lead-schema.ts        Lead validation shared by client and server
  leads.ts              Lead storage (demo file sink)
  rate-limit.ts  sample-quote.ts  og-art.ts
public/brand/           Logo SVGs
assets/fonts/           Static Archivo TTFs for OG images (OFL)
```
