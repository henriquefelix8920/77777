import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { waLink } from "../config";
import SiteFrame from "../components/SiteFrame";

const capabilities = [
  { title: "Sistemas e plataformas", text: "Ferramentas feitas para a rotina do seu negócio — não mais uma planilha improvisada." },
  { title: "Automação e integrações", text: "Menos tarefas repetidas. Mais tempo para o trabalho que realmente precisa de gente." },
  { title: "Inteligência artificial", text: "IA aplicada a situações concretas: atendimento, análise, conteúdo e operações." },
  { title: "Sites e experiências digitais", text: "Presença digital com personalidade, clareza e uma função que vai além de parecer bonita." },
];

function Film({ src, className = "" }: { src: number; className?: string }) {
  return <div className={`film-object ${className}`} aria-hidden="true">
    <video src={`/club-videos/video${src}.mp4`} autoPlay muted loop playsInline preload="metadata" tabIndex={-1} />
    <span className="film-tint" />
  </div>;
}

export default function HomePage() {
  const contact = waLink("Olá! Conheci seu trabalho pelo site e quero conversar sobre um problema ou projeto da minha empresa.");
  return <SiteFrame>
    <section id="inicio" className="hero">
      <Film src={1} className="hero-film-bg" />
      <Film src={2} className="hero-film-orbit" />
      <div className="hero-inner motion-left">
        <p className="eyebrow"><span className="eyebrow-line" /> TECNOLOGIA COM INTENÇÃO</p>
        <h1>Seu negócio tem desafios.<br /><span>Eu construo caminhos.</span></h1>
        <p className="hero-lead">Entendo como sua empresa funciona, encontro o que pode melhorar e desenvolvo tecnologia para resolver — do primeiro diagnóstico à implementação.</p>
        <div className="hero-actions">
          <a className="button button-primary" href={contact} target="_blank" rel="noreferrer">Vamos conversar <ArrowUpRight size={17} /></a>
          <a className="button button-quiet" href="#abordagem">Conheça meu jeito <ArrowDown size={16} /></a>
        </div>
      </div>
      <div className="hero-floating-title motion-right" aria-hidden="true">IDEIAS<br/><em>EM</em><br/>MOVIMENTO</div>
      <span className="hero-side-label" aria-hidden="true">PENSAR / CONSTRUIR / EVOLUIR</span>
    </section>

    <section className="intro-section section-wrap" id="abordagem">
      <Film src={3} className="intro-film motion-right" />
      <span className="floating-word intro-float motion-left" aria-hidden="true">ENTENDER</span>
      <div className="section-index motion-left">A ABORDAGEM</div>
      <div className="intro-copy motion-up">
        <p className="kicker">NÃO COMEÇO PELO CÓDIGO.</p>
        <h2>Começo entendendo<br/>o que está <em>travando</em><br/>o seu negócio.</h2>
        <p className="body-copy">Às vezes o problema é um processo manual. Às vezes, informação espalhada em cinco lugares. Em outras, falta uma ferramenta que simplesmente não existe.</p>
        <p className="body-copy">Antes de sugerir qualquer tecnologia, quero entender a operação, ouvir quem faz o trabalho e descobrir onde uma mudança pode fazer diferença de verdade.</p>
      </div>
      <div className="approach-stamp motion-up"><span>PRIMEIRO<br/>ENTENDER</span></div>
    </section>

    <section className="work-section" id="trabalho">
      <Film src={4} className="work-film motion-right" />
      <span className="floating-word work-float motion-left" aria-hidden="true">POSSIBILIDADES</span>
      <div className="section-wrap">
        <div className="section-index motion-left">O QUE POSSO FAZER</div>
        <div className="section-heading motion-up">
          <p className="kicker">A FERRAMENTA VEM DEPOIS DO PROBLEMA.</p>
          <h2>Uma solução certa<br/><em>para cada desafio.</em></h2>
        </div>
        <div className="capability-grid">
          {capabilities.map((item, i) => <article className={`capability motion-${i % 2 ? "right" : "up"}`} key={item.title}>
            <div className="capability-top"><span>O QUE EU FAÇO</span></div>
            <h3>{item.title}</h3><p>{item.text}</p>
            <span className="capability-rule" />
          </article>)}
        </div>
      </div>
    </section>

    <section className="process-section section-wrap">
      <Film src={5} className="process-film motion-right" />
      <span className="floating-word process-float motion-left" aria-hidden="true">DO INÍCIO<br/>AO USO</span>
      <div className="section-index motion-left">DO PROBLEMA À SOLUÇÃO</div>
      <div className="process-content motion-up">
        <p className="kicker">TRABALHO DO COMEÇO AO USO.</p>
        <h2>Não entrego só<br/><em>um arquivo.</em></h2>
        <div className="process-list">
          <div className="motion-left"><span>Entender</span><p>Conversamos sobre a empresa, a rotina e o que precisa mudar.</p></div>
          <div className="motion-right"><span>Desenhar</span><p>Defino com você o caminho mais simples e útil para resolver o problema.</p></div>
          <div className="motion-left"><span>Construir</span><p>Desenvolvo, testo e implemento a solução no contexto real do negócio.</p></div>
          <div className="motion-right"><span>Acompanhar</span><p>Ajustamos o que for necessário depois que a solução começa a ser usada.</p></div>
        </div>
      </div>
    </section>

    <section className="closing-section">
      <Film src={6} className="closing-film motion-left" />
      <span className="closing-floating motion-right" aria-hidden="true">VAMOS<br/>CONSTRUIR?</span>
      <div className="closing-content motion-up">
        <p className="kicker">TEM ALGUMA COISA QUE PODERIA FUNCIONAR MELHOR?</p>
        <h2>Vamos descobrir<br/><em>e construir.</em></h2>
        <p>Você não precisa chegar com a solução pronta. Me conte o que acontece hoje, onde está o problema e o que gostaria de mudar.</p>
        <a className="button button-primary" href={contact} target="_blank" rel="noreferrer">Me conte sobre seu negócio <ArrowRight size={17}/></a>
      </div>
      <div className="closing-mark">VR<span>®</span></div>
    </section>
  </SiteFrame>;
}
