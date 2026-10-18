/**
 * Fonte única de verdade do site.
 * Substitua os campos marcados com [DEPOIS] quando os links reais existirem.
 */

export const SITE = {
  name: "Valkyrja Reis",
  role: "Guitarrista · Aulas Online",
  tagline: "Toque com intenção.",
  /** WhatsApp real — usado pelo botão flutuante e pelos CTAs das aulas */
  whatsappNumber: "5534996508397", // (34) 99650-8397
} as const;

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export type LinkItem = {
  id: string;
  label: string;
  sub?: string;
  href: string;
  external?: boolean;
  icon: "live" | "course" | "tiktok" | "youtube";
  accent: "cyan" | "magenta" | "violet" | "yellow";
  /** true = link ainda não definido (estado demonstração, nunca inventar URL) */
  comingSoon?: boolean;
};

export const LINKS: LinkItem[] = [
  {
    id: "aulas-ao-vivo",
    label: "Aulas ao Vivo",
    sub: "Guitarra e violão, online, em tempo real",
    href: "/aulas-ao-vivo",
    icon: "live",
    accent: "cyan",
  },
  {
    id: "curso-pentatonica",
    label: "Comunidade A Arte Suave da Improvisação",
    sub: "Improvisação, prática e encontros ao vivo",
    href: "/curso-improviso-na-pentatonica",
    icon: "course",
    accent: "magenta",
  },
  {
    id: "tiktok",
    label: "TikTok",
    sub: "Ver no TikTok",
    href: "https://www.tiktok.com/@valkyrja.reis",
    external: true,
    icon: "tiktok",
    accent: "violet",
  },
  {
    id: "youtube",
    label: "YouTube",
    sub: "Canal em breve",
    href: "#",
    external: true,
    icon: "youtube",
    accent: "yellow",
    comingSoon: true, // [DEPOIS] trocar pelo link real do canal
  },
];
