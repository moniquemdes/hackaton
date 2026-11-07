import { createFileRoute } from "@tanstack/react-router";
import { Clock, ExternalLink, Phone, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageIntro } from "@/components/site/PageIntro";
import {
  CONTACTS,
  CONTACT_TYPE_LABEL,
  filterContacts,
  listCountries,
  type ContactType,
} from "@/data/contacts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contatos")({
  head: () => ({
    meta: [
      { title: "Instituições e contatos por país — Reencontro" },
      {
        name: "description",
        content:
          "Linhas oficiais de emergência, denúncia de tráfico humano, pessoas desaparecidas e apoio a famílias em vários países.",
      },
      { property: "og:title", content: "Contatos oficiais por país" },
      {
        property: "og:description",
        content: "Emergência, denúncia de tráfico e apoio às famílias — sem fronteiras.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContatosPage,
});

const TYPES: (ContactType | "todos")[] = [
  "todos",
  "emergencia",
  "trafico",
  "desaparecidos",
  "apoio",
  "internacional",
];

const TYPE_STYLE: Record<ContactType, string> = {
  emergencia: "bg-destructive/10 text-destructive",
  trafico: "bg-lantern-soft text-accent-foreground",
  desaparecidos: "bg-primary/10 text-primary",
  apoio: "bg-secondary text-secondary-foreground",
  internacional: "bg-ink text-ink-foreground",
};

function ContatosPage() {
  const countries = useMemo(() => listCountries(), []);
  const [country, setCountry] = useState("todos");
  const [type, setType] = useState<ContactType | "todos">("todos");
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => filterContacts(CONTACTS, { country, type, query }),
    [country, type, query],
  );

  return (
    <>
      <PageIntro eyebrow="Redes sem fronteiras" title="Instituições e contatos oficiais">
        Escolha o país onde a pessoa desapareceu ou onde pode estar. Os recursos internacionais
        aparecem sempre junto.
      </PageIntro>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft md:p-6">
          <div className="grid gap-4 md:grid-cols-[1fr_16rem]">
            <label className="relative block">
              <span className="sr-only">Buscar</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nome, número ou tema…"
                className="h-12 w-full rounded-full border border-input bg-background pl-12 pr-4 outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="block">
              <span className="sr-only">País</span>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="h-12 w-full rounded-full border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-ring"
                aria-label="Filtrar por país"
              >
                <option value="todos">Todos os países</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                aria-pressed={type === t}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm transition-colors",
                  type === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:bg-secondary",
                )}
              >
                {t === "todos" ? "Todos" : CONTACT_TYPE_LABEL[t]}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
          {results.length} {results.length === 1 ? "contato encontrado" : "contatos encontrados"}
        </p>

        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {results.map((c) => (
            <article
              key={c.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
                <span className="font-bold text-foreground">{c.country}</span>
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold", TYPE_STYLE[c.type])}>
                  {CONTACT_TYPE_LABEL[c.type]}
                </span>
                {c.hours && (
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Clock className="size-3.5" /> {c.hours}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-medium">{c.name}</h2>
              <p className="mt-2 flex-1 text-muted-foreground">{c.description}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {c.phone && (
                  <a
                    href={`tel:${c.phone.replace(/[^\d+]/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-bold text-ink-foreground hover:bg-ink/90"
                  >
                    <Phone className="size-4" /> {c.phone}
                  </a>
                )}
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 hover:bg-secondary"
                  >
                    Site oficial <ExternalLink className="size-4" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {results.length === 0 && (
          <p className="mt-6 rounded-2xl bg-muted p-8 text-center text-muted-foreground">
            Nenhum contato com esses filtros. Tente outro tipo ou procure o consulado do seu país.
          </p>
        )}

        <p className="mt-10 text-sm text-muted-foreground">
          Números revisados em novembro de 2026. Serviços mudam: confirme sempre no site oficial
          antes de ligar. Seu país não está aqui? Procure a polícia local e o consulado mais
          próximo.
        </p>
      </section>
    </>
  );
}
