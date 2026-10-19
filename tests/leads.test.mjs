import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { LeadStorageError, saveLead } from "../lib/leads.ts";

const input = { intent: "demo", name: "Test Person", email: "test@example.invalid", company: "Test company", services: ["snow"], message: "" };
const names = ["NODE_ENV", "VERCEL", "SUPABASE_URL", "SUPABASE_SECRET_KEY", "LEADS_FILE"];
async function isolated(run) {
  const env = Object.fromEntries(names.map((name) => [name, process.env[name]]));
  const fetch = globalThis.fetch;
  names.forEach((name) => delete process.env[name]);
  try { await run(); } finally {
    globalThis.fetch = fetch;
    names.forEach((name) => env[name] === undefined ? delete process.env[name] : process.env[name] = env[name]);
  }
}
test("production succeeds only after a durable insert with the server-only key", () => isolated(async () => {
  process.env.NODE_ENV = "production";
  process.env.SUPABASE_URL = "https://test.supabase.co";
  process.env.SUPABASE_SECRET_KEY = "test-secret";
  let inserted;
  globalThis.fetch = async (url, options) => {
    assert.equal(String(url), "https://test.supabase.co/rest/v1/marketing_leads");
    assert.equal(options.method, "POST");
    assert.equal(options.headers.apikey, "test-secret");
    assert.equal(options.headers.Prefer, "return=minimal");
    assert.equal(options.headers.Authorization, undefined);
    inserted = JSON.parse(options.body);
    return new Response(null, { status: 201 });
  };
  const lead = await saveLead(input);
  assert.equal(inserted.id, lead.id);
  assert.equal(inserted.email, input.email);
  assert.deepEqual(inserted.services, ["snow"]);
}));
test("database refusal and network failure propagate without provider details", () => isolated(async () => {
  process.env.SUPABASE_URL = "https://test.supabase.co";
  process.env.SUPABASE_SECRET_KEY = "test-secret";
  for (const result of [() => new Response("sensitive provider details", { status: 403 }), () => { throw new Error("sensitive network details"); }]) {
    globalThis.fetch = async () => result();
    await assert.rejects(() => saveLead(input), (error) => error instanceof LeadStorageError && !error.message.includes("sensitive"));
  }
}));
test("production and incomplete credentials cannot fall back to a temporary file", () => isolated(async () => {
  process.env.NODE_ENV = "production";
  await assert.rejects(() => saveLead(input), LeadStorageError);
  process.env.NODE_ENV = "development";
  process.env.SUPABASE_URL = "https://test.supabase.co";
  await assert.rejects(() => saveLead(input), LeadStorageError);
}));
test("local development persists JSON lines and surfaces write failures", () => isolated(async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), "snowlawna-leads-"));
  try {
    process.env.LEADS_FILE = path.join(dir, "leads.jsonl");
    const lead = await saveLead(input);
    assert.deepEqual(JSON.parse(await readFile(process.env.LEADS_FILE, "utf8")), lead);
    process.env.LEADS_FILE = dir;
    await assert.rejects(() => saveLead(input));
  } finally { await rm(dir, { recursive: true, force: true }); }
}));
