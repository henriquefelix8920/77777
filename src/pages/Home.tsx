import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { waLink } from "../config";
import "../styles/capability-bento.css";
import "../styles/approach-scroll-story.css";
import "../styles/text-motion-system.css";
import { LiquidMetalButton } from "../components/ui/liquid-metal-button";
import SiteFrame from "../components/SiteFrame";
import HighTechHero from "../components/HighTechHero";
import { WireframeBackground } from "../components/VisualBackgrounds";
import ApproachVideoBackdrop from "../components/ApproachVideoBackdrop";
import PortfolioShowcase from "../components/PortfolioShowcase";

const processSteps = [
  { number: "01", title: "Entender", text: "Conversamos sobre a empresa, a rotina e o que precisa mudar.", note: "DIAGNÓSTICO" },
  { number: "02", title: "Desenhar", text: "Defino com você o caminho mais simples e útil para resolver o problema.", note: "DIREÇÃO" },
  { number: "03", title: "Construir", text: "Desenvolvo, testo e implemento a solução no contexto real do negócio.", note: "IMPLEMENTAÇÃO" },
  { number: "04", title: "Acompanhar", text: "Ajustamos o que for necessário depois que a solução começa a ser usada.", note: "EVOLUÇÃO" },
];

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
      <div className="intro-ambient-bg intro-story-ambient" aria-hidden="true">
        <WireframeBackground />
        <ApproachVideoBackdrop />
        <span className="intro-wallpaper-vignette" />
      </div>
      <div className="section-wrap intro-story-wrap">
        <div className="section-index reveal-left">A ABORDAGEM / 01—03</div>
        <div className="intro-story-layout">
          <div className="intro-story-copy">
            <div className="intro-story-heading">
              <p className="kicker reveal-right">NÃO COMEÇO PELO CÓDIGO.</p>
              <h2 className="title-motion-center" data-title-motion aria-label="Começo entendendo o que está travando o seu negócio.">
                <span className="center-line">Começo entendendo</span>
                <span className="center-line">o que está <em>travando</em></span>
                <span className="center-line">o seu negócio.</span>
              </h2>
            </div>
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

    <section className="work-section" id="trabalho">
      <div className="work-animated-grid-bg" aria-hidden="true">
        <span className="work-grid-glow work-grid-glow-a" />
        <span className="work-grid-glow work-grid-glow-b" />
        <span className="work-grid-scan" />
      </div>
      <span className="floating-word work-float" aria-hidden="true">POSSIBILIDADES</span>
      <div className="section-wrap">
        <div className="section-index reveal-right">O QUE POSSO FAZER</div>
        <div className="section-heading">
          <p className="kicker reveal-left">A FERRAMENTA VEM DEPOIS DO PROBLEMA.</p>
          <h2 className="title-motion-digital" data-title-motion aria-label="Uma solução certa para cada desafio.">
            <span className="digital-title-line" aria-hidden="true">Uma solução certa</span>
            <em className="digital-title-line" aria-hidden="true">para cada desafio.</em>
          </h2>
        </div>
        <div className="capability-bento">
          {capabilities.map((item, i) => <article className={`capability-tile capability-tile-${i + 1} reveal-up`} key={item.title}>
            <div className="tile-meta"><span>{item.tag}</span></div>
            <div className={`tile-visual tile-visual-${item.visual}`} aria-hidden="true">
              {item.visual === "systems" && <><span className="system-window"><i/><i/><i/><b/><b/><b/><b/></span><span className="system-orbit system-orbit-a"/><span className="system-orbit system-orbit-b"/></>}
              {item.visual === "automation" && <><span className="flow-node flow-node-a"/><span className="flow-line"/><span className="flow-node flow-node-b"/><span className="flow-line flow-line-two"/><span className="flow-node flow-node-c"/></>}
              {item.visual === "ai" && <><span className="ai-core">IA</span><span className="ai-ring ai-ring-a"/><span className="ai-ring ai-ring-b"/></>}
              {item.visual === "web" && <><span className="web-frame"><i/><i/><i/><b/></span><span className="web-cursor">↗</span></>}
            </div>
            <div className="tile-copy"><h3>{item.title}</h3><p>{item.text}</p></div>
            <span className="tile-arrow" aria-hidden="true"><ArrowUpRight size={19}/></span>
          </article>)}
        </div>
      </div>
    </section>

    <section className="process-section" id="processo">
      <div className="process-motion-grid-bg" aria-hidden="true">
        <span className="process-grid-glow" />
        <span className="process-grid-orbit" />
        <span className="process-grid-scan" />
        <span className="process-grid-pulse" />
      </div>
      <div className="process-wrap">
        <div className="section-index reveal-right">DO PROBLEMA À SOLUÇÃO</div>
        <div className="process-heading">
          <p className="kicker reveal-left">TRABALHO DO COMEÇO AO USO.</p>
          <h2 className="title-motion-words" data-title-motion aria-label="Não entrego só um arquivo.">
            <MotionWords text="Não entrego só" />
            <br />
            <em><MotionWords text="um arquivo." delay={290} /></em>
          </h2>
          <p className="process-intro">Um caminho claro, construído junto com você — e pensado para funcionar na rotina real da empresa.</p>
        </div>
        <div className="process-bento">
          {processSteps.map((step, i) => <article className="process-card" key={step.number}>
            <div className="process-card-top"><span>{step.number} / 04</span><span>{step.note}</span></div>
            <span className="process-card-mark" aria-hidden="true">0{i + 1}</span>
            <div className="process-card-copy"><h3>{step.title}</h3><p>{step.text}</p></div>
            <span className="process-card-line" aria-hidden="true" />
          </article>)}
        </div>
      </div>
    </section>

    <PortfolioShowcase />

    <section className="closing-section">
      <div className="closing-beams-bg" aria-hidden="true">
        <span className="closing-beam closing-beam-a" />
        <span className="closing-beam closing-beam-b" />
        <span className="closing-beam-orbit" />
      </div>
      <span className="closing-floating" aria-hidden="true">VAMOS<br/>CONSTRUIR?</span>
      <div className="closing-content">
        <p className="kicker reveal-left">TEM ALGUMA COISA QUE PODERIA FUNCIONAR MELHOR?</p>
        <h2 className="title-motion-bloom" data-title-motion aria-label="Vamos descobrir e construir.">
          <BloomLine text="Vamos descobrir" />
          <br />
          <em><BloomLine text="e construir." /></em>
        </h2>
        <p className="reveal-left">Você não precisa chegar com a solução pronta. Me conte o que acontece hoje, onde está o problema e o que gostaria de mudar.</p>
        <LiquidMetalButton label="Me conte sobre seu negócio" onClick={() => window.open(contact, "_blank", "noopener,noreferrer")} />
      </div>
      <div className="closing-mark">VR<span>®</span></div>
    </section>
  </SiteFrame>;
}
