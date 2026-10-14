"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Wordmark } from "@/components/brand/logo";
import { IntentLink } from "@/components/intent-link";
import { ButtonArrow, buttonClass } from "@/components/ui/button";
import { mainNav } from "@/lib/site";

const THEME_EVENT = "snowlawna:theme";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function subscribeToTheme(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onMediaChange = () => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return;
    } catch {
      // Ignore storage access errors
    }
    const next = media.matches ? "dark" : "light";
    const root = document.documentElement;
    root.dataset.theme = next;
    root.classList.toggle("dark", media.matches);
    root.classList.toggle("light", !media.matches);
    root.style.colorScheme = next;
    onChange();
  };
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onChange);
  media.addEventListener("change", onMediaChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onChange);
    media.removeEventListener("change", onMediaChange);
  };
}

function getIsDarkSnapshot(): boolean {
  const root = document.documentElement;
  if (root.dataset.theme === "dark") return true;
  if (root.dataset.theme === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function ThemeToggle({ className = "" }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribeToTheme, getIsDarkSnapshot, () => false);

  const toggleTheme = () => {
    const nextDark = !isDark;
    const next = nextDark ? "dark" : "light";
    const root = document.documentElement;
    root.dataset.theme = next;
    root.classList.toggle("dark", nextDark);
    root.classList.toggle("light", !nextDark);
    root.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Ignore storage write errors in restricted contexts
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface/85 text-fg-2 shadow-[0_1px_2px_rgb(15_15_18/0.05)] backdrop-blur-sm transition-colors hover:border-fg/35 hover:bg-surface-2 hover:text-fg ${className}`}
    >
      {isDark ? (
        <Sun aria-hidden className="size-4 text-fg transition-transform duration-200" strokeWidth={2} />
      ) : (
        <Moon aria-hidden className="size-4 text-fg transition-transform duration-200" strokeWidth={2} />
      )}
    </button>
  );
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
        className={`absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ${
          solid
            ? "border-line bg-canvas/85 shadow-[0_8px_30px_-16px_rgb(15_15_18/0.12)] backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-canvas/40 backdrop-blur-md"
        }`}
      />
      {/* Desktop: equal 1fr side columns keep the nav centred on the full header width. */}
      <div className="wrap relative flex h-header items-center gap-5 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="-m-1 justify-self-start rounded-lg p-1" aria-label="Snowlawna home" onClick={close}>
          <Wordmark className="h-7 w-auto text-snow" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 rounded-full border border-line/80 bg-surface/70 px-1.5 py-1 backdrop-blur-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="rounded-full px-3.5 py-1.5 text-sm font-medium text-fg-2 transition-colors hover:bg-surface-2 hover:text-fg aria-[current=page]:bg-surface-3 aria-[current=page]:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            <IntentLink intent="demo" className={buttonClass({ size: "sm" })}>
              Book a demo
              <ButtonArrow />
            </IntentLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-1 inline-flex size-9 items-center justify-center rounded-full border border-line-strong bg-surface/85 text-fg transition-colors hover:bg-surface-2 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X aria-hidden className="size-4" /> : <Menu aria-hidden className="size-4" />}
          </button>
        </div>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-x-0 top-header bottom-0 overflow-y-auto border-t border-line bg-canvas/95 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pt-4 pb-8">
          <ul className="divide-y divide-line">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex items-center justify-between py-4 font-wide text-2xl font-semibold tracking-tight text-snow"
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
            <IntentLink
              intent="waitlist"
              onNavigate={close}
              className="py-2 text-center text-sm font-medium text-fg-2 underline-offset-4 hover:text-fg hover:underline"
            >
              Join the waitlist
            </IntentLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
