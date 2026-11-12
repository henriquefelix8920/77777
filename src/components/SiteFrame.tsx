import { type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { SITE, waLink } from "../config";

export default function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="site-shell">
        <header className="site-header">
          <a className="brand-mark" href="#inicio" aria-label={SITE.name}>V<span>R</span><i>.</i></a>
          <nav aria-label="Navegação principal">
            <a href="#abordagem">Abordagem</a>
            <a href="#trabalho">O que faço</a>
            <a href="#processo">Processo</a>
            <a href="#portfolio">Projetos</a>
          </nav>
          <a className="header-contact" href={waLink("Olá! Quero conversar sobre um projeto.")} target="_blank" rel="noreferrer">Contato <ArrowUpRight size={15} /></a>
        </header>
        {children}
        <footer className="site-footer">
          <a className="brand-mark" href="#inicio">V<span>R</span><i>.</i></a>
          <p>Feito com curiosidade, intenção e algumas linhas de código.</p>
          <span>© {new Date().getFullYear()} {SITE.name}</span>
        </footer>
      </main>

      <a
        className="whatsapp-float"
        href={waLink("Olá! Vim pelo site e gostaria de conversar.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar pelo WhatsApp"
      >
        <span className="whatsapp-float-pulse" aria-hidden="true" />
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M20.1 11.8a8.3 8.3 0 0 1-12.3 7.3l-4.3 1.1 1.1-4.2A8.3 8.3 0 1 1 20.1 11.8Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.4 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.7c.2-.2.4-.2.6-.1l1.8.8c.3.1.4.3.4.5v.5c0 .3-.1.5-.4.7-.5.3-1.2.5-1.9.4-1.1-.2-2.5-.9-3.7-2.1s-1.9-2.6-2.1-3.7c-.1-.7.1-1.4.4-1.9Z" fill="currentColor" />
        </svg>
        <span className="whatsapp-float-tooltip">Fale comigo</span>
      </a>
    </>
  );
}
