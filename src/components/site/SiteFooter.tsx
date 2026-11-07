import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Logo } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/60 print:hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-muted-foreground">
            Informação, orientação e redes de apoio para famílias que procuram pessoas
            desaparecidas — em qualquer país.
          </p>
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
            Este site não coleta dados. O que você escreve nas ferramentas fica só no seu
            aparelho.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-sans text-sm font-bold uppercase tracking-wider text-foreground">
            Orientação
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/guia" className="hover:text-foreground">O que fazer agora</Link></li>
            <li><Link to="/sinais" className="hover:text-foreground">Sinais de tráfico</Link></li>
            <li><Link to="/ferramentas" className="hover:text-foreground">Ficha e checklist</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-sans text-sm font-bold uppercase tracking-wider text-foreground">
            Redes
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/contatos" className="hover:text-foreground">Instituições por país</Link></li>
            <li><Link to="/apoio" className="hover:text-foreground">Apoio às famílias</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-muted-foreground">
          Reencontro é um serviço informativo e não substitui as autoridades. Sempre registre o
          caso na polícia. Confirme os números nos sites oficiais.
        </p>
      </div>
    </footer>
  );
}
