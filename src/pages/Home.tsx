import { useEffect } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { waLink } from "../config";
import "../styles/capability-bento.css";
import { LiquidMetalButton } from "../components/ui/liquid-metal-button";
import SiteFrame from "../components/SiteFrame";
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
    const motionTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-title-motion]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      motionTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.22, rootMargin: "0px 0px -5% 0px" });
    motionTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return <SiteFrame>
    <section id="inicio" className="hero hero-prisma">
      <div className="hero-aurora-bg" aria-hidden="true">
        <span className="hero-aurora-orbit hero-aurora-orbit-a" />
        <span className="hero-aurora-orbit hero-aurora-orbit-b" />
        <span className="hero-aurora-glow" />
      </div>
      <div className="hero-inner">
        <p className="eyebrow"><span className="eyebrow-line" /> TECNOLOGIA COM INTENÇÃO</p>
        <h1 className="hero-title title-motion-kinetic" data-title-motion aria-label="Seu negócio tem desafios. Eu construo caminhos.">
          <span className="hero-line hero-line-light" aria-hidden="true">{["Seu", "negócio", "tem", "desafios."].map((word, index) => <span className="hero-word" key={word} style={{ animationDelay: `${index * 90}ms` }}>{word}</span>)}</span>
          <span className="hero-line hero-line-orange" aria-hidden="true">{["Eu", "construo", "caminhos."].map((word, index) => <span className="hero-word" key={word} style={{ animationDelay: `${360 + index * 100}ms` }}>{word}</span>)}</span>
        </h1>
        <p className="hero-lead hero-lead-motion" data-title-motion aria-label="Entendo como sua empresa funciona, encontro o que pode melhorar e desenvolvo tecnologia para resolver — do primeiro diagnóstico à implementação.">
          <LeadWords text="Entendo como sua empresa funciona, encontro o que pode melhorar e desenvolvo tecnologia para resolver — do primeiro diagnóstico à implementação." />
        </p>
        <div className="hero-actions">
          <LiquidMetalButton label="Vamos conversar" onClick={() => window.open(contact, "_blank", "noopener,noreferrer")} />
          <a className="button button-quiet" href="#abordagem">Conheça meu jeito <ArrowDown size={16} /></a>
        </div>
        <div className="hero-signature"><span>ESTRATÉGIA</span><i /> <span>TECNOLOGIA</span><i /> <span>RESULTADO</span></div>
      </div>
      <div className="hero-frame" aria-hidden="true">
        <span className="hero-frame-label">01 — IDEIAS EM MOVIMENTO</span>
        <span className="hero-frame-index">VR<span>.</span></span>
      </div>
    </section>

    <section className="intro-section section-wrap" id="abordagem">
      <div className="intro-ambient-bg" aria-hidden="true">
        <span className="intro-topography-lines" />
        <span className="intro-topography-glow" />
      </div>
      <span className="floating-word intro-float" aria-hidden="true">ENTENDER</span>
      <div className="section-index reveal-left">A ABORDAGEM</div>
      <div className="intro-copy">
        <p className="kicker reveal-right">NÃO COMEÇO PELO CÓDIGO.</p>
        <h2 className="title-motion-center" data-title-motion aria-label="Começo entendendo o que está travando o seu negócio.">
          <span className="center-line" aria-hidden="true">Começo entendendo</span>
          <span className="center-line" aria-hidden="true">o que está <em>travando</em></span>
          <span className="center-line" aria-hidden="true">o seu negócio.</span>
        </h2>
        <p className="body-copy approach-copy-reveal approach-copy-reveal-one" data-title-motion aria-label="Às vezes o problema é um processo manual. Às vezes, informação espalhada em cinco lugares. Em outras, falta uma ferramenta que simplesmente não existe.">Às vezes o problema é um processo manual. Às vezes, informação espalhada em cinco lugares. Em outras, falta uma ferramenta que simplesmente não existe.</p>
        <p className="body-copy approach-copy-reveal approach-copy-reveal-two" data-title-motion aria-label="Antes de sugerir qualquer tecnologia, quero entender a operação, ouvir quem faz o trabalho e descobrir onde uma mudança pode fazer diferença de verdade.">Antes de sugerir qualquer tecnologia, quero entender a operação, ouvir quem faz o trabalho e descobrir onde uma mudança pode fazer diferença de verdade.</p>
      </div>
      <div className="approach-stamp reveal-up"><span>PRIMEIRO<br/>ENTENDER</span></div>
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
