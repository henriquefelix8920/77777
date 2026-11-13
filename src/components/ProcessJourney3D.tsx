import { useEffect, useRef } from "react";
import { ArrowDown, Search, Compass, Code2, Activity } from "lucide-react";
import "../styles/process-journey-3d.css";

const stages = [
  { number:"01", eyebrow:"PRIMEIRO MOVIMENTO", title:"Entender.", phrase:"Toda mudança começa com uma boa pergunta.", text:"A gente conversa sobre a empresa, a rotina e o que precisa mudar. Antes de pensar em tecnologia, eu preciso entender o cenário real.", verb:"ESCUTAR",icon:Search},
  { number:"02", eyebrow:"SEGUNDO MOVIMENTO", title:"Encontrar.", phrase:"O problema certo muda tudo.", text:"Investigo os pontos de atrito, conecto as informações e identifico onde uma solução pode fazer diferença de verdade.", verb:"DIRECIONAR",icon:Compass},
  { number:"03", eyebrow:"TERCEIRO MOVIMENTO", title:"Construir.", phrase:"Uma ideia só vale quando funciona no mundo real.", text:"Transformo a direção em uma ferramenta concreta. Desenvolvo, testo e integro a solução à operação, com atenção a cada detalhe.", verb:"MATERIALIZAR",icon:Code2},
  { number:"04", eyebrow:"MOVIMENTO CONTÍNUO", title:"Evoluir.", phrase:"A entrega é o começo da próxima etapa.", text:"Acompanho o uso, escuto quem está na ponta e ajusto o que for necessário. A tecnologia continua evoluindo junto com o negócio.", verb:"APERFEIÇOAR",icon:Activity},
];

export default function ProcessJourney3D(){
  const root=useRef<HTMLElement>(null);
  useEffect(()=>{
    const node=root.current;
    if(!node)return;
    const items=Array.from(node.querySelectorAll<HTMLElement>(".process-act"));
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting)entry.target.classList.add("process-act-in");
    }),{threshold:.35});
    items.forEach(item=>observer.observe(item));
    return()=>observer.disconnect();
  },[]);
  return <section className="process-section process-kinetic" id="processo" ref={root}>
    <div className="process-kinetic-atmosphere" aria-hidden="true"><span className="process-kinetic-sun"/><span className="process-kinetic-grain"/><span className="process-kinetic-line"/></div>
    <header className="process-kinetic-header">
      <span className="process-kinetic-index">V/R — MÉTODO DE TRABALHO / 04 ATOS</span>
      <p className="process-kinetic-kicker">DO PROBLEMA À SOLUÇÃO</p>
      <h2>Não é um atalho.<br/><em>É um caminho.</em></h2>
      <p className="process-kinetic-intro">Uma sequência de movimentos para transformar uma questão real em algo que funciona.</p>
      <span className="process-kinetic-scroll">ROLE PARA ACOMPANHAR <ArrowDown size={15}/></span>
    </header>
    <div className="process-acts">
      {stages.map((stage,index)=>{
        const Icon=stage.icon;
        return <article className={`process-act process-act-${index+1}`} key={stage.number}>
          <div className="process-act-number" aria-hidden="true">{stage.number}</div>
          <div className="process-act-inner">
            <div className="process-act-meta"><span>{stage.eyebrow}</span><span>0{index+1} / 04</span></div>
            <div className="process-act-rule"><span/></div>
            <div className="process-act-content">
              <span className="process-act-verb"><Icon size={15}/>{stage.verb}</span>
              <h3>{stage.title}</h3>
              <h4>{stage.phrase}</h4>
              <p>{stage.text}</p>
            </div>
            <span className="process-act-coordinate">V/R — PROCESS ARCHIVE / 2026</span>
          </div>
        </article>;
      })}
    </div>
    <footer className="process-kinetic-footer"><span>O CAMINHO É CONSTRUÍDO EM CONJUNTO.</span><span>FIM DE UM PROBLEMA. COMEÇO DE POSSIBILIDADES.</span></footer>
  </section>;
}