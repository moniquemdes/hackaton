import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="pointer-events-none absolute -left-20 -top-20 size-[28rem] bg-lantern-glow" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-lantern">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl font-medium md:text-5xl animate-rise">{title}</h1>
        {children && (
          <div className="mt-5 max-w-2xl text-lg text-ink-muted animate-rise">{children}</div>
        )}
      </div>
    </section>
  );
}
