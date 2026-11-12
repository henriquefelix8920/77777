import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { waLink } from "../config";
import "../styles/capability-bento.css";
import { LiquidMetalButton } from "../components/ui/liquid-metal-button";
import SiteFrame from "../components/SiteFrame";

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

function Film({ src, className = "", priority = false }: { src: number; className?: string; priority?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const activate = () => {
      if (!video.src) {
        video.src = video.dataset.src || "";
        video.load();
      }
      const play = video.play();
      if (play) play.catch(() => {});
    };
    if (priority) {
      activate();
      return;
    }
    if (!("IntersectionObserver" in window)) {
      activate();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) activate();
      else video.pause();
    }, { rootMargin: "240px 0px" });
    observer.observe(video);
    return () => observer.disconnect();
  }, [priority]);
  return <div className={`film-object ${className}`} aria-hidden="true">
    <video
      ref={videoRef}
      {...(priority ? { src: `/club-videos/video${src}.mp4` } : { "data-src": `/club-videos/video${src}.mp4` })}
      autoPlay muted loop playsInline preload={priority ? "auto" : "none"} tabIndex={-1}
    />
    <span className="film-tint" />
  </div>;
}

export default function HomePage() {
  const contact = waLink("Olá! Conheci seu trabalho pelo site e quero conversar sobre um problema ou projeto da minha empresa.");
  return <SiteFrame>
    <section id="inicio" className="hero hero-prisma">
      <div className="hero-scroll-video" aria-hidden="true"><video src="/club-videos/video1.mp4" autoPlay muted loop playsInline preload="auto" /></div>
      <div className="hero-inner">
        <p className="eyebrow"><span className="eyebrow-line" /> TECNOLOGIA COM INTENÇÃO</p>
        <h1 className="hero-title"><span className="sumi-title">Seu negócio tem desafios.</span><span className="curtain-title">Eu construo caminhos.</span></h1>
        <p className="hero-lead">Entendo como sua empresa funciona, encontro o que pode melhorar e desenvolvo tecnologia para resolver — do primeiro diagnóstico à implementação.</p>
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
      <Film src={3} className="intro-film" />
      <span className="floating-word intro-float" aria-hidden="true">ENTENDER</span>
      <div className="section-index reveal-left">A ABORDAGEM</div>
      <div className="intro-copy">
        <p className="kicker reveal-right">NÃO COMEÇO PELO CÓDIGO.</p>
        <h2 className="reveal-left">Começo entendendo<br/>o que está <em>travando</em><br/>o seu negócio.</h2>
        <p className="body-copy reveal-right">Às vezes o problema é um processo manual. Às vezes, informação espalhada em cinco lugares. Em outras, falta uma ferramenta que simplesmente não existe.</p>
        <p className="body-copy reveal-left">Antes de sugerir qualquer tecnologia, quero entender a operação, ouvir quem faz o trabalho e descobrir onde uma mudança pode fazer diferença de verdade.</p>
      </div>
      <div className="approach-stamp reveal-up"><span>PRIMEIRO<br/>ENTENDER</span></div>
    </section>

    <section className="work-section" id="trabalho">
      <Film src={4} className="work-film" />
      <span className="floating-word work-float" aria-hidden="true">POSSIBILIDADES</span>
      <div className="section-wrap">
        <div className="section-index reveal-right">O QUE POSSO FAZER</div>
        <div className="section-heading">
          <p className="kicker reveal-left">A FERRAMENTA VEM DEPOIS DO PROBLEMA.</p>
          <h2 className="reveal-right">Uma solução certa<br/><em>para cada desafio.</em></h2>
        </div>
        <div className="capability-bento">
          {capabilities.map((item, i) => <article className={`capability-tile capability-tile-${i + 1} reveal-${i % 2 ? "right" : "left"}`} key={item.title}>
            <div className="tile-meta"><span>{item.number} / 04</span><span>{item.tag}</span></div>
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
      <Film src={5} className="process-film" />
      <div className="process-wrap">
        <div className="section-index reveal-right">DO PROBLEMA À SOLUÇÃO</div>
        <div className="process-heading">
          <p className="kicker reveal-left">TRABALHO DO COMEÇO AO USO.</p>
          <h2 className="reveal-right">Não entrego só<br/><em>um arquivo.</em></h2>
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

    <section className="closing-section">
      <Film src={6} className="closing-film" />
      <span className="closing-floating" aria-hidden="true">VAMOS<br/>CONSTRUIR?</span>
      <div className="closing-content">
        <p className="kicker reveal-left">TEM ALGUMA COISA QUE PODERIA FUNCIONAR MELHOR?</p>
        <h2 className="reveal-right">Vamos descobrir<br/><em>e construir.</em></h2>
        <p className="reveal-left">Você não precisa chegar com a solução pronta. Me conte o que acontece hoje, onde está o problema e o que gostaria de mudar.</p>
        <LiquidMetalButton label="Me conte sobre seu negócio" onClick={() => window.open(contact, "_blank", "noopener,noreferrer")} />
      </div>
      <div className="closing-mark">VR<span>®</span></div>
    </section>
  </SiteFrame>;
}
