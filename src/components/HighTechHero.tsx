import { useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Copy, Terminal, Zap } from "lucide-react";
import "../styles/high-tech-hero.css";

type HighTechHeroProps = {
  contact: string;
};

const codeTabs = [
  {
    id: "workflow",
    label: "WORKFLOW",
    language: "typescript",
    lines: [
      { text: "const processo = await negocio.receberPedido();", tone: "plain" },
      { text: "", tone: "plain" },
      { text: "const analise = await agente.executar({", tone: "plain" },
      { text: '  objetivo: "resolver gargalo",', tone: "string" },
      { text: "  contexto: processo,", tone: "plain" },
      { text: "});", tone: "plain" },
      { text: "", tone: "plain" },
      { text: "return sistema.integrar(analise);", tone: "accent" },
    ],
  },
  {
    id: "integration",
    label: "INTEGRAÇÃO",
    language: "typescript",
    lines: [
      { text: "const canais = await conectar([", tone: "plain" },
      { text: '  "site",', tone: "string" },
      { text: '  "crm",', tone: "string" },
      { text: '  "pagamentos",', tone: "string" },
      { text: "]);", tone: "plain" },
      { text: "", tone: "plain" },
      { text: "await fluxo.sincronizar(canais);", tone: "accent" },
      { text: "return { status: \"conectado\" };", tone: "plain" },
    ],
  },
  {
    id: "intelligence",
    label: "INTELIGÊNCIA",
    language: "python",
    lines: [
      { text: "def encontrar_oportunidade(dados):", tone: "plain" },
      { text: "    contexto = organizar(dados)", tone: "plain" },
      { text: "    sinais = analisar(contexto)", tone: "plain" },
      { text: "", tone: "plain" },
      { text: "    return priorizar(", tone: "accent" },
      { text: "        sinais, impacto=True", tone: "string" },
      { text: "    )", tone: "accent" },
      { text: "# decisão baseada no contexto", tone: "muted" },
    ],
  },
] as const;

function TerminalPreview() {
  const [activeTab, setActiveTab] = useState<(typeof codeTabs)[number]["id"]>("workflow");
  const [copied, setCopied] = useState(false);
  const activeCode = codeTabs.find((tab) => tab.id === activeTab) ?? codeTabs[0];
  const source = activeCode.lines.map((line) => line.text).join("\n");

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="hightech-terminal" aria-label="Prévia interativa de código, demonstração visual">
      <div className="terminal-topbar">
        <div className="terminal-window-controls" aria-hidden="true">
          <i /><i /><i />
        </div>
        <div className="terminal-window-name"><Terminal size={13} /> VALKYRJA / SYSTEM CONSOLE</div>
        <span className="terminal-live"><i /> LIVE PREVIEW</span>
      </div>

      <div className="terminal-toolbar">
        <div className="terminal-file"><span className="terminal-file-icon">⌘</span> solution.ts <span className="terminal-file-dot" /></div>
        <span className="terminal-toolbar-index">01 — 03</span>
      </div>

      <div className="terminal-tabs" role="tablist" aria-label="Exemplos de código">
        {codeTabs.map((tab) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? "terminal-tab is-active" : "terminal-tab"}
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setCopied(false); }}
          >
            {tab.label}
          </button>
        ))}
        <button type="button" className="terminal-copy" onClick={copyCode} aria-label="Copiar trecho de código">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? "COPIADO" : "COPIAR"}</span>
        </button>
      </div>

      <div className="terminal-code-area" role="tabpanel">
        <div className="terminal-code-meta"><span>{activeCode.language}</span><span>EXEMPLO CONCEITUAL</span></div>
        <pre className="terminal-code"><code key={activeTab}>
          {activeCode.lines.map((line, index) => (
            <span className="terminal-code-line" key={index}>
              <i>{String(index + 1).padStart(2, "0")}</i>
              <span className={`code-${line.tone}`}>{line.text || " "}</span>
            </span>
          ))}
        </code></pre>
      </div>

      <div className="terminal-output">
        <div className="terminal-output-heading"><span>EXECUTION LOG</span><span>SIMULAÇÃO</span></div>
        <p><i className="log-ok" /> <span>mapeando processo</span><b>COMPLETE</b></p>
        <p><i className="log-active" /> <span>conectando possibilidades</span><b>RUNNING</b></p>
        <p><i className="log-idle" /> <span>preparando próxima etapa</span><b>QUEUED</b></p>
      </div>

      <div className="terminal-bottomline">
        <span><i /> SYSTEM READY</span>
        <span>INTERFACE CONCEITUAL <b>✳</b></span>
      </div>
      <span className="terminal-glow terminal-glow-a" aria-hidden="true" />
      <span className="terminal-glow terminal-glow-b" aria-hidden="true" />
    </div>
  );
}

export default function HighTechHero({ contact }: HighTechHeroProps) {
  return (
    <section id="inicio" className="hightech-hero">
      <div className="hightech-world" aria-hidden="true">
        <span className="hightech-grid" />
        <span className="hightech-horizon" />
        <span className="hightech-orbit hightech-orbit-one" />
        <span className="hightech-orbit hightech-orbit-two" />
        <span className="hightech-scanline" />
        <span className="hightech-node hightech-node-one" />
        <span className="hightech-node hightech-node-two" />
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
          <div className="hightech-visual-label"><span>FIG. 01</span><span>INTELLIGENCE / INTERFACE</span></div>
          <TerminalPreview />
          <div className="hightech-float-tag hightech-float-tag-a"><span className="float-tag-icon"><Zap size={13} /></span><span><b>PROCESS ENGINE</b><small>FLOW OPTIMIZED</small></span><i /></div>
          <div className="hightech-float-tag hightech-float-tag-b"><span className="float-tag-icon float-tag-icon-blue">⌘</span><span><b>CONNECTED SYSTEMS</b><small>ONE CLEAR DIRECTION</small></span></div>
          <div className="hightech-visual-index">VR<span>_</span>001</div>
        </div>
      </div>

      <div className="hightech-bottom-meta"><span>DESIGNED TO SOLVE / BUILT TO EVOLVE</span><span>SCROLL TO EXPLORE <i>↓</i></span></div>
    </section>
  );
}
