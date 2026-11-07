import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartHandshake, Moon, Scale, Users } from "lucide-react";
import { PageIntro } from "@/components/site/PageIntro";

export const Route = createFileRoute("/apoio")({
  head: () => ({
    meta: [
      { title: "Apoio às famílias de pessoas desaparecidas — Reencontro" },
      {
        name: "description",
        content:
          "Direitos das famílias, cuidado emocional e redes de apoio para quem procura um familiar desaparecido.",
      },
      { property: "og:title", content: "Apoio às famílias de pessoas desaparecidas" },
      {
        property: "og:description",
        content: "Seus direitos, cuidado emocional e organizações que acompanham famílias.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApoioPage,
});

const RIGHTS = [
  "Registrar o desaparecimento a qualquer momento, sem esperar prazo.",
  "Receber cópia do registro e saber quem acompanha o caso.",
  "Ser informada sobre o andamento da investigação.",
  "Ter atendimento sem discriminação, no seu idioma ou com intérprete.",
  "Pedir assistência consular se a pessoa estiver em outro país.",
  "Ser tratada com respeito e ter a privacidade da família protegida.",
];

const CARE = [
  {
    icon: Moon,
    title: "Cuide do básico",
    text: "Dormir, comer e beber água parecem pequenos, mas são o que sustenta uma busca longa.",
  },
  {
    icon: Users,
    title: "Divida as tarefas",
    text: "Uma pessoa fala com a polícia, outra organiza a divulgação, outra cuida da casa.",
  },
  {
    icon: HeartHandshake,
    title: "Fale com quem entende",
    text: "Grupos de famílias de desaparecidos oferecem escuta e experiência que ninguém mais tem.",
  },
  {
    icon: Scale,
    title: "Busque orientação jurídica",
    text: "Defensorias públicas e ONGs podem acompanhar o caso gratuitamente.",
  },
];

const NETWORKS = [
  { name: "Mães da Sé (Brasil)", text: "Acolhimento e divulgação de pessoas desaparecidas." },
  { name: "APAV (Portugal)", text: "Apoio gratuito a vítimas de crime e familiares." },
  { name: "Missing People (Reino Unido)", text: "Linha de apoio emocional às famílias." },
  { name: "Cruz Vermelha (internacional)", text: "Busca de familiares separados entre países." },
  { name: "OIM (internacional)", text: "Assistência e retorno seguro de vítimas de tráfico." },
];

function ApoioPage() {
  return (
    <>
      <PageIntro eyebrow="Você não está só" title="Apoio às famílias">
        A busca por alguém que amamos é exaustiva. Cuidar de você também faz parte de encontrá-lo.
      </PageIntro>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-medium">Seus direitos</h2>
          <p className="mt-2 text-muted-foreground">
            As leis variam por país, mas estes direitos são reconhecidos na maioria deles.
          </p>
          <ul className="mt-6 space-y-3">
            {RIGHTS.map((r) => (
              <li key={r} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-lantern" />
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-medium">Cuidar de quem procura</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {CARE.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl bg-secondary p-6">
                <Icon className="mb-3 size-7 text-primary" />
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="mt-1 text-secondary-foreground/80">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <div className="rounded-3xl bg-ink p-8 text-ink-foreground md:p-12">
          <h2 className="text-3xl font-medium">Redes que acompanham famílias</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {NETWORKS.map((n) => (
              <li key={n.name} className="rounded-xl border border-ink-foreground/15 p-5">
                <p className="font-bold">{n.name}</p>
                <p className="mt-1 text-ink-muted">{n.text}</p>
              </li>
            ))}
          </ul>
          <Link
            to="/contatos"
            className="mt-8 inline-block font-bold text-lantern underline underline-offset-4"
          >
            Ver todos os contatos e telefones
          </Link>
        </div>
      </section>
    </>
  );
}
