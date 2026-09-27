import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { LeadInput } from "./lead-schema";

export type StoredLead = LeadInput & { id: string; receivedAt: string };

/**
 * Where the demo file sink writes, one JSON object per line:
 * - `LEADS_FILE` when set.
 * - On Vercel, `/tmp/snowlawna-leads.jsonl`. `/tmp` is the only writable path there, and it is
 *   per-instance and wiped on cold starts — fine for a demo, not for real leads.
 * - Locally, `.data/leads.jsonl` (gitignored).
 */
export function leadsFilePath() {
  if (process.env.LEADS_FILE) return path.resolve(process.env.LEADS_FILE);
  if (process.env.VERCEL) return "/tmp/snowlawna-leads.jsonl";
  return path.join(process.cwd(), ".data", "leads.jsonl");
}

/**
 * Demo lead storage. Production should send leads somewhere durable — e.g. insert into a
 * Supabase table and/or notify the team through Resend. See "Wiring leads for production"
 * in the README.
 */
export async function saveLead(input: LeadInput): Promise<StoredLead> {
  const lead: StoredLead = { id: crypto.randomUUID(), receivedAt: new Date().toISOString(), ...input };
  const file = leadsFilePath();

  try {
    await mkdir(path.dirname(file), { recursive: true });
    await appendFile(file, `${JSON.stringify(lead)}\n`, "utf8");
  } catch (error) {
    console.error("[leads] could not append to %s: %s", file, error instanceof Error ? error.message : error);
  }

  // On Vercel the runtime log is the only copy that outlives the instance until a real sink is wired up.
  console.info("[leads] %s", JSON.stringify(lead));
  return lead;
}
