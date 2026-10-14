import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,translate] duration-200 ease-out disabled:pointer-events-none disabled:opacity-60 motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-canvas shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_2px_6px_rgb(10_30_20/0.18)] hover:bg-primary-hover hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.32),0_10px_26px_-6px_color-mix(in_oklab,var(--color-spruce)_42%,transparent)]",
  secondary:
    "border border-line-strong bg-surface/85 text-fg shadow-[0_1px_2px_rgb(10_30_20/0.05)] backdrop-blur-sm hover:border-spruce/50 hover:bg-surface-2",
  ghost: "text-fg-2 hover:bg-surface-2 hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
};

export function buttonClass({
  variant = "primary",
  size = "md",
  className = "",
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

/** Trailing arrow that nudges on hover. `external` shows the up-right arrow. */
export function ButtonArrow({ external = false }: { external?: boolean }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <Icon
      aria-hidden
      className={`size-4 transition-transform duration-200 ease-out ${
        external
          ? "motion-safe:group-hover/btn:translate-x-0.5 motion-safe:group-hover/btn:-translate-y-0.5"
          : "motion-safe:group-hover/btn:translate-x-0.5"
      }`}
      strokeWidth={2}
    />
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClass({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}

/** Link to the live product demo; always opens in a new tab. */
export function DemoAppLink({
  href,
  variant = "secondary",
  size = "md",
  className,
  children = "Open demo app",
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener" className={buttonClass({ variant, size, className })}>
      {children}
      <ButtonArrow external />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
