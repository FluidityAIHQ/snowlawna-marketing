// Shared by the lead form (browser) and /api/leads (server), so both apply the same rules.

export const LEAD_INTENTS = ["demo", "contact"] as const;
export type LeadIntent = (typeof LEAD_INTENTS)[number];

export const FLEET_SIZES = ["1-3", "4-10", "11-25", "26+"] as const;
export type FleetSize = (typeof FLEET_SIZES)[number];

export const SERVICES = ["snow", "lawn"] as const;
export type Service = (typeof SERVICES)[number];

export type LeadInput = {
  intent: LeadIntent;
  name: string;
  email: string;
  company: string;
  fleetSize?: FleetSize;
  services: Service[];
  message: string;
  /** Path of the page the form was submitted from. */
  source?: string;
};

export type LeadField = "intent" | "name" | "email" | "company" | "fleetSize" | "services" | "message";
export type LeadErrors = Partial<Record<LeadField, string>>;

export const intentCopy: Record<LeadIntent, { tab: string; submit: string; successTitle: string; success: string }> = {
  demo: {
    tab: "Book a demo",
    submit: "Book a demo",
    successTitle: "Demo request received.",
    success: "We'll be in touch by email to find a time that works for you.",
  },
  contact: {
    tab: "Contact sales",
    submit: "Send message",
    successTitle: "Message received.",
    success: "Thanks for getting in touch. We'll reply to you by email.",
  },
};

export const fleetSizeLabels: Record<FleetSize, string> = {
  "1-3": "1–3 trucks",
  "4-10": "4–10 trucks",
  "11-25": "11–25 trucks",
  "26+": "26+ trucks",
};

const LIMITS = { name: 100, email: 254, company: 120, message: 2000, source: 200 } as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isLeadIntent(value: unknown): value is LeadIntent {
  return typeof value === "string" && (LEAD_INTENTS as readonly string[]).includes(value);
}

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/**
 * Validates untrusted input and returns a normalised lead, or per-field errors.
 * Unknown fields are ignored.
 */
export function validateLead(
  raw: Record<string, unknown>,
): { ok: true; lead: LeadInput } | { ok: false; errors: LeadErrors } {
  const errors: LeadErrors = {};

  const intent = isLeadIntent(raw.intent) ? raw.intent : null;
  if (!intent) errors.intent = "Choose what you'd like to do.";

  const name = text(raw.name);
  if (name.length < 2) errors.name = "Enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Keep it under ${LIMITS.name} characters.`;

  const email = text(raw.email).toLowerCase();
  if (!email) errors.email = "Enter your work email.";
  else if (email.length > LIMITS.email || !EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";

  const company = text(raw.company);
  if (intent === "demo" && company.length < 2) errors.company = "Enter your company name.";
  else if (company.length > LIMITS.company) errors.company = `Keep it under ${LIMITS.company} characters.`;

  const fleet = text(raw.fleetSize);
  let fleetSize: FleetSize | undefined;
  if (fleet) {
    if ((FLEET_SIZES as readonly string[]).includes(fleet)) fleetSize = fleet as FleetSize;
    else errors.fleetSize = "Choose a fleet size from the list.";
  }

  const rawServices = Array.isArray(raw.services) ? raw.services : raw.services ? [raw.services] : [];
  const services = SERVICES.filter((service) => rawServices.includes(service));
  if (rawServices.length > 0 && services.length !== new Set(rawServices).size) {
    errors.services = "Choose snow, lawn or both.";
  }

  const message = text(raw.message);
  if (intent === "contact" && message.length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  else if (message.length > LIMITS.message) errors.message = `Keep it under ${LIMITS.message} characters.`;

  const source = text(raw.source).slice(0, LIMITS.source);

  if (!intent || Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    lead: {
      intent,
      name,
      email,
      company,
      fleetSize,
      services,
      message,
      source: source.startsWith("/") ? source : undefined,
    },
  };
}
