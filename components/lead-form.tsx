"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { Check, ChevronDown, LoaderCircle, Snowflake, Sprout, TriangleAlert } from "lucide-react";
import { LEAD_INTENT_EVENT } from "@/components/intent-link";
import { ButtonArrow, DemoAppLink, buttonClass } from "@/components/ui/button";
import {
  FLEET_SIZES,
  LEAD_INTENTS,
  fleetSizeLabels,
  intentCopy,
  isLeadIntent,
  validateLead,
  type LeadErrors,
  type LeadField,
  type LeadIntent,
} from "@/lib/lead-schema";
import { site } from "@/lib/site";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; intent: LeadIntent }
  | { state: "error"; message: string; mailto: string | null };

const SHORT_TABS: Record<LeadIntent, string> = { demo: "Demo", waitlist: "Waitlist", contact: "Contact" };

// Which optional fields each intent asks for (name and email are always shown).
const FIELDS: Record<LeadIntent, { fleet: boolean; services: boolean; message: "optional" | "required" | false }> = {
  demo: { fleet: true, services: true, message: "optional" },
  waitlist: { fleet: true, services: true, message: false },
  contact: { fleet: false, services: false, message: "required" },
};

const FIELD_ORDER: LeadField[] = ["intent", "name", "email", "company", "fleetSize", "services", "message"];

const subscribeNever = () => () => {};

/** False during SSR and hydration, true afterwards — without a hydration mismatch. */
function useHydrated() {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}

const inputClass = (invalid: boolean) =>
  `w-full rounded-xl border bg-canvas px-3.5 text-[15px] text-fg placeholder:text-fg-3/75 outline-none transition-[border-color,box-shadow] duration-200 focus:ring-4 ${
    invalid
      ? "border-danger/70 focus:border-danger focus:ring-danger/15"
      : "border-line-strong hover:border-fg-3/60 focus:border-fg focus:ring-fg/12"
  }`;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[13px] text-danger">
      {message}
    </p>
  );
}

function Label({ htmlFor, children, optional }: { htmlFor: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-medium text-fg-2">
      {children}
      {optional && <span className="font-normal text-fg-3"> (optional)</span>}
    </label>
  );
}

/** A prefilled email to the team, offered when the form can't be sent. Null if no address is configured. */
function mailtoHref(intent: LeadIntent, fields: { name: unknown; email: unknown; company: unknown; message: unknown }) {
  if (!site.contactEmail) return null;
  const line = (value: unknown) => (typeof value === "string" ? value : "");
  const body = [
    `Name: ${line(fields.name)}`,
    `Company: ${line(fields.company)}`,
    `Email: ${line(fields.email)}`,
    "",
    line(fields.message),
  ].join("\n");
  const subject = `Snowlawna: ${intentCopy[intent].tab}`;
  return `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function LeadForm({ initialIntent = "demo", notice }: { initialIntent?: LeadIntent; notice?: string }) {
  const [intent, setIntent] = useState<LeadIntent>(initialIntent);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const pathname = usePathname();
  const hydrated = useHydrated();
  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;
  const fields = FIELDS[intent];

  // Calls to action elsewhere on the page preselect an intent.
  useEffect(() => {
    const onIntent = (event: Event) => {
      const next = (event as CustomEvent<unknown>).detail;
      if (!isLeadIntent(next)) return;
      setIntent(next);
      setErrors({});
      setStatus((current) => (current.state === "success" || current.state === "error" ? { state: "idle" } : current));
    };
    window.addEventListener(LEAD_INTENT_EVENT, onIntent);
    return () => window.removeEventListener(LEAD_INTENT_EVENT, onIntent);
  }, []);

  useEffect(() => {
    if (status.state === "success") successRef.current?.focus();
  }, [status.state]);

  const focusFirstError = (found: LeadErrors) => {
    const first = FIELD_ORDER.find((field) => found[field]);
    if (!first) return;
    const target =
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]:not([type="hidden"])`) ??
      formRef.current?.querySelector<HTMLElement>("[name]");
    target?.focus();
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "submitting") return;
    const data = new FormData(event.currentTarget);
    const payload = {
      intent,
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company"),
      fleetSize: data.get("fleetSize"),
      services: data.getAll("services"),
      message: data.get("message"),
      website: data.get("website"),
      source: pathname,
    };

    const checked = validateLead(payload);
    if (!checked.ok) {
      setErrors(checked.errors);
      focusFirstError(checked.errors);
      return;
    }

    setErrors({});
    setStatus({ state: "submitting" });
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => ({}))) as { errors?: LeadErrors; error?: string };
      if (response.ok) {
        formRef.current?.reset();
        setStatus({ state: "success", intent });
        return;
      }
      if (response.status === 422 && body.errors) {
        setErrors(body.errors);
        setStatus({ state: "idle" });
        focusFirstError(body.errors);
        return;
      }
      setStatus({
        state: "error",
        message: body.error ?? "Something went wrong on our side. Please try again.",
        mailto: mailtoHref(intent, payload),
      });
    } catch {
      setStatus({
        state: "error",
        message: "We couldn't reach the server. Check your connection and try again.",
        mailto: mailtoHref(intent, payload),
      });
    }
  }

  if (status.state === "success") {
    return (
      <div role="status" className="flex min-h-[26rem] flex-col items-start justify-center px-1 py-6">
        <span className="anim-check flex size-12 items-center justify-center rounded-full bg-spruce/15 text-spruce ring-1 ring-spruce/30">
          <Check aria-hidden className="size-6" strokeWidth={2.4} />
        </span>
        <h3 ref={successRef} tabIndex={-1} className="mt-6 font-wide text-2xl font-semibold text-snow outline-none">
          {intentCopy[status.intent].successTitle}
        </h3>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-fg-2">{intentCopy[status.intent].success}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <DemoAppLink href={site.demoAppUrl} size="md">
            Explore the demo app meanwhile
          </DemoAppLink>
          <button type="button" onClick={() => setStatus({ state: "idle" })} className={buttonClass({ variant: "ghost" })}>
            Send another
          </button>
        </div>
      </div>
    );
  }

  const describedBy = (field: LeadField) => (errors[field] ? fieldId(`${field}-error`) : undefined);
  const submitting = status.state === "submitting";

  return (
    // Without JavaScript this posts straight to /api/leads (which redirects to /thanks) and the
    // browser's own validation applies; once hydrated, validation and submission happen here.
    <form ref={formRef} action="/api/leads" method="post" noValidate={hydrated} onSubmit={onSubmit} className="relative grid gap-5">
      {notice && (
        <p role="alert" className="flex gap-2.5 rounded-xl border border-warning/30 bg-warning/10 p-3.5 text-sm text-warning">
          <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          {notice}
        </p>
      )}

      <fieldset>
        <legend className="sr-only">What would you like to do?</legend>
        <div className="grid grid-cols-3 gap-1 rounded-full border border-line bg-surface-2 p-1">
          {LEAD_INTENTS.map((value) => (
            <label
              key={value}
              className="cursor-pointer rounded-full px-2 py-2 text-center text-[13px] font-medium whitespace-nowrap text-fg-2 transition-colors hover:text-fg has-[:checked]:bg-primary has-[:checked]:text-canvas has-[:checked]:shadow-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-fg"
            >
              <input
                type="radio"
                name="intent"
                value={value}
                checked={intent === value}
                onChange={() => {
                  setIntent(value);
                  setErrors({});
                }}
                className="sr-only"
              />
              <span className="sm:hidden">{SHORT_TABS[value]}</span>
              <span className="hidden sm:inline">{intentCopy[value].tab}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={fieldId("name")}>Name</Label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={`${inputClass(Boolean(errors.name))} h-11`}
            placeholder="Jordan Tremblay"
          />
          <FieldError id={fieldId("name-error")} message={errors.name} />
        </div>
        <div>
          <Label htmlFor={fieldId("email")}>Work email</Label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={`${inputClass(Boolean(errors.email))} h-11`}
            placeholder="you@company.com"
          />
          <FieldError id={fieldId("email-error")} message={errors.email} />
        </div>
      </div>

      <div className={`grid gap-5 ${fields.fleet ? "sm:grid-cols-2" : ""}`}>
        <div>
          <Label htmlFor={fieldId("company")} optional={intent !== "demo"}>
            Company
          </Label>
          <input
            id={fieldId("company")}
            name="company"
            type="text"
            autoComplete="organization"
            required={intent === "demo"}
            maxLength={120}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={describedBy("company")}
            className={`${inputClass(Boolean(errors.company))} h-11`}
            placeholder="Northline Snow Co."
          />
          <FieldError id={fieldId("company-error")} message={errors.company} />
        </div>
        {fields.fleet && (
          <div>
            <Label htmlFor={fieldId("fleetSize")} optional>
              Fleet size
            </Label>
            <div className="relative">
              <select
                id={fieldId("fleetSize")}
                name="fleetSize"
                defaultValue=""
                aria-invalid={Boolean(errors.fleetSize)}
                aria-describedby={describedBy("fleetSize")}
                className={`${inputClass(Boolean(errors.fleetSize))} h-11 appearance-none pr-10 has-[option[value=""]:checked]:text-fg-3`}
              >
                <option value="">Choose one</option>
                {FLEET_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {fleetSizeLabels[size]}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-fg-3" />
            </div>
            <FieldError id={fieldId("fleetSize-error")} message={errors.fleetSize} />
          </div>
        )}
      </div>

      {fields.services && (
        <fieldset aria-describedby={describedBy("services")}>
          <legend className="mb-1.5 text-[13px] font-medium text-fg-2">
            Services you run <span className="font-normal text-fg-3">(optional)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {(
              [
                [
                  "snow",
                  "Snow",
                  Snowflake,
                  "text-fg",
                  "has-[:checked]:border-fg/60 has-[:checked]:bg-surface-3 has-[:focus-visible]:outline-fg",
                  "text-fg",
                ],
                [
                  "lawn",
                  "Lawn",
                  Sprout,
                  "text-spruce",
                  "has-[:checked]:border-spruce/60 has-[:checked]:bg-spruce/12 has-[:focus-visible]:outline-spruce",
                  "text-spruce",
                ],
              ] as const
            ).map(([value, label, Icon, color, checkedTone, checkColor]) => (
              <label
                key={value}
                className={`inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-canvas px-4 text-sm text-fg-2 transition-colors select-none hover:border-fg-3/50 has-[:checked]:font-medium has-[:checked]:text-snow has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 ${checkedTone}`}
              >
                <input type="checkbox" name="services" value={value} className="peer sr-only" />
                <Icon aria-hidden className={`size-4 ${color}`} />
                {label}
                <Check aria-hidden className={`hidden size-3.5 ${checkColor} peer-checked:block`} strokeWidth={2.5} />
              </label>
            ))}
          </div>
          <FieldError id={fieldId("services-error")} message={errors.services} />
        </fieldset>
      )}

      {fields.message && (
        <div>
          <Label htmlFor={fieldId("message")} optional={fields.message === "optional"}>
            {intent === "contact" ? "How can we help?" : "Anything we should know?"}
          </Label>
          <textarea
            id={fieldId("message")}
            name="message"
            rows={intent === "contact" ? 5 : 3}
            maxLength={2000}
            required={fields.message === "required"}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
            className={`${inputClass(Boolean(errors.message))} resize-y py-3 leading-relaxed`}
            placeholder={
              intent === "contact"
                ? "Tell us about your routes, crews and what you use today."
                : "Routes, crews, what you use today…"
            }
          />
          <FieldError id={fieldId("message-error")} message={errors.message} />
        </div>
      )}

      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[10000px] size-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input type="hidden" name="source" value={pathname} />

      {status.state === "error" && (
        <div role="alert" className="rounded-xl border border-danger/30 bg-danger/10 p-3.5 text-sm text-danger">
          <p className="flex gap-2.5">
            <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
            {status.message}
          </p>
          {status.mailto && (
            <p className="mt-2 pl-[26px] text-fg-2">
              Or email us at{" "}
              <a href={status.mailto} className="font-medium text-fg underline underline-offset-4 hover:text-snow">
                {site.contactEmail}
              </a>
              .
            </p>
          )}
        </div>
      )}

      <div className="grid gap-4">
        <button type="submit" disabled={submitting} className={buttonClass({ size: "lg", className: "w-full" })}>
          {submitting ? (
            <>
              <LoaderCircle aria-hidden className="anim-spin size-4" />
              Sending…
            </>
          ) : (
            <>
              {intentCopy[intent].submit}
              <ButtonArrow />
            </>
          )}
        </button>
        <p className="text-center text-xs leading-relaxed text-fg-3">
          We only use your details to reply about Snowlawna. See our{" "}
          <Link href="/privacy" className="text-fg-2 underline underline-offset-4 hover:text-fg">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
