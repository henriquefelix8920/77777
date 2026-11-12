import { type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { SITE, waLink } from "../config";

export default function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand-mark" href="#inicio" aria-label={SITE.name}>V<span>R</span><i>.</i></a>
        <nav aria-label="Navegação principal">
          <a href="#abordagem">Abordagem</a>
          <a href="#trabalho">O que faço</a>
          <a href="#processo">Processo</a>
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
  );
}
