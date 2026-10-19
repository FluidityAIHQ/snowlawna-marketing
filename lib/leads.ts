import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { LeadInput } from "./lead-schema";

export type StoredLead = LeadInput & { id: string; receivedAt: string };

export class LeadStorageError extends Error {
  constructor() {
    super("Lead storage is temporarily unavailable.");
    this.name = "LeadStorageError";
  }
}

/** Local development only. Production requires durable Supabase storage. */
export function leadsFilePath() {
  if (process.env.LEADS_FILE) return path.resolve(/* turbopackIgnore: true */ process.env.LEADS_FILE);
  return path.join(process.cwd(), ".data", "leads.jsonl");
}

/** Return success only after the lead has been persisted. Never log lead contents. */
export async function saveLead(input: LeadInput): Promise<StoredLead> {
  const lead: StoredLead = { id: crypto.randomUUID(), receivedAt: new Date().toISOString(), ...input };
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SECRET_KEY?.trim();
  if (url && key) {
    try {
      const response = await fetch(new URL("/rest/v1/marketing_leads", url), {
        method: "POST",
        headers: { apikey: key, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify({
          id: lead.id, received_at: lead.receivedAt, intent: lead.intent,
          name: lead.name, email: lead.email, company: lead.company || null,
          fleet_size: lead.fleetSize ?? null, services: lead.services,
          message: lead.message || null, source: lead.source ?? null,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) throw new LeadStorageError();
      return lead;
    } catch {
      // Provider errors can contain credentials or customer data.
      throw new LeadStorageError();
    }
  }
  if (process.env.NODE_ENV === "production" || process.env.VERCEL || url || key) {
    throw new LeadStorageError();
  }
  const file = leadsFilePath();
  await mkdir(path.dirname(file), { recursive: true });
  await appendFile(file, `${JSON.stringify(lead)}\n`, "utf8");
  return lead;
}
