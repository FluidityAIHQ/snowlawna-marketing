import type { ReactNode } from "react";

/** Eyebrow with the logo's blade as its marker, then the section title and intro. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  align = "left",
  tone = "ice",
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  tone?: "ice" | "spruce";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div data-reveal className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      <p className={`eyebrow flex items-center gap-2.5 ${centered ? "justify-center" : ""} ${tone === "spruce" ? "!text-spruce" : ""}`}>
        <span aria-hidden className={`h-2 w-3.5 -skew-x-[32deg] rounded-[1px] ${tone === "spruce" ? "bg-spruce" : "bg-ice"}`} />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-5 font-wide text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] leading-[1.02] font-bold tracking-[-0.03em] text-snow"
      >
        {title}
      </h2>
      {children && <div className="mt-5 text-lg leading-relaxed text-fg-2">{children}</div>}
    </div>
  );
}
