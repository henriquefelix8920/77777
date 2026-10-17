import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SITE, LINKS, waLink } from "../config";
import VideoBackground from "../components/VideoBackground";
import WhatsAppButton from "../components/WhatsAppButton";
import LinkTile from "../components/LinkTile";

/**
 * HOME — hub estilo linktree, emoldurado como um cartaz de show.
 * Fundo: video01.mp4 tocando guitarra (com fallback neon cinematográfico).
 */
export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="relative min-h-dvh">
      <VideoBackground />

      {/* ---------- Moldura editorial do "cartaz" ---------- */}
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-5 pb-28 pt-6 sm:px-8">
        {/* cabeçalho do cartaz */}
        <header className="anim-fade-down flex items-center justify-between text-[10px] uppercase tracking-[0.34em] text-slate-400 [animation-delay:120ms]">
          <span>Online</span>
          <span className="mx-4 h-px flex-1 bg-gradient-to-r from-neon-cyan/40 via-neon-magenta/40 to-transparent" />
          <span>Guitarra · Violão</span>
        </header>

        {/* carimbos verticais (desktop) */}
        <span
          className="vertical-text pointer-events-none fixed left-3 top-1/2 hidden -translate-y-1/2 text-[10px] text-slate-500/70 lg:block"
          aria-hidden="true"
        >
          Aula online · Ao vivo
        </span>
        <span
          className="vertical-text pointer-events-none fixed right-3 top-1/2 hidden -translate-y-1/2 rotate-180 text-[10px] text-slate-500/70 lg:block"
          aria-hidden="true"
        >
          Toque com intenção
        </span>

        {/* ---------- Hero: nome como letreiro de palco ---------- */}
        <section className="mt-10 text-center sm:mt-14">
          <p className="anim-fade-down inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-neon-cyan [animation-delay:240ms]">
            <span className="live-dot" aria-hidden="true" />
            {SITE.role}
          </p>

          <h1 className="mt-14 leading-none sm:mt-20">
            <span className="neon-title anim-letter-drop block text-[clamp(2.9rem,11vw,4.6rem)] font-black tracking-[0.04em] [animation-delay:380ms]">
              VALKYRJA
            </span>
            <span className="neon-title anim-letter-drop mt-1 block !font-bold text-[clamp(1.7rem,6.5vw,2.6rem)] tracking-[0.5em] text-neon-yellow [text-shadow:0_0_18px_rgba(255,238,0,0.35)] [animation-delay:560ms]">
              REIS
            </span>
          </h1>

          <p className="anim-fade-up mx-auto mt-5 max-w-[36ch] text-[15px] font-light leading-relaxed text-slate-300 [animation-delay:760ms]">
            Aulas de <strong className="font-semibold text-white">guitarra e violão</strong>,
            100% online. Escolha seu caminho abaixo — ou fale direto comigo.
          </p>

          {/* cordas decorativas sob o título */}
          <div
            className="anim-fade-up relative mx-auto mt-7 h-5 w-44 [animation-delay:900ms]"
            aria-hidden="true"
          >
            <span className="string-line top-1 animate-string-vibe" />
            <span className="string-line top-2.5 animate-string-vibe [animation-delay:0.5s]" />
            <span className="string-line top-4 animate-string-vibe [animation-delay:1s]" />
          </div>
        </section>

        {/* ---------- Links principais (hub) ---------- */}
        <nav aria-label="Links principais" className="mt-9 flex flex-col gap-3.5 sm:mt-11">
          {LINKS.map((item, i) => (
            <LinkTile key={item.id} item={item} index={i} />
          ))}
        </nav>

        {/* ---------- CTA de conversão: agendar aula ---------- */}
        <div className="anim-fade-up mt-8 [animation-delay:820ms]">
          <a
            href={waLink(
              "Olá, Valkyrja! Quero agendar uma aula experimental de guitarra/violão online."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-[14px] px-6 py-4 text-[15px] font-bold uppercase tracking-[0.18em] text-void transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background:
                "linear-gradient(92deg, #00f0ff 0%, #7000ff 55%, #ff007f 100%)",
              boxShadow:
                "0 14px 44px -12px rgba(0,240,255,0.5), 0 14px 44px -12px rgba(255,0,127,0.4)",
            }}
            aria-label="Agendar aula experimental pelo WhatsApp"
          >
            {/* brilho que atravessa no hover */}
            <span
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/40 opacity-0 transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100"
              aria-hidden="true"
            />
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Agendar minha aula
          </a>

          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.28em] text-slate-500">
            Atendimento pessoal · Sem compromisso
          </p>
        </div>

        {/* rodapé discreto */}
        <footer className="mt-auto pt-12 text-center">
          <p className="text-[10.5px] uppercase tracking-[0.3em] text-slate-500">
            <Link to="/" className="transition-colors hover:text-neon-cyan">
              valkyrja&nbsp;reis
            </Link>
            <span className="mx-2 text-neon-magenta/60">✦</span>
            aulas online de guitarra & violão
          </p>
        </footer>
      </div>

      {/* camadas cinematográficas globais */}
      <div className="film-grain scanlines pointer-events-none fixed inset-0 z-[60]" aria-hidden="true" />

      <WhatsAppButton />

      {!mounted && null}
    </main>
  );
}
