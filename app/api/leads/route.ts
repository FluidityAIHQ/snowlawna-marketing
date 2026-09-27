import { NextResponse } from "next/server";
import { isLeadIntent, validateLead } from "@/lib/lead-schema";
import { saveLead } from "@/lib/leads";
import { rateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

async function readBody(request: Request, isJson: boolean): Promise<Record<string, unknown> | null> {
  if (isJson) {
    const body = await request.text();
    if (body.length > MAX_BODY_BYTES) return null;
    const parsed: unknown = JSON.parse(body);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return parsed as Record<string, unknown>;
  }
  const form = await request.formData();
  return { ...Object.fromEntries(form.entries()), services: form.getAll("services") };
}

/**
 * Accepts leads from the site's forms.
 * - JSON (the enhanced form): 201 `{ ok, id }`, 422 `{ ok: false, errors }`, 429 when rate limited.
 * - Form posts (the same form without JavaScript): 303 redirect to /thanks, or back to /contact.
 */
export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const isForm =
    contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");

  if (!isJson && !isForm) {
    return NextResponse.json({ ok: false, error: "Send the lead as JSON or form data." }, { status: 415 });
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "That request is too large." }, { status: 413 });
  }

  let raw: Record<string, unknown> | null;
  try {
    raw = await readBody(request, isJson);
  } catch {
    raw = null;
  }
  if (!raw) {
    return NextResponse.json({ ok: false, error: "We couldn't read that request." }, { status: 400 });
  }

  const intent = isLeadIntent(raw.intent) ? raw.intent : "demo";
  const backToForm = (error: string) =>
    NextResponse.redirect(new URL(`/contact?intent=${intent}&error=${error}#lead-form`, request.url), 303);

  const limited = rateLimit(clientKey(request), RATE_LIMIT);
  if (!limited.ok) {
    if (isForm) return backToForm("rate");
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } },
    );
  }

  // Honeypot: the "website" field is hidden from people, so anything in it came from a bot.
  // Answer as if it worked so the bot has nothing to learn from.
  const isBot = typeof raw.website === "string" && raw.website.trim() !== "";

  const result = validateLead(raw);
  if (!result.ok && !isBot) {
    if (isForm) return backToForm("invalid");
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  const id = result.ok && !isBot ? (await saveLead(result.lead)).id : crypto.randomUUID();

  if (isForm) return NextResponse.redirect(new URL(`/thanks?intent=${intent}`, request.url), 303);
  return NextResponse.json({ ok: true, id }, { status: 201 });
}
