import { useEffect } from "react";
import { waLink } from "../config";
import "../styles/capability-bento.css";
import "../styles/approach-scroll-story.css";
import "../styles/text-motion-system.css";
import { LiquidMetalButton } from "../components/ui/liquid-metal-button";
import SiteFrame from "../components/SiteFrame";
import HighTechHero from "../components/HighTechHero";
import ApproachVideoBackdrop from "../components/ApproachVideoBackdrop";
import PortfolioShowcase from "../components/PortfolioShowcase";
import Capabilities3D from "../components/Capabilities3D";
import ProcessJourney3D from "../components/ProcessJourney3D";

const capabilities = [
  { number: "01", title: "Sistemas e plataformas", text: "Ferramentas feitas para a rotina do seu negócio — não mais uma planilha improvisada.", tag: "ESTRUTURA PARA CRESCER", visual: "systems" },
  { number: "02", title: "Automação e integrações", text: "Menos tarefas repetidas. Mais tempo para o trabalho que realmente precisa de gente.", tag: "FLUXOS QUE SE CONECTAM", visual: "automation" },
  { number: "03", title: "Inteligência artificial", text: "IA aplicada a situações concretas: atendimento, análise, conteúdo e operações.", tag: "INTELIGÊNCIA APLICADA", visual: "ai" },
  { number: "04", title: "Sites e experiências digitais", text: "Presença digital com personalidade, clareza e uma função que vai além de parecer bonita.", tag: "PRESENÇA COM PROPÓSITO", visual: "web" },
];

/* Motion treatments for the section headlines. */
function MotionWords({ text, delay = 0 }: { text: string; delay?: number }) {
  return <span className="motion-word-line" aria-hidden="true">
    {text.split(" ").map((word, index) => (
      <span className="motion-word" key={`${word}-${index}`} style={{ animationDelay: `${delay + index * 85}ms` }}>{word}{index < text.split(" ").length - 1 ? "\u00a0" : ""}</span>
    ))}
  </span>;
}

function BloomLine({ text }: { text: string }) {
  return <span className="bloom-line" aria-hidden="true">
    {Array.from(text).map((character, index) => character === " "
      ? <span className="bloom-space" key={`space-${index}`}> </span>
      : <span className="bloom-char" key={`char-${index}`} style={{ animationDelay: `${index * 28}ms` }}>{character}</span>)}
  </span>;
}

function LeadWords({ text }: { text: string }) {
  const words = text.split(/\s+/);
  return <span className="hero-lead-words" aria-hidden="true">
    {words.map((word, index) => <span className="hero-lead-word" key={`${word}-${index}`} style={{ animationDelay: `${index * 20}ms` }}>{word}</span>)}
  </span>;
}

export default function HomePage() {
  const contact = waLink("Olá! Conheci seu trabalho pelo site e quero conversar sobre um problema ou projeto da minha empresa.");

  useEffect(() => {
    const customHeadlines = Array.from(document.querySelectorAll<HTMLElement>("[data-title-motion]"));
    const textSelector = [
      ".site-shell h1, .site-shell h2, .site-shell h3, .site-shell p, .site-shell a, .site-shell button",
      ".site-shell .eyebrow, .site-shell .section-index, .site-shell .kicker",
      ".site-shell .hero-signature > span, .site-shell .approach-stamp span",
      ".site-shell .tile-meta > span, .site-shell .process-card-top > span",
      ".site-shell .portfolio-topline > span, .site-shell .portfolio-project-meta > span",
      ".site-shell .portfolio-private-label > span, .site-shell .portfolio-footnote > span",
      ".site-shell .portfolio-project-category, .site-shell .portfolio-preview-caption",
      ".site-shell .portfolio-browser-bar > span:not(.browser-dots)",
      ".site-shell .portfolio-preview-fallback > span, .site-shell .portfolio-preview-fallback > strong, .site-shell .portfolio-preview-fallback > i",
      ".whatsapp-float-tooltip",
    ].join(",");
    const textTargets = Array.from(document.querySelectorAll<HTMLElement>(textSelector)).filter((target) =>
      Boolean(target.textContent?.trim()) &&
      !target.closest('[aria-hidden="true"]') &&
      !target.matches("[data-title-motion]") &&
      !target.closest("[data-title-motion]")
    );

    textTargets.forEach((target, index) => {
      target.classList.add("text-motion-target", `text-motion-v${index % 20}`);
      target.style.setProperty("--text-motion-delay", `${(index % 4) * 45}ms`);
    });

    const allTargets = [...customHeadlines, ...textTargets];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      customHeadlines.forEach((target) => target.classList.add("is-visible"));
      textTargets.forEach((target) => target.classList.add("text-motion-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        target.classList.add(target.classList.contains("text-motion-target") ? "text-motion-visible" : "is-visible");
        observer.unobserve(target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -5% 0px" });

    allTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return <SiteFrame>
    <HighTechHero contact={contact} />

    <section className="intro-section intro-story-section" id="abordagem">
      <div className="approach-video-fullbleed" aria-hidden="true">
        <ApproachVideoBackdrop />
        <span className="approach-video-fullbleed-shade" />
      </div>
      <div className="section-wrap intro-story-wrap">
        <div className="section-index">A ABORDAGEM / 01—03</div>
        <div className="intro-story-copy">
          <div className="intro-story-heading">
            <p className="kicker">NÃO COMEÇO PELO CÓDIGO.</p>
            <h2 className="title-motion-center" data-title-motion aria-label="Começo entendendo o que está travando o seu negócio.">
              <span className="center-line">Começo entendendo</span>
              <span className="center-line">o que está <em>travando</em></span>
              <span className="center-line">o seu negócio.</span>
            </h2>
            <p className="approach-centered-lead">Toda solução começa quando a gente enxerga o problema de verdade.</p>
          </div>
          <div className="story-chapters-centered">
            <article className="story-chapter">
              <span className="story-chapter-index">01 / O SINAL</span>
              <h3>O que está travando?</h3>
              <p>Às vezes o problema é um processo manual. Às vezes, informação espalhada em cinco lugares. Em outras, falta uma ferramenta que simplesmente não existe.</p>
            </article>
            <article className="story-chapter">
              <span className="story-chapter-index">02 / A INVESTIGAÇÃO</span>
              <h3>Onde está o atrito?</h3>
              <p>Eu escuto quem faz o trabalho, observo a operação e procuro entender onde o tempo se perde, onde as tarefas se repetem e o que impede o negócio de avançar.</p>
            </article>
            <article className="story-chapter">
              <span className="story-chapter-index">03 / A DIREÇÃO</span>
              <h3>O que faz sentido mudar?</h3>
              <p>Só então escolhemos a tecnologia. A solução precisa caber na realidade da empresa, resolver o problema certo e tornar a rotina mais simples.</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <Capabilities3D />

    <ProcessJourney3D />

    <PortfolioShowcase />

    <section className="closing-section closing-kinetic" id="vamos-construir">
      <div className="closing-kinetic-universe" aria-hidden="true">
        <div className="closing-kinetic-grid" />
        <div className="closing-kinetic-orbit orbit-one"><i /><i /><i /></div>
        <div className="closing-kinetic-orbit orbit-two"><i /><i /></div>
        <div className="closing-kinetic-core"><span>IDEIA</span><b>+</b><span>IMPACTO</span></div>
        <div className="closing-kinetic-rays" />
        <span className="closing-kinetic-coordinate coordinate-a">19° 45' 12.0"S</span>
        <span className="closing-kinetic-coordinate coordinate-b">PROCESSO // 001—∞</span>
      </div>
      <div className="closing-kinetic-content">
        <p className="kicker">TODA MUDANÇA COMEÇA COM UMA PERGUNTA</p>
        <h2 className="closing-kinetic-title" data-title-motion aria-label="Vamos descobrir e construir.">
          <span className="kinetic-3d-word" data-depth="Vamos">Vamos</span>
          <span className="kinetic-3d-word kinetic-outline-word" data-depth="descobrir">descobrir</span>
          <span className="kinetic-3d-word kinetic-last-line" data-depth="e construir."><em>e</em> construir<span className="kinetic-period">.</span></span>
        </h2>
        <p className="closing-kinetic-lead" data-depth="Você traz o desafio. A gente transforma em movimento.">Você traz o desafio. A gente transforma em movimento.</p>
        <div className="closing-kinetic-steps" aria-label="Da ideia ao resultado">
          <span><b>01</b> IDEIA</span><i />
          <span><b>02</b> DIREÇÃO</span><i />
          <span><b>03</b> CONSTRUÇÃO</span><i />
          <span><b>04</b> IMPACTO</span>
        </div>
        <LiquidMetalButton label="Me conte sobre seu negócio" onClick={() => window.open(contact, "_blank", "noopener,noreferrer")} />
      </div>
      <div className="closing-kinetic-marquee" aria-hidden="true">
        <div className="closing-kinetic-marquee-track">
          {Array.from({length:4},(_,i)=><span key={i}>IDEIAS EM MOVIMENTO <b>✳</b> TECNOLOGIA COM PROPÓSITO <b>✳</b> VAMOS CONSTRUIR <b>✳</b>&nbsp;</span>)}
        </div>
      </div>
      <div className="closing-mark">VR<span>®</span></div>
    </section>
  </SiteFrame>;
}
