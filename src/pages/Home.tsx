import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { SITE, waLink } from "../config";
import SiteFrame from "../components/SiteFrame";

const services = [
  {
    eyebrow: "APRENDER · 1:1 · ONLINE",
    title: "Guitarra com direção. Música com intenção.",
    text: "Aulas individuais de guitarra e violão, construídas ao redor do que você quer tocar. Técnica, ritmo, harmonia e repertório entram no plano para fazer sentido na sua música — não numa fórmula pronta.",
    color: "cyan",
    label: "Conhecer as aulas",
    href: "/aulas-ao-vivo",
  },
  {
    eyebrow: "ESTUDAR · IMPROVISAÇÃO · COMUNIDADE",
    title: "Menos decorar. Mais ouvir, escolher e criar.",
    text: "A Arte Suave da Improvisação aproxima conceitos musicais do instrumento. Um espaço para explorar ideias, experimentar frases e transformar escalas em linguagem própria — no seu tempo e junto com outros guitarristas.",
    color: "magenta",
    label: "Explorar o curso",
    href: "/curso-improviso-na-pentatonica",
  },
  {
    eyebrow: "CRIAR · PRESENÇA DIGITAL · WEB",
    title: "Uma ideia boa merece um site à altura.",
    text: "Crio sites autorais para artistas, profissionais e projetos com algo a dizer: identidade visual, mensagem clara e uma experiência que funciona de verdade no celular. Tecnologia a serviço da sua ideia — sem cara de template genérico.",
    color: "violet",
    label: "Conversar sobre meu site",
    href: waLink(
      "Olá, Valkyrja! Quero conversar sobre a criação de um site para meu projeto.",
    ),
    external: true,
  },
];

export default function HomePage() {
  return (
    <SiteFrame>
      <section
        id="inicio"
        className="hero-section relative z-10 mx-auto flex min-h-[82svh] w-full max-w-6xl flex-col justify-center px-5 pb-20 pt-12 sm:min-h-[86svh] sm:px-8 sm:pt-16"
      >
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">
            <span className="live-dot" aria-hidden="true" /> Valkyrja Reis{" "}
            <span className="eyebrow-separator">/</span> {SITE.tagline}
          </p>
          <h1
            className="hero-title neon-title"
            data-parallax="0.95"
            data-kinetic="title"
          >
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
            <a
              href="#universos"
              className="primary-cta"
              data-parallax="0.72"
              data-kinetic="cta"
            >
              Encontre seu próximo passo <ArrowDown size={17} />
            </a>
            <a
              href={waLink(
                "Olá, Valkyrja! Quero conversar sobre aulas de guitarra, o curso ou um site para meu projeto.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cta"
              data-parallax="-0.62"
              data-kinetic="cta"
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
          <h2
            className="section-title"
            data-parallax="0.95"
            data-kinetic="title"
          >
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
          {services.map((service, index) => {
            const headingParallax = index === 1 ? "-0.95" : "0.95";
            const actionParallax = index === 1 ? "0.7" : "-0.7";
            return (
              <article key={service.title} className="service-stop" data-reveal>
                <div className="service-stop__copy">
                  <p className={`service-eyebrow accent-${service.color}`}>
                    <span>{service.eyebrow}</span>
                  </p>
                  <h3 data-parallax={headingParallax} data-kinetic="title">
                    {service.title}
                  </h3>
                  <p className="service-description">{service.text}</p>
                  {service.external ? (
                    <a
                      className={`service-link accent-${service.color}`}
                      data-parallax={actionParallax}
                      data-kinetic="cta"
                      href={service.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {service.label}
                    </a>
                  ) : (
                    <Link
                      className={`service-link accent-${service.color}`}
                      data-parallax={actionParallax}
                      data-kinetic="cta"
                      to={service.href}
                    >
                      {service.label}
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
          <div className="manifesto-copy">
            <p className="section-kicker">MÚSICA · TECNOLOGIA · IDEIAS</p>
            <h2 data-parallax="0.95" data-kinetic="title">
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
              data-parallax="-0.72"
              data-kinetic="cta"
            >
              Me conta o que você quer criar <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
