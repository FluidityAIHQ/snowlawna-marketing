"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/logo";
import { IntentLink } from "@/components/intent-link";
import { ButtonArrow, DemoAppLink, buttonClass } from "@/components/ui/button";
import { mainNav, site } from "@/lib/site";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, () => window.scrollY > 8, () => false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 64rem)").matches) setOpen(false);
    };
    const root = document.documentElement;
    root.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);
  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden
        className={`absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid ? "border-line/80 bg-canvas/80 backdrop-blur-xl backdrop-saturate-150" : "border-transparent"
        }`}
      />
      <div className="wrap relative flex h-16 items-center gap-6">
        <Link href="/" className="-m-1 rounded-lg p-1" aria-label="Snowlawna home" onClick={close}>
          <Wordmark className="h-7 w-auto text-fg" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="rounded-full px-3 py-2 text-sm text-fg-2 transition-colors hover:text-fg aria-[current=page]:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-1.5 md:flex">
          <DemoAppLink href={site.demoAppUrl} variant="ghost" size="sm" />
          <IntentLink intent="demo" className={buttonClass({ size: "sm" })}>
            Book a demo
            <ButtonArrow />
          </IntentLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface-2 max-md:ml-auto lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-line bg-canvas/95 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pt-4 pb-8">
          <ul className="divide-y divide-line">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex items-center justify-between py-4 font-wide text-2xl font-semibold tracking-tight text-fg"
                >
                  {item.label}
                  <ButtonArrow />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-10">
            <IntentLink intent="demo" onNavigate={close} className={buttonClass({ size: "lg" })}>
              Book a demo
              <ButtonArrow />
            </IntentLink>
            <DemoAppLink href={site.demoAppUrl} size="lg" />
            <IntentLink
              intent="waitlist"
              onNavigate={close}
              className="py-2 text-center text-sm text-ice underline-offset-4 hover:underline"
            >
              Join the waitlist
            </IntentLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
