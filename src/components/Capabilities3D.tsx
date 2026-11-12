import { useEffect, useRef } from "react";
import { ArrowUpRight, Workflow, BrainCircuit, PanelsTopLeft, Blocks } from "lucide-react";
import "../styles/capabilities-3d.css";

const services = [
  { number: "01", code: "SYSTEMS / CORE", title: "Sistemas & plataformas", text: "Ferramentas feitas para a rotina do seu negócio — não mais uma planilha improvisada.", detail: "ESTRUTURA PARA CRESCER", icon: Blocks, visual: "systems" },
  { number: "02", code: "AUTOMATION / FLOW", title: "Automação & integrações", text: "Menos tarefas repetidas. Mais tempo para o trabalho que realmente precisa de gente.", detail: "FLUXOS QUE SE CONECTAM", icon: Workflow, visual: "flow" },
  { number: "03", code: "INTELLIGENCE / AI", title: "Inteligência artificial", text: "IA aplicada a situações concretas: atendimento, análise, conteúdo e operações.", detail: "INTELIGÊNCIA APLICADA", icon: BrainCircuit, visual: "ai" },
  { number: "04", code: "DIGITAL / EXPERIENCE", title: "Sites & experiências digitais", text: "Presença digital com personalidade, clareza e uma função que vai além de parecer bonita.", detail: "PRESENÇA COM PROPÓSITO", icon: PanelsTopLeft, visual: "web" },
];

function ServiceGeometry({ visual }: { visual: string }) {
  return <div className={`cap3d-geometry cap3d-geometry-${visual}`} aria-hidden="true">
    <div className="cap3d-orbit cap3d-orbit-one" />
    <div className="cap3d-orbit cap3d-orbit-two" />
    <div className="cap3d-orbit cap3d-orbit-three" />
    <div className="cap3d-object">
      <span className="cap3d-object-face cap3d-face-front" />
      <span className="cap3d-object-face cap3d-face-back" />
      <span className="cap3d-object-face cap3d-face-left" />
      <span className="cap3d-object-face cap3d-face-right" />
      <span className="cap3d-object-face cap3d-face-top" />
      <span className="cap3d-object-face cap3d-face-bottom" />
      <span className="cap3d-object-core">{visual === "ai" ? "AI" : visual === "flow" ? "↗" : visual === "web" ? "VR" : "SYS"}</span>
    </div>
    <span className="cap3d-particle cap3d-particle-a" />
    <span className="cap3d-particle cap3d-particle-b" />
    <span className="cap3d-particle cap3d-particle-c" />
    <span className="cap3d-coordinate">X / Y / Z</span>
  </div>;
}

export default function Capabilities3D() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const cards = Array.from(node.querySelectorAll<HTMLElement>(".cap3d-panel"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("cap3d-in-view");
      });
    }, { threshold: 0.22 });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return <section className="work-section cap3d-section" id="trabalho" ref={root}>
    <div className="cap3d-backdrop" aria-hidden="true">
      <span className="cap3d-backdrop-grid" />
      <span className="cap3d-backdrop-glow cap3d-backdrop-glow-a" />
      <span className="cap3d-backdrop-glow cap3d-backdrop-glow-b" />
      <span className="cap3d-backdrop-ring" />
    </div>
    <div className="cap3d-shell">
      <header className="cap3d-intro">
        <div className="section-index">O QUE POSSO FAZER / 01—04</div>
        <div className="cap3d-intro-grid">
          <div>
            <p className="kicker">A FERRAMENTA VEM DEPOIS DO PROBLEMA.</p>
            <h2>O que sua empresa <em>pode se tornar.</em></h2>
          </div>
          <p className="cap3d-intro-note">Quatro frentes. Um mesmo objetivo: transformar complexidade em soluções que fazem o negócio avançar.</p>
        </div>
        <div className="cap3d-scroll-cue"><span /> ROLE PARA EXPLORAR <b>↓</b></div>
      </header>
      <div className="cap3d-panels">
        {services.map((service, index) => {
          const Icon = service.icon;
          return <article className={`cap3d-panel cap3d-panel-${index + 1}`} key={service.number}>
            <div className="cap3d-panel-top"><span>{service.number} / 04</span><span>{service.code}</span></div>
            <ServiceGeometry visual={service.visual} />
            <div className="cap3d-panel-copy">
              <span className="cap3d-panel-detail">{service.detail}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="cap3d-panel-icon"><Icon size={19} strokeWidth={1.5}/></span>
            </div>
            <span className="cap3d-panel-watermark">{service.number}</span>
            <span className="cap3d-panel-edge" />
            <ArrowUpRight className="cap3d-panel-arrow" size={24} aria-hidden="true" />
          </article>;
        })}
      </div>
      <footer className="cap3d-footer"><span>V/R — DIGITAL ENGINEERING</span><span>IDEIAS QUE GANHAM FORMA.</span></footer>
    </div>
  </section>;
}
