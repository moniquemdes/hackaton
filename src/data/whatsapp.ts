/**
 * WhatsApp number that answers visitors, digits only with country code
 * (e.g. "5511912345678"). PLACEHOLDER — replace with the real number.
 */
export const WHATSAPP_NUMBER = "5500000000000";

/** First message pre-filled in WhatsApp. Must never contain personal data. */
export const WHATSAPP_GREETING =
  "Olá! Vim pelo site Reencontro e gostaria de orientação. (Não vou enviar dados pessoais.)";

export function whatsappLink(number: string = WHATSAPP_NUMBER, text: string = WHATSAPP_GREETING) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
