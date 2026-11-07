import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ClipboardList,
  Clock,
  Globe2,
  HeartHandshake,
  MessagesSquare,
  Phone,
  ShieldAlert,
  Users,
} from "lucide-react";
import heroImage from "@/assets/hero-lantern.jpg";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/chat/WhatsAppButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reencontro — Apoio a famílias de pessoas desaparecidas" },
      {
        name: "description",
        content:
          "Orientação segura, instituições competentes e redes de apoio para famílias que procuram pessoas desaparecidas em possível contexto de tráfico humano.",
      },
      { property: "og:title", content: "Reencontro — Ninguém deveria procurar sozinho" },
      {
        property: "og:description",
        content:
          "Guia passo a passo, contatos oficiais por país e apoio às famílias de pessoas desaparecidas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PATHS = [
  {
    to: "/guia",
    icon: Clock,
    title: "O que fazer agora",
    text: "Passos claros para as primeiras horas, os primeiros dias e casos fora do país.",
  },
  {
    to: "/sinais",
    icon: ShieldAlert,
    title: "Reconhecer sinais de tráfico",
    text: "Ofertas falsas, documentos retidos e outros alertas que merecem atenção.",
  },
  {
    to: "/contatos",
    icon: Globe2,
    title: "Instituições por país",
    text: "Linhas oficiais de emergência, denúncia e apoio — sem fronteiras.",
  },
  {
    to: "/apoio",
    icon: HeartHandshake,
    title: "Apoio às famílias",
    text: "Seus direitos, cuidado emocional e organizações que caminham com você.",
  },
] as const;

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img
          src={heroImage}
          alt="Mãe e filho seguram uma lanterna acesa olhando para o horizonte ao entardecer"
          width={1600}
          height={1008}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-hero-fade" />
        <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:pb-24">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-lantern animate-rise">
            Informação · Orientação · Redes de apoio
          </p>
          <h1 className="max-w-3xl text-5xl font-medium leading-[1.05] md:text-7xl animate-rise">
            Ninguém deveria procurar sozinho.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-foreground/85 animate-rise">
            Apoio para famílias que buscam pessoas desaparecidas, inclusive quando há suspeita de
            tráfico humano — com caminhos seguros até as instituições certas, em qualquer país.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 animate-rise">
            <Button asChild variant="lantern" size="xl">
              <Link to="/guia">
                Meu familiar desapareceu <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/contatos">
                <Phone /> Encontrar contatos oficiais
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Myth buster */}
      <section className="border-b border-border bg-lantern-soft">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 md:flex-row md:items-center md:gap-8">
          <p className="font-display text-2xl font-medium text-accent-foreground">
            Não espere 24 horas.
          </p>
          <p className="text-accent-foreground/80">
            Na maioria dos países, o desaparecimento pode — e deve — ser registrado imediatamente.
            As primeiras horas são as mais importantes.
          </p>
        </div>
      </section>

      {/* Talk to someone */}
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <div className="rounded-3xl border border-border bg-card p-7 shadow-soft md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-medium md:text-4xl">Prefere conversar?</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Tire dúvidas por escrito, no seu tempo. Nenhum dado pessoal é pedido, não fazemos
              denúncia formal e a conversa é apagada em 24 horas.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="huge" className="justify-center">
              <Link to="/conversar">
                <MessagesSquare /> Conversar aqui no site
              </Link>
            </Button>
            <WhatsAppButton className="justify-center" />
          </div>
        </div>
      </section>

      {/* Paths */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-medium md:text-4xl">Por onde começar</h2>
          <p className="mt-3 text-muted-foreground">
            Escolha o que você precisa agora. Cada página foi escrita para ser lida com calma,
            mesmo em um momento difícil.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {PATHS.map(({ to, icon: Icon, title, text }) => (
            <Link
              key={to}
              to={to}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="mb-5 grid size-12 place-items-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-lantern group-hover:text-accent-foreground">
                <Icon className="size-6" />
              </span>
              <h3 className="text-2xl font-medium">{title}</h3>
              <p className="mt-2 text-muted-foreground">{text}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-bold text-primary">
                Abrir <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Tool highlight */}
      <section className="mx-auto max-w-6xl px-5">
        <div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-ink-foreground md:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 size-[30rem] bg-lantern-glow" />
          <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <h2 className="text-3xl font-medium md:text-4xl">
                Organize tudo para entregar às autoridades
              </h2>
              <p className="mt-4 text-ink-muted">
                Preencha a ficha da pessoa desaparecida e acompanhe um checklist dos passos
                essenciais. Você pode imprimir ou salvar em PDF. Nada é enviado pela internet.
              </p>
              <Button asChild variant="lantern" size="xl" className="mt-8">
                <Link to="/ferramentas">
                  <ClipboardList /> Abrir ferramentas
                </Link>
              </Button>
            </div>
            <ul className="space-y-3">
              {[
                "Ficha com foto, características e últimos contatos",
                "Checklist das primeiras 72 horas",
                "Pronto para imprimir e levar à polícia ou ao consulado",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 rounded-xl border border-ink-foreground/15 bg-ink-foreground/5 p-4"
                >
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-lantern" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              icon: Globe2,
              title: "Sem fronteiras",
              text: "Contatos oficiais e organizações internacionais para casos em outro país.",
            },
            {
              icon: ShieldAlert,
              title: "Segurança primeiro",
              text: "Orientações para evitar golpes, falsos informantes e exposição de risco.",
            },
            {
              icon: Users,
              title: "Rede de apoio",
              text: "Famílias, ONGs e serviços públicos que acolhem e acompanham.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="border-t-2 border-lantern pt-6">
              <Icon className="mb-4 size-7 text-primary" />
              <h3 className="text-xl font-medium">{title}</h3>
              <p className="mt-2 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
