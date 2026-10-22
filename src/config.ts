export const SITE = {
  name: "Valkyrja Reis",
  role: "Música · Tecnologia · Ideias",
  tagline: "Toque com intenção.",
  /** WhatsApp real — usado pelos CTAs e pelo botão flutuante */
  whatsappNumber: "5534996508397", // (34) 99650-8397
} as const;

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
