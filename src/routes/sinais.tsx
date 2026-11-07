import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, FileLock2, MessageCircleWarning, Plane, Smartphone, Wallet } from "lucide-react";
import { PageIntro } from "@/components/site/PageIntro";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/sinais")({
  head: () => ({
    meta: [
      { title: "Sinais de tráfico humano — Reencontro" },
      {
        name: "description",
        content:
          "Como reconhecer sinais de aliciamento e tráfico de pessoas: ofertas de emprego falsas, documentos retidos, controle da comunicação.",
      },
      { property: "og:title", content: "Como reconhecer sinais de tráfico humano" },
      {
        property: "og:description",
        content: "Alertas que podem indicar aliciamento, exploração ou tráfico de pessoas.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SinaisPage,
});

const SIGNS = [
  {
    icon: Briefcase,
    title: "Oferta boa demais",
    text: "Emprego no exterior com salário alto, sem exigir experiência, com viagem paga e urgência para decidir.",
  },
  {
    icon: FileLock2,
    title: "Documentos retidos",
    text: "Alguém fica com o passaporte ou documento “para guardar” ou “resolver a papelada”.",
  },
  {
    icon: Wallet,
    title: "Dívida que não acaba",
    text: "A pessoa passa a dever a viagem, a moradia ou a comida e não consegue pagar nunca.",
  },
  {
    icon: Smartphone,
    title: "Comunicação controlada",
    text: "Mensagens curtas, sempre no mesmo horário, com outra pessoa por perto ou mudança brusca de número.",
  },
  {
    icon: MessageCircleWarning,
    title: "Mudança de comportamento",
    text: "Medo, respostas evasivas, histórias que não batem ou pedido para a família não procurar a polícia.",
  },
  {
    icon: Plane,
    title: "Viagem sem detalhes",
    text: "Não sabe dizer o endereço onde vai morar, o nome da empresa ou quem vai buscá-la no destino.",
  },
];

const FAQ = [
  {
    q: "Qual a diferença entre tráfico de pessoas e contrabando de migrantes?",
    a: "No contrabando, a pessoa paga para atravessar uma fronteira de forma irregular. No tráfico, ela é enganada, forçada ou coagida para ser explorada — no trabalho, sexualmente, em casamento forçado ou outras formas. O tráfico pode acontecer dentro do próprio país.",
  },
  {
    q: "Meu familiar aceitou ir. Ainda pode ser tráfico?",
    a: "Sim. O consentimento obtido por engano, ameaça ou abuso de vulnerabilidade não vale. Muitas vítimas aceitaram uma proposta que parecia legítima.",
  },
  {
    q: "Como verificar uma oferta de emprego no exterior?",
    a: "Pesquise o nome da empresa e do recrutador, peça contrato por escrito no seu idioma e confirme com o consulado do país de destino. Na Colômbia, a linha anti-trata também verifica ofertas suspeitas.",
  },
  {
    q: "Tenho medo de denunciar. E se piorar a situação?",
    a: "As linhas de denúncia aceitam relatos anônimos e são treinadas para agir com cuidado. Conte o que você sabe; os profissionais avaliam o risco antes de agir.",
  },
];

function SinaisPage() {
  return (
    <>
      <PageIntro eyebrow="Prevenção e identificação" title="Sinais que podem indicar tráfico">
        Nenhum sinal sozinho prova um crime. Mas, juntos, eles merecem atenção e uma conversa com
        as autoridades.
      </PageIntro>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNS.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-7 shadow-soft">
              <Icon className="mb-4 size-8 text-primary" />
              <h2 className="text-xl font-medium">{title}</h2>
              <p className="mt-2 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5">
        <h2 className="mb-6 text-3xl font-medium">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-6">
          {FAQ.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="text-left text-base font-bold">{item.q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-8 rounded-2xl bg-lantern-soft p-6 text-accent-foreground">
          Reconheceu algum sinal?{" "}
          <Link to="/contatos" className="font-bold underline underline-offset-4">
            Encontre a linha de denúncia do seu país
          </Link>
          .
        </p>
      </section>
    </>
  );
}
