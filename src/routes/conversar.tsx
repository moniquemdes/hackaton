import { createFileRoute } from "@tanstack/react-router";

import { ChatWindow } from "@/components/chat/ChatWindow";

export const Route = createFileRoute("/conversar")({
  head: () => ({
    meta: [
      { title: "Conversar — Assistente Reencontro" },
      {
        name: "description",
        content:
          "Converse com o assistente do Reencontro para receber orientação. Nenhum dado pessoal é pedido e a conversa é apagada em 24 horas.",
      },
      { property: "og:title", content: "Converse com o assistente Reencontro" },
      {
        property: "og:description",
        content:
          "Orientação com calma para famílias de pessoas desaparecidas, sem pedir dados pessoais. Também pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConversarPage,
});

function ConversarPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-28 pt-10 md:px-5 md:pt-14">
      <h1 className="text-4xl font-medium md:text-5xl">Converse com a gente</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground md:text-xl">
        Escreva sua dúvida e receba orientação passo a passo. Se preferir, continue pelo
        WhatsApp.
      </p>
      <div className="mt-8">
        <ChatWindow />
      </div>
    </div>
  );
}
