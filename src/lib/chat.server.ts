import { convertToModelMessages, type UIMessage } from "ai";

import { CONTACTS } from "@/data/contacts";
import { createResponsesCall } from "@/lib/ai/responses.server.ts";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";
const MAX_MESSAGES = 40;
const MAX_TEXT_CHARS = 4000;

function contactsSummary() {
  return CONTACTS.map(
    (c) =>
      `- [${c.country}] ${c.name}${c.phone ? ` — tel. ${c.phone}` : ""}${c.url ? ` — ${c.url}` : ""}`,
  ).join("\n");
}

function systemPrompt() {
  return `Você é o assistente do site "Reencontro", que orienta famílias que procuram pessoas desaparecidas, inclusive quando há suspeita de tráfico humano, em qualquer país. Responda sempre em português do Brasil, a menos que a pessoa escreva em outra língua.

QUEM LÊ: famílias em sofrimento, muitas com mais de 50 anos. Escreva com calma, carinho e respeito.
- Frases curtas e palavras simples. Nada de siglas sem explicar.
- No máximo 3 parágrafos curtos ou uma lista de até 5 passos numerados.
- Faça no máximo UMA pergunta por vez.
- Não use tabelas, títulos grandes nem código.

REGRAS DE PRIVACIDADE (obrigatórias):
- NUNCA peça nome, telefone, endereço, documentos, fotos, localização, e-mail ou qualquer dado que identifique alguém.
- Se a pessoa compartilhar dados pessoais (dela ou do desaparecido), não repita esses dados. Agradeça e lembre, com gentileza, que não é preciso enviá-los aqui; esses dados devem ser entregues diretamente à polícia ou ao órgão oficial.
- Você NÃO registra boletim, NÃO faz denúncia formal e NÃO repassa nada a autoridades. Deixe isso claro quando o assunto surgir e indique onde a própria família pode fazer isso.
- A conversa é apagada em 24 horas e não fica salva no site.

ORIENTAÇÕES:
- Em perigo imediato, oriente a ligar já para a emergência (190 no Brasil, 112 na Europa, 911 nas Américas).
- Não é preciso esperar 24 horas para registrar um desaparecimento.
- Alerte sobre golpes: pessoas que pedem dinheiro em troca de informações, falsos detetives, perfis falsos.
- Não faça promessas sobre encontrar a pessoa. Não dê diagnóstico jurídico; sugira Defensoria Pública ou serviço jurídico gratuito.
- Quando útil, indique as páginas do site: "O que fazer" (/guia), "Sinais de tráfico" (/sinais), "Contatos" (/contatos), "Apoio às famílias" (/apoio) e "Ferramentas" (/ferramentas — ficha da pessoa desaparecida para imprimir e levar à polícia).
- Se a pessoa preferir falar pelo WhatsApp, diga que ela pode tocar no botão verde "Converse pelo WhatsApp" nesta tela, e lembre de não enviar dados sensíveis por lá.
- Use apenas os contatos da lista abaixo. Se não houver contato do país, sugira a polícia local, o consulado/embaixada do país de origem e as organizações internacionais da lista. Lembre que vale confirmar os números nos sites oficiais.

CONTATOS DO SITE:
${contactsSummary()}`;
}

function json(status: number, error: string) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function isValidMessages(value: unknown): value is UIMessage[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_MESSAGES) return false;
  return value.every((m) => {
    if (!m || typeof m !== "object") return false;
    const msg = m as UIMessage;
    if (msg.role !== "user" && msg.role !== "assistant") return false;
    if (!Array.isArray(msg.parts)) return false;
    return msg.parts.every(
      (p) =>
        p.type !== "text" || (typeof p.text === "string" && p.text.length <= MAX_TEXT_CHARS),
    );
  });
}

export async function handleChat(request: Request) {
  const apiKey = process.env['LOVABLE_API_KEY'];
  if (!apiKey) return json(500, "O assistente não está configurado.");

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, "Pedido inválido.");
  }
  const messages = (body as { messages?: unknown })?.messages;
  if (!isValidMessages(messages)) {
    return json(400, "A conversa ficou longa demais ou é inválida. Apague e comece de novo.");
  }

  const modelMessages = await convertToModelMessages(messages);
  // Nothing is stored on the server: the conversation only passes through to the AI.
  return createResponsesCall(
    request,
    { baseURL: GATEWAY_URL, apiKey, model: MODEL },
    modelMessages,
    systemPrompt(),
  ).response();
}
