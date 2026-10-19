"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { LeadIntent } from "@/lib/lead-schema";

/** Fired on window so the lead form on the current page can switch tabs. */
export const LEAD_INTENT_EVENT = "snowlawna:lead-intent";

// Pages that render the lead form, and the anchor to scroll to on each.
const FORM_ANCHORS: Record<string, string> = {
  "/": "#get-started",
  "/contact": "#lead-form",
};

/**
 * A call to action for one lead intent (book a demo or contact sales).
 * On pages with the form it scrolls there and preselects the intent; elsewhere it opens
 * /contact with the intent in the URL.
 */
export function IntentLink({
  intent,
  className,
  children,
  onNavigate,
}: {
  intent: LeadIntent;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const anchor = FORM_ANCHORS[pathname];

  if (anchor) {
    return (
      <a
        href={anchor}
        className={className}
        onClick={() => {
          window.dispatchEvent(new CustomEvent<LeadIntent>(LEAD_INTENT_EVENT, { detail: intent }));
          onNavigate?.();
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={`/contact?intent=${intent}#lead-form`} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
}
