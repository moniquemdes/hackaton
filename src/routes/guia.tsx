import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/site/PageIntro";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/guia")({
  head: () => ({
    meta: [
      { title: "O que fazer quando alguém desaparece — Reencontro" },
      {
        name: "description",
        content:
          "Guia passo a passo para famílias: primeiras horas, registro na polícia, casos no exterior e como divulgar com segurança.",
      },
      { property: "og:title", content: "O que fazer quando alguém desaparece" },
      {
        property: "og:description",
        content: "Passos seguros para as primeiras horas, os primeiros dias e casos fora do país.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuiaPage,
});

const STAGES = [
  {
    when: "Agora",
    title: "Nas primeiras horas",
    steps: [
      "Ligue para a emergência local e registre o desaparecimento imediatamente. Não existe prazo de espera.",
      "Vá a uma delegacia e faça o boletim de ocorrência. Peça uma cópia e anote o número do registro.",
      "Leve uma foto recente, documento da pessoa e a roupa que ela usava quando foi vista pela última vez.",
      "Informe se há suspeita de tráfico: promessas de emprego, viagem recente, contato com desconhecidos.",
      "Não apague mensagens nem altere o celular ou computador da pessoa — podem ser provas.",
    ],
  },
  {
    when: "Dias 1 a 3",
    title: "Nos primeiros dias",
    steps: [
      "Reúna conversas, perfis em redes sociais, anúncios de emprego e contatos recentes em um só lugar.",
      "Contate hospitais, abrigos e serviços sociais da região onde a pessoa foi vista.",
      "Peça que o caso seja incluído no cadastro nacional de pessoas desaparecidas do seu país.",
      "Se houver crianças ou adolescentes envolvidos, acione também a linha 116 000 (Europa) ou o conselho tutelar (Brasil).",
      "Escolha uma pessoa da família para ser o contato oficial com a polícia e a imprensa.",
    ],
  },
  {
    when: "Fora do país",
    title: "Se a pessoa pode estar no exterior",
    steps: [
      "Contate o consulado ou a embaixada do seu país no local onde a pessoa estava ou para onde viajaria.",
      "Peça à polícia que solicite uma Difusão Amarela da INTERPOL — a família não pode pedir diretamente.",
      "Registre um pedido de busca na Cruz Vermelha (Restabelecimento de Laços Familiares).",
      "Procure a OIM, que presta assistência a vítimas de tráfico e organiza retornos seguros.",
      "Guarde passagens, vistos, contratos e nomes de agências ou recrutadores.",
    ],
  },
];

const SAFETY = [
  "Nunca pague por informações ou resgates. Comunique a polícia sobre qualquer pedido de dinheiro.",
  "Desconfie de pessoas que dizem saber onde está seu familiar e pedem sigilo.",
  "Ao divulgar, não publique endereço, telefone pessoal ou rotina da família. Use um número exclusivo.",
  "Não tente resgatar a pessoa por conta própria. Isso pode colocar vocês dois em risco.",
  "Se a pessoa for encontrada, avise todos os canais e retire as publicações.",
];

function GuiaPage() {
  return (
    <>
      <PageIntro eyebrow="Guia passo a passo" title="O que fazer quando alguém desaparece">
        Respire. Siga um passo de cada vez. Você não precisa fazer tudo sozinho — e não precisa
        esperar para agir.
      </PageIntro>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <ol className="space-y-8">
          {STAGES.map((stage, i) => (
            <li
              key={stage.title}
              className="grid gap-6 rounded-3xl border border-border bg-card p-7 shadow-soft md:grid-cols-[14rem_1fr] md:p-10"
            >
              <div>
                <span className="font-display text-6xl font-medium text-lantern">{i + 1}</span>
                <p className="mt-2 text-sm font-bold uppercase tracking-wider text-primary">
                  {stage.when}
                </p>
                <h2 className="mt-1 text-2xl font-medium">{stage.title}</h2>
              </div>
              <ul className="space-y-4">
                {stage.steps.map((step) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-2.5 size-2 shrink-0 rounded-full bg-primary" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <div className="rounded-3xl border-2 border-destructive/30 bg-destructive/5 p-7 md:p-10">
          <div className="mb-6 flex items-center gap-3">
            <AlertTriangle className="size-7 text-destructive" />
            <h2 className="text-2xl font-medium md:text-3xl">Proteja sua família durante a busca</h2>
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {SAFETY.map((s) => (
              <li key={s} className="rounded-xl bg-card p-5 shadow-soft">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-wrap gap-3 px-5 pt-12">
        <Button asChild variant="ink" size="xl">
          <Link to="/ferramentas">
            Preencher a ficha da pessoa <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="outline" size="xl">
          <Link to="/contatos">Ver contatos do meu país</Link>
        </Button>
      </section>
    </>
  );
}
