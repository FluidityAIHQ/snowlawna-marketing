<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes

- Brand tokens are Tailwind v4 theme variables in `app/globals.css`; the default palette is removed on purpose. Use the `canvas`, `surface`, `line`, `fg`, `ice` and `spruce` utilities rather than raw colours.
- Frequently edited copy lives in `lib/content.ts`; URLs and constants in `lib/site.ts`.
- Keep product claims true to the Snowlawna app. Don't invent customers, metrics, integrations or prices. Testimonials are placeholders (`testimonials.isPlaceholder`) and keep their on-page label until real, approved quotes replace them.
- Motion is CSS only and must sit behind `prefers-reduced-motion: no-preference`. Use `data-reveal` on wrappers (without their own transitions) for scroll reveals.
- Don't put `hidden` or other display utilities on `buttonClass()` elements; the base class sets `inline-flex` and wins. Wrap the element instead.
- Check changes with `npm run lint && npm run typecheck && npm run build`.
