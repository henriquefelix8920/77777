import { Link } from "react-router-dom";
import WhatsAppButton from "../components/WhatsAppButton";
import { waLink } from "../config";

type Props = {
  kicker: string;
  title: string;
  accent: string; // cor de destaque vinda da paleta
  description: string;
};

/**
 * Página provisória para as rotas que serão construídas em seguida
 * (Aulas ao Vivo / Curso Improviso na Pentatônica).
 * Mantém a identidade cinematográfica e o CTA de conversão via WhatsApp.
 */
export default function PlaceholderPage({ kicker, title, accent, description }: Props) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-void text-slate-200">
      {/* fundo editorial derivado da paleta */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(90% 70% at 50% -10%, ${accent}22 0%, rgba(8,10,20,0) 60%), radial-gradient(70% 60% at 85% 110%, #7000ff26 0%, rgba(8,10,20,0) 55%)`,
        }}
      />
      <div className="film-grain scanlines pointer-events-none fixed inset-0 z-[60]" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-6 pb-28 pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.3em] text-slate-400 transition-colors hover:text-neon-cyan"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Voltar
        </Link>

        <section className="mt-16 text-center">
          <p
            className="anim-fade-down inline-block rounded-full border px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em]"
            style={{ borderColor: `${accent}55`, color: accent, background: `${accent}0d` }}
          >
            {kicker}
          </p>
          <h1
            className="anim-letter-drop neon-title mt-6 text-[clamp(2rem,8vw,3.2rem)] font-black leading-tight [animation-delay:200ms]"
          >
            {title}
          </h1>
          <p className="anim-fade-up mx-auto mt-6 max-w-[40ch] text-[15px] font-light leading-relaxed text-slate-300 [animation-delay:420ms]">
            {description}
          </p>

          <div className="anim-fade-up mt-10 [animation-delay:560ms]">
            <a
              href={waLink(`Olá, Valkyrja! Tenho interesse em ${title}. Pode me contar mais?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-[14px] px-7 py-4 text-[14px] font-bold uppercase tracking-[0.16em] text-void transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: accent, boxShadow: `0 14px 40px -12px ${accent}99` }}
            >
              Quero saber mais
            </a>
            <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-slate-500">
              Esta página está sendo preparada — fale já pelo WhatsApp
            </p>
          </div>
        </section>

        <footer className="mt-auto pt-16 text-center text-[10.5px] uppercase tracking-[0.3em] text-slate-500">
          Valkyrja Reis ✦ Aulas online de guitarra & violão
        </footer>
      </div>

      <WhatsAppButton />
    </main>
  );
}
