import type { UIMessage } from "ai";

/** The conversation lives only on the visitor's device and is erased after 24 hours. */
export const CHAT_TTL_MS = 24 * 60 * 60 * 1000;
export const CHAT_STORAGE_KEY = "reencontro-conversa";

export interface StoredChat {
  startedAt: number;
  messages: UIMessage[];
}

export function isExpired(startedAt: number, now: number = Date.now()) {
  return now - startedAt >= CHAT_TTL_MS;
}

export function expiresAt(startedAt: number) {
  return startedAt + CHAT_TTL_MS;
}

/** Reads the stored chat; deletes it and returns null when older than 24h or invalid. */
export function loadChat(now: number = Date.now()): StoredChat | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredChat;
    if (typeof parsed?.startedAt !== "number" || !Array.isArray(parsed.messages)) {
      clearChat();
      return null;
    }
    if (isExpired(parsed.startedAt, now)) {
      clearChat();
      return null;
    }
    return parsed;
  } catch {
    clearChat();
    return null;
  }
}

export function saveChat(chat: StoredChat) {
  if (typeof window === "undefined") return;
  if (isExpired(chat.startedAt)) {
    clearChat();
    return;
  }
  try {
    window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chat));
  } catch {
    // Storage full or blocked: the chat simply isn't kept between visits.
  }
}

export function clearChat() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CHAT_STORAGE_KEY);
  } catch {
    // ignore
  }
}
