import { useRef, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import VideoFlashBackground from "./VideoFlashBackground";
import WhatsAppButton from "./WhatsAppButton";
import { SITE, waLink } from "../config";
import { useScrollExperience } from "../useScrollExperience";

export default function SiteFrame({ children }: { children: ReactNode }) {
  const progressRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  useScrollExperience(progressRef);

  return (
    <main className="home-shell relative min-h-dvh overflow-clip">
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <VideoFlashBackground />
      <header className="home-header relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link
          to={pathname === "/" ? "#inicio" : "/"}
          onClick={() => {
            if (pathname !== "/") window.scrollTo(0, 0);
          }}
          className="wordmark"
          aria-label={`${SITE.name}, início`}
        >
          VR<span>_</span>
        </Link>
        <p className="hidden text-[11px] uppercase tracking-[0.22em] text-slate-300 sm:block">
          Música · Tecnologia · Ideias
        </p>
        <a href="#universos" className="header-link">
          Explorar <ArrowDown size={14} />
        </a>
      </header>

      {children}

      <footer className="home-footer relative z-10 mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link
          to={pathname === "/" ? "#inicio" : "/"}
          onClick={() => window.scrollTo(0, 0)}
          className="footer-brand"
        >
          {SITE.name.toUpperCase()} <span>_</span>
        </Link>
        <p>Música, tecnologia e ideias. Feito com intenção.</p>
        <a
          href={waLink("Olá, Valkyrja! Vim pelo seu site e quero conversar.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Fale comigo <ArrowRight size={14} />
        </a>
      </footer>
      <div
        className="scanlines pointer-events-none fixed inset-0 z-[60]"
        aria-hidden="true"
      />
      <WhatsAppButton />
    </main>
  );
}
