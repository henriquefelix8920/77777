import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Zap } from "lucide-react";
import "../styles/high-tech-hero.css";
import { HeroShaderBackground } from "./VisualBackgrounds";
import { portfolioProjects, screenshotUrl } from "./PortfolioShowcase";

type HighTechHeroProps = {
  contact: string;
};

function PortfolioOrbit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = portfolioProjects[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % portfolioProjects.length);
    }, 4300);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="hero-site-globe" aria-label="Prévia animada dos projetos do portfólio">
      <span className="hero-site-orbit-ring hero-site-orbit-ring-a" aria-hidden="true" />
      <span className="hero-site-orbit-ring hero-site-orbit-ring-b" aria-hidden="true" />
      <span className="hero-site-orbit-core" aria-hidden="true"><i /></span>
      <article className="hero-site-page" key={project.number}>
        <div className="hero-site-browser">
          <span className="hero-site-browser-dots"><i /><i /><i /></span>
          <span>{project.domain}</span>
          <b>LIVE SITE</b>
        </div>
        <div className="hero-site-viewport">
          <img
            src={screenshotUrl(project.url)}
            alt={`Miniatura do site ${project.name}`}
            loading="eager"
            decoding="async"
            onError={(event) => { event.currentTarget.style.opacity = "0"; }}
          />
          <div className="hero-site-fallback">
            <span>EXPERIÊNCIA DIGITAL</span>
            <strong>{project.name}</strong>
            <i>ESTRATÉGIA · DESIGN · TECNOLOGIA</i>
          </div>
        </div>
        <div className="hero-site-caption"><span>{project.number} / 05</span><strong>{project.name}</strong><i>PORTFÓLIO</i></div>
      </article>
      <span className="hero-site-globe-coordinate" aria-hidden="true">V/R — PROJECT ORBIT</span>
    </div>
  );
}

export default function HighTechHero({ contact }: HighTechHeroProps) {
  return (
    <section id="inicio" className="hightech-hero">
      <div className="hightech-world" aria-hidden="true">
        <HeroShaderBackground />
      </div>

      <div className="hightech-hero-inner">
        <div className="hightech-copy">
          <div className="hightech-eyebrow"><span className="hightech-eyebrow-mark"><Zap size={12} /></span> TECNOLOGIA COM INTENÇÃO <i /> SYSTEMS / AUTOMATION / AI</div>
          <div className="hightech-status"><span /> INDEPENDENT DIGITAL STUDIO <b>EST. 2026</b></div>
          <h1 className="hightech-title" data-title-motion aria-label="Seu negócio tem desafios. Eu construo caminhos.">
            <span className="hightech-title-line"><span>Seu negócio</span></span>
            <span className="hightech-title-line"><span>tem desafios<span className="hightech-title-mark">.</span></span></span>
            <span className="hightech-title-line hightech-title-accent"><span>Eu construo</span></span>
            <span className="hightech-title-line hightech-title-accent"><span>caminhos<span className="hightech-title-mark">.</span></span></span>
          </h1>
          <p className="hightech-lead" data-title-motion>
            Entendo como sua empresa funciona, encontro o que pode melhorar e desenvolvo tecnologia para resolver — do primeiro diagnóstico à implementação.
          </p>
          <div className="hightech-actions">
            <a className="hightech-primary-cta" href={contact} target="_blank" rel="noreferrer">
              <span>Vamos conversar</span><ArrowUpRight size={17} />
            </a>
            <a className="hightech-secondary-cta" href="#abordagem">
              <span>Explorar abordagem</span><ArrowDown size={15} />
            </a>
          </div>
          <div className="hightech-signature">
            <span>ESTRATÉGIA</span><i /><span>TECNOLOGIA</span><i /><span>RESULTADO</span>
          </div>
        </div>

        <div className="hightech-visual">
          <div className="hightech-visual-label"><span>FIG. 01</span><span>PORTFOLIO / LIVE ORBIT</span></div>
          <PortfolioOrbit />
          <div className="hightech-float-tag hightech-float-tag-a"><span className="float-tag-icon"><Zap size={13} /></span><span><b>PROCESS ENGINE</b><small>FLOW OPTIMIZED</small></span><i /></div>
          <div className="hightech-float-tag hightech-float-tag-b"><span className="float-tag-icon float-tag-icon-blue">⌘</span><span><b>CONNECTED SYSTEMS</b><small>ONE CLEAR DIRECTION</small></span></div>
          <div className="hightech-visual-index">VR<span>_</span>001</div>
        </div>
      </div>

      <div className="hightech-bottom-meta"><span>DESIGNED TO SOLVE / BUILT TO EVOLVE</span><span>SCROLL TO EXPLORE <i>↓</i></span></div>
    </section>
  );
}
