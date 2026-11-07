import { cn } from "@/lib/utils";

/** The assistant's identity: the same glowing lantern as the site logo. */
export function LanternMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("relative grid size-11 shrink-0 place-items-center rounded-full bg-ink", className)}
    >
      <span className="absolute inset-2 rounded-full bg-lantern blur-[6px] animate-glow" />
      <span className="relative size-3 rounded-full bg-lantern-soft" />
    </span>
  );
}
