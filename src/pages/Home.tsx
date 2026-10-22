import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  Code2,
  Guitar,
  Radio,
  Sparkles,
} from "lucide-react";
import { SITE, waLink } from "../config";
import VideoFlashBackground from "../components/VideoFlashBackground";
import WhatsAppButton from "../components/WhatsAppButton";

const services = [
  {
    number: "01",
    eyebrow: "APRENDER · 1:1 · ONLINE",
    title: "Guitarra com direção. Música com intenção.",
    text: "Aulas individuais de guitarra e violão, construídas ao redor do que você quer tocar. Técnica, ritmo, harmonia e repertório entram no plano para fazer sentido na sua música — não numa fórmula pronta.",
    icon: Guitar,
    color: "cyan",
    label: "Conhecer as aulas",
    href: "/aulas-ao-vivo",
  },
  {
    number: "02",
    eyebrow: "ESTUDAR · IMPROVISAÇÃO · COMUNIDADE",
    title: "Menos decorar. Mais ouvir, escolher e criar.",
    text: "A Arte Suave da Improvisação aproxima conceitos musicais do instrumento. Um espaço para explorar ideias, experimentar frases e transformar escalas em linguagem própria — no seu tempo e junto com outros guitarristas.",
    icon: Radio,
    color: "magenta",
    label: "Explorar o curso",
    href: "/curso-improviso-na-pentatonica",
  },
  {
    number: "03",
    eyebrow: "CRIAR · PRESENÇA DIGITAL · WEB",
    title: "Uma ideia boa merece um site à altura.",
    text: "Crio sites autorais para artistas, profissionais e projetos com algo a dizer: identidade visual, mensagem clara e uma experiência que funciona de verdade no celular. Tecnologia a serviço da sua ideia — sem cara de template genérico.",
    icon: Code2,
    color: "violet",
    label: "Conversar sobre meu site",
    href: waLink(
      "Olá, Valkyrja! Quero conversar sobre a criação de um site para meu projeto.",
    ),
    external: true,
  },
];

function useScrollExperience(
  progressRef: React.RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }),
        { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
      );
      targets.forEach((target) => observer.observe(target));
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const range =
          document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${range > 0 ? window.scrollY / range : 0})`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progressRef]);
}

export default function HomePage() {
  const progressRef = useRef<HTMLDivElement>(null);
  useScrollExperience(progressRef);

  return (
    <main className="home-shell relative min-h-dvh overflow-clip">
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <VideoFlashBackground />
      <header className="home-header relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a
          href="#inicio"
          className="wordmark"
          aria-label="Valkyrja Reis, início"
        >
          VR<span>_</span>
        </a>
        <p className="hidden text-[11px] uppercase tracking-[0.22em] text-slate-300 sm:block">
          Música · Tecnologia · Ideias
        </p>
        <a href="#universos" className="header-link">
          Explorar <ArrowDown size={14} />
        </a>
      </header>

      <section
        id="inicio"
        className="hero-section relative z-10 mx-auto flex min-h-[82svh] w-full max-w-6xl flex-col justify-center px-5 pb-20 pt-12 sm:min-h-[86svh] sm:px-8 sm:pt-16"
      >
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">
            <span className="live-dot" aria-hidden="true" /> Valkyrja Reis{" "}
            <span className="eyebrow-separator">/</span> {SITE.tagline}
          </p>
          <h1 className="hero-title neon-title">
            Música, tecnologia
            <br />
            <span className="hero-title-accent">e ideias em movimento.</span>
          </h1>
          <p className="hero-description">
            Da primeira nota ao próximo projeto digital: ensino guitarra,
            compartilho caminhos para improvisar e crio sites que dão forma a
            boas ideias.
          </p>
          <div className="hero-actions">
            <a href="#universos" className="primary-cta">
              Encontre seu próximo passo <ArrowDown size={17} />
            </a>
            <a
              href={waLink(
                "Olá, Valkyrja! Quero conversar sobre aulas de guitarra, o curso ou um site para meu projeto.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cta"
            >
              Vamos conversar <ArrowRight size={16} />
            </a>
          </div>
          <p className="hero-note">
            <Sparkles size={14} /> Música, tecnologia e ideias — conectadas pela
            vontade de criar.
          </p>
        </div>
        <a
          href="#universos"
          className="scroll-cue"
          aria-label="Role para explorar"
        >
          <span>ROLE PARA EXPLORAR</span>
          <span className="scroll-cue-line" />
        </a>
      </section>

      <section
        id="universos"
        className="offerings-section relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 pt-12 sm:px-8 sm:pb-36"
      >
        <div className="section-intro" data-reveal>
          <p className="section-kicker">TRÊS FORMAS DE TIRAR IDEIAS DO PAPEL</p>
          <h2 className="section-title">
            Aprender. Criar. <span>Compartilhar.</span>
          </h2>
          <p className="section-lead">
            O fio que conecta tudo é o mesmo: curiosidade, prática e intenção —
            na música e além dela.
          </p>
        </div>
        <div className="service-list">
          {services.map((service) => {
            const Icon = service.icon;
            const CardContent = (
              <>
                <div className="service-topline">
                  <span className="service-number">{service.number}</span>
                  <span className="service-mark">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                </div>
                <p className={`service-eyebrow accent-${service.color}`}>
                  {service.eyebrow}
                </p>
                <h3>{service.title}</h3>
                <p className="service-description">{service.text}</p>
                <span className={`service-link accent-${service.color}`}>
                  {service.label}
                  <ArrowRight size={16} />
                </span>
              </>
            );
            return service.external ? (
              <a
                key={service.number}
                className={`service-card accent-border-${service.color} reveal-up`}
                data-reveal
                href={service.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CardContent}
              </a>
            ) : (
              <Link
                key={service.number}
                className={`service-card accent-border-${service.color} reveal-up`}
                data-reveal
                to={service.href}
              >
                {CardContent}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="manifesto-section relative z-10" data-reveal>
        <div className="manifesto-inner mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="section-kicker">MÚSICA · TECNOLOGIA · IDEIAS</p>
          <h2>
            Curiosidade para começar.
            <br />
            <span>Intenção para chegar mais longe.</span>
          </h2>
          <p>
            Seja aprendendo uma música, encontrando sua voz na improvisação ou
            construindo sua presença na internet: o melhor caminho é aquele que
            faz sentido para você.
          </p>
          <a
            href={waLink(
              "Olá, Valkyrja! Quero conversar sobre meu próximo passo.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-cta"
          >
            Me conta o que você quer criar <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <footer className="home-footer relative z-10 mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link to="/" className="footer-brand">
          VALKYRJA REIS <span>_</span>
        </Link>
        <p>Música, tecnologia e ideias. Feito com intenção.</p>
        <a
          href={waLink("Olá, Valkyrja! Vim pelo seu site.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Fale comigo <ArrowRight size={14} />
        </a>
      </footer>
      <div
        className="film-grain scanlines pointer-events-none fixed inset-0 z-[60]"
        aria-hidden="true"
      />
      <WhatsAppButton />
    </main>
  );
}
