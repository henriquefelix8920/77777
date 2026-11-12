import { ArrowUpRight, LockKeyhole } from "lucide-react";
import "../styles/portfolio-showcase.css";

type PortfolioProject = {
  number: string;
  name: string;
  category: string;
  description: string;
  url: string;
  middleUrl: string;
  domain: string;
};

const projects: PortfolioProject[] = [
  {
    number: "01",
    name: "Helena Vasconcelos",
    category: "Landing page · Nutrição",
    description: "Uma experiência editorial para apresentar uma abordagem de nutrição com clareza, sensibilidade e narrativa visual.",
    url: "https://helena-vasconcelos-demo.vercel.app/",
    middleUrl: "https://helena-vasconcelos-demo.vercel.app/#metodo",
    domain: "helena-vasconcelos-demo.vercel.app",
  },
  {
    number: "02",
    name: "A Comunidade dos Ritmos",
    category: "Educação · Música",
    description: "Uma página de apresentação para uma comunidade de guitarristas, com identidade própria e foco na experiência de aprendizagem.",
    url: "https://cayque1.vercel.app/",
    middleUrl: "https://cayque1.vercel.app/#ritmos",
    domain: "cayque1.vercel.app",
  },
  {
    number: "03",
    name: "Investimento Inicial",
    category: "Página de vendas · Educação",
    description: "Uma apresentação digital pensada para tornar educação financeira mais acessível a professores que estão começando.",
    url: "https://pamella1.vercel.app/",
    middleUrl: "https://pamella1.vercel.app/#conteudo",
    domain: "pamella1.vercel.app",
  },
  {
    number: "04",
    name: "Toque de Vênus",
    category: "Site institucional · Bem-estar",
    description: "Uma direção visual sofisticada, com atmosfera cinematográfica e uma jornada digital organizada por experiências.",
    url: "https://rafally.vercel.app/",
    middleUrl: "https://rafally.vercel.app/#experiencia",
    domain: "rafally.vercel.app",
  },
  {
    number: "05",
    name: "Amanda Lenns",
    category: "Site de apresentação · Marca pessoal",
    description: "Uma presença digital de linguagem visual marcante, com apresentação, galeria e pontos de contato em uma única experiência.",
    url: "https://portifolio-silk-five-68.vercel.app/",
    middleUrl: "https://portifolio-silk-five-68.vercel.app/#galeria",
    domain: "portifolio-silk-five-68.vercel.app",
  },
];

function screenshotUrl(target: string) {
  return `https://image.thum.io/get/width/900/crop/1000/noanimate/?url=${encodeURIComponent(target)}`;
}

function SitePreview({ project }: { project: PortfolioProject }) {
  return (
    <div className="portfolio-preview">
      <div className="portfolio-browser-bar" aria-hidden="true">
        <span className="browser-dots"><i /><i /><i /></span>
        <span className="browser-address">{project.domain}</span>
        <span className="browser-live">PREVIEW</span>
      </div>
      <div className="portfolio-preview-window">
        <div className="portfolio-preview-track">
          <img
            src={screenshotUrl(project.url)}
            alt={`Captura da página inicial de ${project.name}`}
            loading="lazy"
            decoding="async"
            onError={(event) => { event.currentTarget.style.visibility = "hidden"; }}
          />
          <img
            src={screenshotUrl(project.middleUrl)}
            alt={`Captura de outra seção do site ${project.name}`}
            loading="lazy"
            decoding="async"
            onError={(event) => { event.currentTarget.style.visibility = "hidden"; }}
          />
        </div>
        <div className="portfolio-preview-vignette" aria-hidden="true" />
        <div className="portfolio-preview-scroll" aria-hidden="true">
          <span />
        </div>
        <span className="portfolio-preview-caption">ROLAGEM DO PROJETO <i>↓</i></span>
      </div>
    </div>
  );
}

function EscarlateFeature() {
  return (
    <article className="portfolio-private">
      <div className="portfolio-private-visual" aria-hidden="true">
        <div className="private-window">
          <div className="private-window-top"><span /><span /><span /><b>ESCARLATE / WORKSPACE</b></div>
          <div className="private-dashboard">
            <div className="private-sidebar"><i /><i /><i /><i /><i /></div>
            <div className="private-content">
              <div className="private-content-head"><span /><b /></div>
              <div className="private-metrics"><i /><i /><i /></div>
              <div className="private-table">
                <span /><span /><span /><span />
              </div>
            </div>
          </div>
        </div>
        <span className="private-orbit private-orbit-one" />
        <span className="private-orbit private-orbit-two" />
      </div>
      <div className="portfolio-private-copy">
        <p className="portfolio-project-category"><LockKeyhole size={13} /> SISTEMA · ACESSO CONTROLADO</p>
        <h3>Escarlate</h3>
        <p>Uma aplicação de CRM e prospecção para organizar operações e acompanhar fluxos de trabalho. A interface de produção permanece restrita; por isso, este projeto aparece como estudo de sistema, não como página pública.</p>
        <a href="https://github.com/henriquefelix8920/escarlate" target="_blank" rel="noopener noreferrer" className="portfolio-private-link">
          Ver estrutura no GitHub <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  );
}

export default function PortfolioShowcase() {
  return (
    <section className="portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
      <div className="portfolio-wrap">
        <div className="portfolio-topline">
          <span className="portfolio-index">05 / PROJETOS EM CENA</span>
          <span className="portfolio-topline-rule" />
          <span className="portfolio-topline-note">IDEIAS QUE GANHARAM TELA</span>
        </div>
        <div className="portfolio-heading">
          <div>
            <p className="portfolio-kicker">UM POUCO DO QUE JÁ CONSTRUÍ</p>
            <h2 id="portfolio-title">Projetos que<br /><em>saíram do papel.</em></h2>
          </div>
          <p className="portfolio-intro">Cada projeto pede uma linguagem, uma estrutura e uma solução diferente. Explore algumas experiências digitais que desenvolvi.</p>
        </div>

        <div className="portfolio-grid">
          {projects.map((project) => (
            <article className="portfolio-project" key={project.number}>
              <SitePreview project={project} />
              <div className="portfolio-project-info">
                <div className="portfolio-project-meta">
                  <span>{project.number} / 05</span>
                  <span>{project.category}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="portfolio-project-link">
                  Visitar projeto <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="portfolio-private-label">
          <span>OUTRA CAMADA DO TRABALHO</span>
          <span className="portfolio-private-label-line" />
          <span>PRODUTO E OPERAÇÃO</span>
        </div>
        <EscarlateFeature />
        <div className="portfolio-footnote">
          <span>CAPTURAS REAIS DOS SITES PUBLICADOS</span>
          <span>PRÉVIAS VISUAIS · ACESSO AO PROJETO PELO LINK</span>
        </div>
      </div>
    </section>
  );
}
