import pt from "../../../messages/pt.json";
import en from "../../../messages/en.json";

/**
 * Confirmation email sent to the visitor after a successful submission.
 * Deliberately contains NO text typed into the form (not even the name): otherwise anyone could
 * use the form to send arbitrary content to a third party's address.
 */
const COPY = {
  pt: {
    subject: (ref: string) => `Recebemos o seu pedido — ${ref}`,
    lines: (ref: string, days: string) => [
      "Olá,",
      "",
      `Obrigado por contactar a Servus. Recebemos o seu pedido com a referência ${ref}.`,
      `Respondemos normalmente em até ${days} dias úteis.`,
      "",
      "Se não fez este pedido, pode ignorar esta mensagem.",
      "",
      "Equipa Servus",
    ],
  },
  en: {
    subject: (ref: string) => `We've received your request — ${ref}`,
    lines: (ref: string, days: string) => [
      "Hello,",
      "",
      `Thank you for contacting Servus. We've received your request with the reference ${ref}.`,
      `We usually reply within ${days} business days.`,
      "",
      "If you didn't make this request, you can ignore this message.",
      "",
      "The Servus team",
    ],
  },
} as const;

export function confirmationEmail(locale: string, reference: string): { subject: string; text: string } {
  const lang = locale === "en" ? "en" : "pt";
  const days = (lang === "en" ? en : pt).forms.responseDays;
  const c = COPY[lang];
  return { subject: c.subject(reference), text: c.lines(reference, days).join("\n") };
}
