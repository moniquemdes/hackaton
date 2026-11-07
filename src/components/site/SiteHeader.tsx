import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/guia", label: "O que fazer" },
  { to: "/sinais", label: "Sinais de tráfico" },
  { to: "/contatos", label: "Contatos" },
  { to: "/apoio", label: "Apoio às famílias" },
  { to: "/ferramentas", label: "Ferramentas" },
  { to: "/conversar", label: "Conversar" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="relative grid size-9 place-items-center rounded-full bg-ink">
        <span className="absolute inset-1.5 rounded-full bg-lantern blur-[6px] animate-glow" />
        <span className="relative size-2.5 rounded-full bg-lantern-soft" />
      </span>
      <span className="font-display text-xl font-semibold tracking-tight text-foreground">
        Reencontro
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur print:hidden">
      <div className="bg-ink text-ink-foreground">
        <p className="mx-auto max-w-6xl px-5 py-1.5 text-center text-sm">
          Em perigo imediato? Ligue para a emergência local (190 no Brasil · 112 na Europa · 911
          nas Américas).
        </p>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3.5 py-2 text-[0.95rem] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground font-semibold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className="grid size-10 place-items-center rounded-full hover:bg-secondary lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border px-5 pb-4 lg:hidden" aria-label="Menu móvel">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-foreground hover:bg-secondary"
              activeProps={{ className: "bg-secondary font-semibold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
