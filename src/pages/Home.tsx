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
    const flow = document.querySelector<HTMLElement>(".service-flow");
    const route = flow?.querySelector<SVGPathElement>(
      ".signal-route__progress",
    );
    const track = flow?.querySelector<SVGPathElement>(".signal-route__track");
    const routeSvg = flow?.querySelector<SVGSVGElement>(".signal-route");
    const traveler = flow?.querySelector<HTMLElement>(
      ".signal-route__traveler",
    );
    const focusScene =
      document.querySelector<HTMLElement>("[data-focus-scene]");
    const routeLength = track?.getTotalLength() ?? 0;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    ).map((element) => ({
      element,
      top: element.getBoundingClientRect().top + window.scrollY,
      height: element.offsetHeight,
      depth: Number(element.dataset.parallax) || 1,
    }));
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const range =
          document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${range > 0 ? window.scrollY / range : 0})`;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
          return;
        if (flow && route && track && routeSvg && traveler && routeLength > 0) {
          const bounds = flow.getBoundingClientRect();
          const routeProgress = Math.max(
            0,
            Math.min(
              1,
              (window.innerHeight * 0.8 - bounds.top) /
                (bounds.height + window.innerHeight * 0.5),
            ),
          );
          route.style.strokeDashoffset = `${1000 * (1 - routeProgress)}`;
          const point = track.getPointAtLength(routeLength * routeProgress);
          const svgBounds = routeSvg.getBoundingClientRect();
          traveler.style.left = `${(point.x / 1000) * svgBounds.width}px`;
          traveler.style.top = `${(point.y / 1000) * svgBounds.height}px`;
          traveler.style.opacity =
            routeProgress > 0 && routeProgress < 1 ? "1" : "0";
        }
        if (focusScene) {
          const bounds = focusScene.getBoundingClientRect();
          const distance = Math.max(
            bounds.height + window.innerHeight * 0.48,
            1,
          );
          const focusProgress = Math.max(
            0,
            Math.min(1, (window.innerHeight * 0.88 - bounds.top) / distance),
          );
          focusScene.style.setProperty(
            "--focus-progress",
            focusProgress.toFixed(3),
          );
          focusScene.style.setProperty(
            "--focus-rotation",
            `${(-56 + 112 * focusProgress).toFixed(1)}deg`,
          );
          focusScene.style.setProperty(
            "--focus-counter-rotation",
            `${(56 - 112 * focusProgress).toFixed(1)}deg`,
          );
          focusScene.style.setProperty(
            "--focus-tilt-x",
            `${(16 - 32 * focusProgress).toFixed(1)}deg`,
          );
          focusScene.style.setProperty(
            "--focus-tilt-y",
            `${(-11 + 22 * focusProgress).toFixed(1)}deg`,
          );
          focusScene.style.setProperty(
            "--focus-scale",
            `${(0.76 + 0.22 * focusProgress).toFixed(3)}`,
          );
          focusScene.style.setProperty(
            "--focus-aperture",
            `${(0.3 + 0.6 * focusProgress).toFixed(3)}`,
          );
          focusScene.style.setProperty(
            "--focus-glow",
            `${(0.25 + 0.55 * focusProgress).toFixed(3)}`,
          );
        }
        const maxShift = window.matchMedia("(max-width: 760px)").matches
          ? 34
          : 64;
        for (const target of targets) {
          const top = target.top - window.scrollY;
          const progress = Math.max(
            0,
            Math.min(
              1,
              (window.innerHeight - top) / (window.innerHeight + target.height),
            ),
          );
          const shift = (progress - 0.5) * maxShift * target.depth;
          target.element.style.setProperty(
            "--scroll-shift",
            `${shift.toFixed(1)}px`,
          );
        }
      });
    };
    const refreshTargets = () => {
      for (const target of targets) {
        const currentShift =
          Number.parseFloat(
            target.element.style.getPropertyValue("--scroll-shift"),
          ) || 0;
        target.top =
          target.element.getBoundingClientRect().top +
          window.scrollY -
          currentShift;
        target.height = target.element.offsetHeight;
      }
      update();
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", refreshTargets, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", refreshTargets);
      targets.forEach((target) =>
        target.element.style.removeProperty("--scroll-shift"),
      );
      [
        "--focus-progress",
        "--focus-rotation",
        "--focus-counter-rotation",
        "--focus-tilt-x",
        "--focus-tilt-y",
        "--focus-scale",
        "--focus-aperture",
        "--focus-glow",
      ].forEach((property) => focusScene?.style.removeProperty(property));
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
        <div className="hero-copy" data-reveal data-parallax="1">
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
        <div className="section-intro" data-reveal data-parallax="-0.75">
          <p className="section-kicker">TRÊS FORMAS DE TIRAR IDEIAS DO PAPEL</p>
          <h2 className="section-title">
            Aprender. Criar. <span>Compartilhar.</span>
          </h2>
          <p className="section-lead">
            O fio que conecta tudo é o mesmo: curiosidade, prática e intenção —
            na música e além dela.
          </p>
        </div>
        <div className="service-flow">
          <svg
            className="signal-route"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="signal-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="52%" stopColor="#39ff88" />
                <stop offset="100%" stopColor="#b6a1ff" />
              </linearGradient>
            </defs>
            <path
              className="signal-route__track"
              pathLength="1000"
              d="M500 0 C340 72 340 125 500 167 C660 209 660 290 500 333 C340 376 340 457 500 500 C660 543 660 624 500 667 C340 710 340 791 500 833 C660 875 660 928 500 1000"
            />
            <path
              className="signal-route__progress"
              pathLength="1000"
              d="M500 0 C340 72 340 125 500 167 C660 209 660 290 500 333 C340 376 340 457 500 500 C660 543 660 624 500 667 C340 710 340 791 500 833 C660 875 660 928 500 1000"
            />
          </svg>
          <span className="signal-route__traveler" aria-hidden="true" />
          {services.map((service) => {
            const Icon = service.icon;
            const parallax = service.number === "02" ? "-0.8" : "0.8";
            const LinkIcon = (
              <ArrowRight className="service-link__arrow" size={16} />
            );
            return (
              <article
                key={service.number}
                className={`service-stop service-stop--${service.color}`}
                data-reveal
              >
                <span className="service-stop__node" aria-hidden="true">
                  <Icon size={25} strokeWidth={1.45} />
                </span>
                <div className="service-stop__copy" data-parallax={parallax}>
                  <p className={`service-eyebrow accent-${service.color}`}>
                    <span className="service-number">{service.number}</span>
                    <span>{service.eyebrow}</span>
                  </p>
                  <h3>{service.title}</h3>
                  <p className="service-description">{service.text}</p>
                  {service.external ? (
                    <a
                      className={`service-link accent-${service.color}`}
                      href={service.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {service.label} {LinkIcon}
                    </a>
                  ) : (
                    <Link
                      className={`service-link accent-${service.color}`}
                      to={service.href}
                    >
                      {service.label} {LinkIcon}
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="manifesto-section relative z-10" data-reveal>
        <div className="manifesto-inner mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="manifesto-copy" data-parallax="0.65">
            <p className="section-kicker">MÚSICA · TECNOLOGIA · IDEIAS</p>
            <h2>
              <span className="manifesto-word--curiosity">Curiosidade</span>{" "}
              para começar.
              <br />
              <span className="manifesto-word--intention">
                Intenção para chegar mais longe.
              </span>
            </h2>
            <p>
              Seja aprendendo uma música, encontrando sua voz na improvisação ou
              construindo sua presença na internet: o melhor caminho é aquele
              que faz sentido para você.
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
          <div className="focus-stage" data-focus-scene aria-hidden="true">
            <div className="focus-stage__aura" />
            <div className="focus-lens">
              <span className="focus-lens__orbit focus-lens__orbit--outer" />
              <span className="focus-lens__orbit focus-lens__orbit--polar" />
              <span className="focus-lens__orbit focus-lens__orbit--inner" />
              <span className="focus-lens__body" />
              <span className="focus-lens__iris" />
              <span className="focus-lens__core" />
              <span className="focus-lens__glint" />
            </div>
            <div className="focus-stage__caption">
              <span>IDEIA</span>
              <i className="focus-stage__signal" />
              <span>EM FOCO</span>
            </div>
          </div>
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
