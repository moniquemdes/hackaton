import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { AArrowDown, AArrowUp, AlertCircle, RotateCcw, Send, Square, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { LanternMark } from "@/components/chat/LanternMark";
import { NoticeList } from "@/components/chat/NoticeList";
import { WhatsAppButton } from "@/components/chat/WhatsAppButton";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { EMERGENCY_REMINDER } from "@/data/privacy-notice";
import { clearChat, expiresAt, isExpired, loadChat, saveChat } from "@/lib/chat-storage";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "Meu familiar desapareceu. O que faço primeiro?",
  "A pessoa pode estar em outro país. Quem procuro?",
  "Como saber se pode ser tráfico de pessoas?",
  "Estou muito abalado(a). Onde encontro apoio?",
];

function readError(error: Error | undefined) {
  if (!error) return null;
  try {
    const parsed = JSON.parse(error.message) as { error?: string };
    if (parsed?.error) return parsed.error;
  } catch {
    // not JSON
  }
  if (/failed to fetch|network/i.test(error.message))
    return "Sem conexão com a internet. Verifique e tente de novo.";
  return error.message || "Não foi possível responder agora. Tente de novo em instantes.";
}

function textOf(message: UIMessage) {
  return message.parts
    .filter((p): p is Extract<typeof p, { type: "text" }> => p.type === "text")
    .map((p) => p.text)
    .join("");
}

function hoursLeft(startedAt: number, now: number) {
  const ms = Math.max(0, expiresAt(startedAt) - now);
  const h = Math.ceil(ms / (60 * 60 * 1000));
  return h <= 1 ? "menos de 1 hora" : `${h} horas`;
}

type Phase = "loading" | "notice" | "chat";

export function ChatWindow() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState<number>(0);
  const [bigText, setBigText] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, stop, setMessages, error, regenerate, clearError } =
    useChat({ id: "reencontro", transport });

  const busy = status === "submitted" || status === "streaming";

  // Restore a conversation from this device only if it is less than 24h old.
  useEffect(() => {
    const stored = loadChat();
    if (stored) {
      setStartedAt(stored.startedAt);
      setMessages(stored.messages);
      setPhase("chat");
    } else {
      setPhase("notice");
    }
    setNow(Date.now());
  }, [setMessages]);

  const resetConversation = useCallback(() => {
    stop();
    clearError();
    setMessages([]);
    clearChat();
    setStartedAt(null);
    setPhase("notice");
  }, [stop, clearError, setMessages]);

  // Erase automatically when 24h have passed.
  useEffect(() => {
    if (!startedAt) return;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      if (isExpired(startedAt, t)) resetConversation();
    };
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [startedAt, resetConversation]);

  // Keep the conversation on this device (never on our server) until it expires.
  useEffect(() => {
    if (phase !== "chat" || !startedAt || busy) return;
    if (messages.length === 0) return;
    saveChat({ startedAt, messages });
  }, [messages, phase, startedAt, busy]);

  useEffect(() => {
    if (phase === "chat" && !busy) textareaRef.current?.focus();
  }, [phase, busy]);

  const accept = () => {
    const t = Date.now();
    setStartedAt(t);
    setNow(t);
    setPhase("chat");
  };

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || busy) return;
    clearError();
    void sendMessage({ text: clean });
  };

  const handleSubmit = (message: PromptInputMessage) => send(message.text);

  const confirmDelete = () => {
    if (window.confirm("Apagar toda a conversa agora? Não será possível recuperar.")) {
      resetConversation();
    }
  };

  const last = messages.at(-1);
  const waiting =
    status === "submitted" || (status === "streaming" && last?.role === "assistant" && !textOf(last));
  const errorText = readError(error);
  const textSize = bigText ? "text-xl md:text-2xl" : "text-lg md:text-xl";

  if (phase === "loading") {
    return <div className="min-h-[60vh] rounded-3xl border border-border bg-card" aria-busy />;
  }

  if (phase === "notice") {
    return (
      <section
        aria-labelledby="aviso-titulo"
        className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10"
      >
        <div className="flex items-center gap-4">
          <LanternMark className="size-14" />
          <h2 id="aviso-titulo" className="text-3xl font-medium md:text-4xl">
            Antes de começar
          </h2>
        </div>
        <p className="mt-4 text-lg text-muted-foreground">
          Este assistente dá orientações gerais, com calma e sem pressa. Leia os avisos abaixo:
        </p>
        <NoticeList className="mt-8" />
        <p className="mt-8 rounded-xl bg-lantern-soft p-4 text-base font-bold text-accent-foreground md:text-lg">
          {EMERGENCY_REMINDER}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button variant="default" size="huge" className="justify-center" onClick={accept}>
            Entendi, quero conversar
          </Button>
          <WhatsAppButton className="justify-center" label="Prefiro o WhatsApp" />
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Conversa com o assistente"
      className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border bg-secondary/60 p-4">
        <div className="mr-auto flex items-center gap-3">
          <LanternMark />
          <div>
            <p className="font-display text-xl font-medium leading-tight">Assistente Reencontro</p>
            {startedAt && now > 0 && (
              <p className="text-base text-muted-foreground">
                Esta conversa será apagada em {hoursLeft(startedAt, now)}.
              </p>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="xl"
          onClick={() => setBigText((v) => !v)}
          aria-pressed={bigText}
        >
          {bigText ? <AArrowDown aria-hidden /> : <AArrowUp aria-hidden />}
          {bigText ? "Letra normal" : "Letra maior"}
        </Button>
        <Button variant="outline" size="xl" onClick={confirmDelete}>
          <Trash2 aria-hidden /> Apagar conversa
        </Button>
        <WhatsAppButton size="xl" />
      </div>

      {/* Transcript */}
      <Conversation className="h-[55vh] min-h-[22rem] md:h-[60vh]">
        <ConversationContent className={cn("gap-7 p-5 md:p-8", textSize)}>
          <Message from="assistant">
            <MessageContent className={cn("leading-relaxed", textSize)}>
              <p>
                Olá. Estou aqui para ajudar você a entender os próximos passos. Pode escrever com
                suas palavras, no seu tempo. Lembre-se: <strong>não precisa dizer nomes nem
                dados pessoais</strong>.
              </p>
            </MessageContent>
          </Message>

          {messages.map((message) => {
            const text = textOf(message);
            if (!text) return null;
            const isUser = message.role === "user";
            return (
              <Message key={message.id} from={message.role}>
                <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground group-[.is-user]:text-right">
                  {isUser ? "Você" : "Assistente"}
                </p>
                <MessageContent
                  className={cn(
                    "leading-relaxed",
                    textSize,
                    "group-[.is-user]:rounded-2xl group-[.is-user]:bg-primary group-[.is-user]:px-5 group-[.is-user]:py-4 group-[.is-user]:text-primary-foreground",
                  )}
                >
                  {isUser ? (
                    <p className="whitespace-pre-wrap">{text}</p>
                  ) : (
                    <MessageResponse className="[&_a]:font-bold [&_a]:text-primary [&_a]:underline [&_li]:my-1.5 [&_p]:my-3">
                      {text}
                    </MessageResponse>
                  )}
                </MessageContent>
              </Message>
            );
          })}

          {waiting && (
            <Shimmer className={cn("font-bold", textSize)}>Pensando na melhor resposta…</Shimmer>
          )}

          {errorText && !busy && (
            <div
              role="alert"
              className="flex flex-col gap-3 rounded-2xl border-2 border-destructive/40 bg-destructive/5 p-5 text-lg sm:flex-row sm:items-center"
            >
              <AlertCircle className="size-7 shrink-0 text-destructive" aria-hidden />
              <p className="flex-1 text-foreground">{errorText}</p>
              <Button variant="outline" size="xl" onClick={() => void regenerate()}>
                <RotateCcw aria-hidden /> Tentar de novo
              </Button>
            </div>
          )}

          {messages.length === 0 && (
            <div>
              <p className="mb-3 text-lg font-bold">Você pode tocar em uma destas perguntas:</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="min-h-16 rounded-2xl border-2 border-border bg-background px-5 py-4 text-left text-lg font-bold text-foreground transition-colors hover:border-primary hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton aria-label="Ir para a última mensagem" />
      </Conversation>

      {/* Composer */}
      <div className="border-t border-border bg-background p-4 md:p-5">
        <label htmlFor="mensagem" className="mb-2 block text-lg font-bold">
          Escreva sua mensagem
        </label>
        <PromptInput onSubmit={handleSubmit} className="rounded-2xl border-2 bg-card">
          <PromptInputTextarea
            id="mensagem"
            ref={textareaRef}
            placeholder="Ex.: Meu filho não volta para casa desde ontem…"
            className={cn("min-h-24 px-4", textSize)}
            maxLength={2000}
          />
          <PromptInputFooter className="justify-between gap-3 px-3 pb-3">
            <span className="hidden text-base text-muted-foreground sm:inline">
              Não escreva nomes, documentos ou endereços.
            </span>
            <PromptInputSubmit
              status={status}
              onStop={stop}
              variant={busy ? "outline" : "default"}
              size="sm"
              aria-label={busy ? "Parar resposta" : "Enviar mensagem"}
              className="ml-auto h-12 rounded-full px-6 text-lg font-bold has-[>svg]:px-6 [&_svg]:size-5"
            >
              {busy ? (
                <>
                  <Square aria-hidden /> Parar
                </>
              ) : (
                <>
                  <Send aria-hidden /> Enviar
                </>
              )}
            </PromptInputSubmit>
          </PromptInputFooter>
        </PromptInput>
        <p className="mt-2 text-base text-muted-foreground sm:hidden">
          Não escreva nomes, documentos ou endereços.
        </p>
      </div>
    </section>
  );
}
