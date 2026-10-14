import type { ReactNode } from "react";

/** Eyebrow pill with the logo's seasonal blade marker, then the section title and intro. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  align = "left",
  tone = "neutral",
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  tone?: "neutral" | "ice" | "spruce";
  className?: string;
}) {
  const centered = align === "center";
  const isSpruce = tone === "spruce";
  return (
    <div data-reveal className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      <div className={`flex ${centered ? "justify-center" : ""}`}>
        <p
          className={`eyebrow inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1 shadow-[0_1px_2px_rgb(15_15_18/0.05)] ${
            isSpruce ? "!text-spruce" : "!text-fg-2"
          }`}
        >
          <span
            aria-hidden
            className={`h-2 w-3.5 -skew-x-[32deg] rounded-[1px] ${isSpruce ? "bg-spruce" : "bg-fg"}`}
          />
          {eyebrow}
        </p>
      </div>
      <h2
        id={id}
        className="mt-5 font-wide text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] leading-[1.03] font-bold tracking-[-0.03em] text-snow"
      >
        {title}
      </h2>
      {children && <div className="mt-4 text-lg leading-relaxed text-fg-2">{children}</div>}
    </div>
  );
}
