import { useEffect, useRef } from "react";
import { Search, ScanSearch, Code2, Activity, ArrowDownRight } from "lucide-react";
import "../styles/process-journey-3d.css";

const stages = [
  { number:"01", phase:"DISCOVERY / LISTEN", title:"Entender", lead:"Antes de qualquer linha de código, existe uma pergunta.", text:"Conversamos sobre a empresa, a rotina e o que precisa mudar. Quero entender o cenário real — inclusive aquilo que parece pequeno, mas consome tempo todos os dias.", note:"O PROBLEMA GANHA CONTORNO", icon:Search, shape:"lens" },
  { number:"02", phase:"STRATEGY / MAP", title:"Desenhar", lead:"A tecnologia certa começa com a pergunta certa.", text:"Mapeio os pontos de atrito e desenho um caminho simples, viável e conectado à realidade da operação. Sem complicar o que pode ser direto.", note:"A DIREÇÃO FICA CLARA", icon:ScanSearch, shape:"map" },
  { number:"03", phase:"ENGINEERING / BUILD", title:"Construir", lead:"Ideia boa precisa funcionar fora da apresentação.", text:"Desenvolvo, testo e implemento a solução no contexto real do negócio. Cada parte é pensada para conversar com as pessoas e ferramentas que já fazem a operação acontecer.", note:"A SOLUÇÃO GANHA VIDA", icon:Code2, shape:"build" },
  { number:"04", phase:"EVOLUTION / SUPPORT", title:"Acompanhar", lead:"O lançamento não é o fim. É quando começa a vida real.", text:"Acompanhamos o uso, ouvimos o retorno e ajustamos o que for necessário. A solução evolui junto com a empresa, sem ficar parada no dia em que foi entregue.", note:"A MELHORIA CONTINUA", icon:Activity, shape:"evolve" },
];

function ProcessObject({ shape }: { shape:string }) {
  return <div className={`journey-object journey-object-${shape}`} aria-hidden="true">
    <div className="journey-object-orbit journey-orbit-a"/><div className="journey-object-orbit journey-orbit-b"/><div className="journey-object-orbit journey-orbit-c"/>
    <div className="journey-solid"><i/><i/><i/><i/><i/><i/><b>{shape==="lens"?"01":shape==="map"?"02":shape==="build"?"03":"04"}</b></div>
    <span className="journey-node journey-node-a"/><span className="journey-node journey-node-b"/><span className="journey-node journey-node-c"/>
    <span className="journey-object-crosshair">V/R — PROCESS SYSTEM</span>
  </div>;
}

export default function ProcessJourney3D() {
  const root=useRef<HTMLElement>(null);
  useEffect(()=>{
    const node=root.current;
    if(!node || !("IntersectionObserver" in window)) return;
    const cards=Array.from(node.querySelectorAll<HTMLElement>(".journey-card"));
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting) entry.target.classList.add("journey-card-seen");
      });
    },{threshold:.2});
    cards.forEach(card=>observer.observe(card));
    return ()=>observer.disconnect();
  },[]);
  return <section className="process-section journey-section" id="processo" ref={root}>
    <div className="journey-atmosphere" aria-hidden="true"><span className="journey-grid"/><span className="journey-glow journey-glow-a"/><span className="journey-glow journey-glow-b"/><span className="journey-rail"/></div>
    <div className="journey-shell">
      <header className="journey-heading">
        <div className="section-index">DO PROBLEMA À SOLUÇÃO / 01—04</div>
        <div className="journey-heading-grid">
          <div><p className="kicker">UM PROCESSO COM INTENÇÃO.</p><h2>Da primeira pergunta <em>ao próximo passo.</em></h2></div>
          <p className="journey-intro">Não existe receita pronta. Existe um caminho construído com você, etapa por etapa, até a solução fazer sentido na vida real.</p>
        </div>
        <div className="journey-scroll-hint"><span/> ACOMPANHE A JORNADA <ArrowDownRight size={18}/></div>
      </header>
      <div className="journey-stack">
        {stages.map((stage,index)=>{
          const Icon=stage.icon;
          return <article className={`journey-card journey-card-${index+1}`} key={stage.number}>
            <div className="journey-card-meta"><span>STAGE {stage.number} / 04</span><span>{stage.phase}</span></div>
            <ProcessObject shape={stage.shape}/>
            <div className="journey-copy">
              <span className="journey-note">{stage.note}</span>
              <h3>{stage.title}</h3>
              <h4>{stage.lead}</h4>
              <p>{stage.text}</p>
              <div className="journey-card-bottom"><span><Icon size={16}/></span><b>V/R — DIGITAL ENGINEERING</b><i>{stage.number}</i></div>
            </div>
            <span className="journey-card-outline" aria-hidden="true"/>
          </article>;
        })}
      </div>
      <footer className="journey-footer"><span>UM PASSO DE CADA VEZ.</span><span>DO PROBLEMA À SOLUÇÃO.</span></footer>
    </div>
  </section>;
}
