"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Marks `[data-reveal]` elements with `data-revealed` as they scroll into view; the CSS in
 * globals.css does the rest (and does nothing under prefers-reduced-motion).
 * Re-scans on client-side navigation.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const pending = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    if (!("IntersectionObserver" in window)) {
      pending.forEach((element) => element.setAttribute("data-revealed", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    pending.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
