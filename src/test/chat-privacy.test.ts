import { beforeEach, describe, expect, it } from "vitest";

import { CHAT_NOTICE } from "@/data/privacy-notice";
import { WHATSAPP_GREETING, whatsappLink } from "@/data/whatsapp";
import { CHAT_STORAGE_KEY, isExpired, loadChat, saveChat } from "@/lib/chat-storage";

const HOUR = 60 * 60 * 1000;

describe("chat is erased after 24 hours", () => {
  beforeEach(() => window.localStorage.clear());

  it("keeps a conversation that is 23 hours old", () => {
    const now = Date.now();
    saveChat({ startedAt: now - 23 * HOUR, messages: [] });
    expect(loadChat(now)?.startedAt).toBe(now - 23 * HOUR);
  });

  it("deletes a conversation once it is 24 hours old", () => {
    const now = Date.now();
    window.localStorage.setItem(
      CHAT_STORAGE_KEY,
      JSON.stringify({ startedAt: now - 24 * HOUR, messages: [] }),
    );
    expect(loadChat(now)).toBeNull();
    expect(window.localStorage.getItem(CHAT_STORAGE_KEY)).toBeNull();
  });

  it("treats exactly 24h as expired", () => {
    expect(isExpired(0, 24 * HOUR)).toBe(true);
    expect(isExpired(0, 24 * HOUR - 1)).toBe(false);
  });
});

describe("initial notice", () => {
  it("states no data is requested, no formal report, and 24h deletion", () => {
    expect(CHAT_NOTICE.map((n) => n.title)).toEqual([
      "Nenhum dado será pedido",
      "Este site não faz denúncia formal",
      "A conversa será apagada em 24 horas",
    ]);
  });
});

describe("WhatsApp link", () => {
  it("opens wa.me with digits only and the pre-filled greeting", () => {
    const url = whatsappLink("+55 (11) 91234-5678");
    expect(url).toBe(`https://wa.me/5511912345678?text=${encodeURIComponent(WHATSAPP_GREETING)}`);
  });
});
