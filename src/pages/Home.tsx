import { ArrowDown, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { waLink } from "../config";
import SiteFrame from "../components/SiteFrame";

const capabilities = [
  { number: "01", title: "Sistemas e plataformas", text: "Ferramentas feitas para a rotina do seu negócio — não mais uma planilha improvisada." },
  { number: "02", title: "Automação e integrações", text: "Menos tarefas repetidas. Mais tempo para o trabalho que realmente precisa de gente." },
  { number: "03", title: "Inteligência artificial", text: "IA aplicada a situações concretas: atendimento, análise, conteúdo e operações." },
  { number: "04", title: "Sites e experiências digitais", text: "Presença digital com personalidade, clareza e uma função que vai além de parecer bonita." },
];

const videos = [1, 2, 3, 4, 5, 6];

export default function HomePage() {
  const contact = waLink("Olá! Conheci seu trabalho pelo site e quero conversar sobre um problema ou projeto da minha empresa.");
  return (
    <SiteFrame>
      <section id="inicio" className="hero">
        <div className="hero-inner">
          <p className="eyebrow"><span className="eyebrow-line" /> TECNOLOGIA COM INTENÇÃO <span className="eyebrow-index">VR — 001</span></p>
          <h1>Seu negócio tem desafios.<br /><span>Eu construo caminhos.</span></h1>
          <p className="hero-lead">Entendo como sua empresa funciona, encontro o que pode melhorar e desenvolvo soluções com tecnologia — do primeiro diagnóstico à implementação.</p>
          <div className="hero-actions">
            <a className="button button-primary" href={contact} target="_blank" rel="noreferrer">Vamos conversar <ArrowUpRight size={17} /></a>
            <a className="button button-quiet" href="#trabalho">Ver o que eu faço <ArrowDown size={16} /></a>
          </div>
          <div className="hero-footnote"><span>01 / 04</span><span>IDEIA · ESTRATÉGIA · CONSTRUÇÃO</span></div>
        </div>
        <div className="hero-film" aria-label="Demonstrações de criação audiovisual com inteligência artificial">
          <div className="hero-film-main"><video src="/club-videos/video1.mp4" autoPlay muted loop playsInline preload="metadata" /><span className="film-tag"><Play size={12} /> AI GENERATED / 001</span></div>
          <div className="hero-film-small hero-film-a"><video src="/club-videos/video2.mp4" autoPlay muted loop playsInline preload="metadata" /><span>GENERATIVE VIDEO</span></div>
          <div className="hero-film-small hero-film-b"><video src="/club-videos/video3.mp4" autoPlay muted loop playsInline preload="metadata" /><span>CREATIVE TECHNOLOGY</span></div>
          <div className="hero-film-stamp">IDEIA<br/><b>→</b><br/>IMAGEM</div>
        </div>
        <div className="hero-side-label" aria-hidden="true">PENSAR / CONSTRUIR / EVOLUIR</div>
      </section>

      <section className="intro-section section-wrap" id="abordagem">
        <div className="section-index">[ 01 — A ABORDAGEM ]</div>
        <div className="intro-copy">
          <p className="kicker">NÃO COMEÇO PELO CÓDIGO.</p>
          <h2>Começo entendendo<br/>o que está <em>travando</em><br/>o seu negócio.</h2>
          <p className="body-copy">Às vezes o problema é um processo manual. Às vezes, informação espalhada em cinco lugares. Em outras, falta uma ferramenta que simplesmente não existe.</p>
          <p className="body-copy">Antes de sugerir qualquer tecnologia, quero entender a operação, ouvir quem faz o trabalho e descobrir onde uma mudança pode fazer diferença de verdade.</p>
        </div>
        <div className="approach-stamp"><span>PRIMEIRO<br/>ENTENDER</span></div>
      </section>

      <section className="work-section" id="trabalho">
        <div className="section-wrap">
          <div className="section-index">[ 02 — O QUE POSSO FAZER ]</div>
          <div className="section-heading">
            <p className="kicker">A FERRAMENTA VEM DEPOIS DO PROBLEMA.</p>
            <h2>Uma solução certa<br/><em>para cada desafio.</em></h2>
          </div>
          <div className="capability-grid">
            {capabilities.map((item) => <article className="capability" key={item.number}>
              <div className="capability-top"><span>{item.number} / 04</span><span>ÁREA DE ATUAÇÃO</span></div>
              <h3>{item.title}</h3><p>{item.text}</p>
              <span className="capability-rule" />
            </article>)}
          </div>
        </div>
      </section>

      <section className="process-section section-wrap">
        <div className="section-index">[ 03 — COMO ACONTECE ]</div>
        <div className="process-content">
          <p className="kicker">DO PROBLEMA À SOLUÇÃO EM USO.</p>
          <h2>Não entrego só<br/><em>um arquivo.</em></h2>
          <div className="process-list">
            <div><span>01</span><p><strong>Entender</strong> — conversamos sobre a empresa, a rotina e o que precisa mudar.</p></div>
            <div><span>02</span><p><strong>Desenhar</strong> — defino com você o caminho mais simples e útil para resolver o problema.</p></div>
            <div><span>03</span><p><strong>Construir</strong> — desenvolvo, testo e implemento a solução no contexto real do negócio.</p></div>
            <div><span>04</span><p><strong>Acompanhar</strong> — ajustamos o que for necessário depois que a solução começa a ser usada.</p></div>
          </div>
        </div>
      </section>

      <section className="proof-section" id="experimentos">
        <div className="section-wrap">
          <div className="section-index">[ 04 — EXPERIMENTAÇÃO ]</div>
          <div className="proof-heading">
            <div><p className="kicker">IA NÃO É SÓ DISCURSO.</p><h2>Eu testo.<br/><em>Eu crio. Eu construo.</em></h2></div>
            <p className="body-copy">Estes filmes são experimentos reais com inteligência artificial. Eu me coloquei em cenas e contextos que não existiriam numa gravação convencional — explorando ferramentas, direção visual e novas possibilidades de criação.</p>
          </div>
          <div className="film-grid">
            {videos.map((video, index) => <figure className={index === 0 ? "film-frame film-frame-featured" : "film-frame"} key={video}>
              <video src={`/club-videos/video${video}.mp4`} controls muted playsInline preload="metadata" />
              <figcaption><span>EXPERIMENTO COM IA</span><span>TAKE 0{video}</span></figcaption>
            </figure>)}
          </div>
          <p className="film-note">Vídeos criados com inteligência artificial — parte de uma exploração prática do que a tecnologia já permite fazer.</p>
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-orbit" aria-hidden="true" />
        <div className="closing-content">
          <p className="kicker">TEM ALGUMA COISA QUE PODERIA FUNCIONAR MELHOR?</p>
          <h2>Vamos descobrir<br/><em>e construir.</em></h2>
          <p>Você não precisa chegar com a solução pronta. Me conte o que acontece hoje, onde está o problema e o que gostaria de mudar.</p>
          <a className="button button-primary" href={contact} target="_blank" rel="noreferrer">Me conte sobre seu negócio <ArrowRight size={17}/></a>
        </div>
        <div className="closing-mark">VR<span>®</span></div>
      </section>
    </SiteFrame>
  );
}
