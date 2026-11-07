/**
 * Notice shown before any conversation starts — in the site chat and before
 * opening WhatsApp. Keep wording simple: many readers are older adults.
 */
export const CHAT_NOTICE = [
  {
    id: "sem-dados",
    title: "Nenhum dado será pedido",
    text: "Você não precisa dizer seu nome, telefone, endereço ou documentos. Pode conversar sem se identificar.",
  },
  {
    id: "sem-denuncia",
    title: "Este site não faz denúncia formal",
    text: "Aqui você recebe orientação. Para registrar o desaparecimento ou denunciar, é preciso procurar a polícia ou os contatos oficiais — nós mostramos como.",
  },
  {
    id: "apagada-24h",
    title: "A conversa será apagada em 24 horas",
    text: "Nada fica salvo conosco. A conversa fica só neste aparelho e é apagada sozinha em 24 horas. Você também pode apagar antes.",
  },
] as const;

/** Extra guidance specific to WhatsApp, shown before leaving the site. */
export const WHATSAPP_NOTICE = [
  {
    id: "sem-dados-sensiveis",
    title: "Não envie dados sensíveis no WhatsApp",
    text: "Evite nomes completos, documentos (CPF, RG, passaporte), endereços, fotos, localização ou senhas. Conte só o necessário para ser orientado.",
  },
  {
    id: "mensagens-temporarias",
    title: "Ative as mensagens temporárias",
    text: "No WhatsApp, toque no nome da conversa, depois em “Mensagens temporárias” e escolha “24 horas”. Assim as mensagens somem sozinhas.",
  },
] as const;

export const EMERGENCY_REMINDER =
  "Em perigo imediato, ligue para a emergência: 190 no Brasil · 112 na Europa · 911 nas Américas.";
