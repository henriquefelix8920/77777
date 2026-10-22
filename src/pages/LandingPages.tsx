import { ArrowDown, ArrowRight } from "lucide-react";
import SiteFrame from "../components/SiteFrame";
import { waLink } from "../config";

const lessonMessage =
  "Olá, Valkyrja! Quero conversar sobre a aula inaugural gratuita de guitarra online.";
const groupUrl = "https://chat.whatsapp.com/KwVqvaK5EAcBwuQr7cXGPD";

type JourneyStep = {
  eyebrow: string;
  title: string;
  text: string;
  color: "cyan" | "magenta" | "violet";
  href?: string;
  label?: string;
  external?: boolean;
};

function SignalRoute() {
  const path =
    "M500 0 C340 72 340 125 500 167 C660 209 660 290 500 333 C340 376 340 457 500 500 C660 543 660 624 500 667 C340 710 340 791 500 833 C660 875 660 928 500 1000";
  return (
    <>
      <svg
        className="signal-route"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="signal-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="52%" stopColor="#39ff88" />
            <stop offset="100%" stopColor="#b6a1ff" />
          </linearGradient>
        </defs>
        <path className="signal-route__track" pathLength="1000" d={path} />
        <path className="signal-route__progress" pathLength="1000" d={path} />
      </svg>
      <span className="signal-route__traveler" aria-hidden="true" />
    </>
  );
}

function Journey({ steps }: { steps: JourneyStep[] }) {
  return (
    <div className="service-flow">
      <SignalRoute />
      {steps.map((step, index) => {
        const direction = index === 1 ? "-0.95" : "0.95";
        return (
          <article key={step.title} className="service-stop" data-reveal>
            <div className="service-stop__copy">
              <p className={`service-eyebrow accent-${step.color}`}>
                <span>{step.eyebrow}</span>
              </p>
              <h3 data-parallax={direction} data-kinetic="title">
                {step.title}
              </h3>
              <p className="service-description">{step.text}</p>
              {step.href && step.label && (
                <a
                  className={`service-link accent-${step.color}`}
                  data-parallax={index === 1 ? "0.7" : "-0.7"}
                  data-kinetic="cta"
                  href={step.href}
                  {...(step.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {step.label} <ArrowRight size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function Hero({
  eyebrow,
  title,
  accent,
  description,
  note,
  primaryHref,
  primaryLabel,
  secondaryLabel,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  note: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <section
      id="inicio"
      className="hero-section relative z-10 mx-auto flex min-h-[82svh] w-full max-w-6xl flex-col justify-center px-5 pb-20 pt-12 sm:min-h-[86svh] sm:px-8 sm:pt-16"
    >
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">
          <span className="live-dot" aria-hidden="true" /> {eyebrow}
        </p>
        <h1
          className="hero-title neon-title"
          data-parallax="0.95"
          data-kinetic="title"
        >
          {title}
          <br />
          <span className="hero-title-accent">{accent}</span>
        </h1>
        <p className="hero-description">{description}</p>
        <div className="hero-actions">
          <a
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-cta"
            data-parallax="0.72"
            data-kinetic="cta"
          >
            {primaryLabel} <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a
            href="#universos"
            className="text-cta"
            data-parallax="-0.62"
            data-kinetic="cta"
          >
            {secondaryLabel} <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
        <p className="hero-note">{note}</p>
      </div>
      <a
        href="#universos"
        className="scroll-cue"
        aria-label="Role para explorar"
      >
        <span>ROLE PARA EXPLORAR</span>
        <span className="scroll-cue-line" />
      </a>
    </section>
  );
}

function JourneySection({
  kicker,
  title,
  lead,
  steps,
}: {
  kicker: string;
  title: string;
  lead: string;
  steps: JourneyStep[];
}) {
  return (
    <section
      id="universos"
      className="offerings-section relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 pt-12 sm:px-8 sm:pb-36"
    >
      <div className="section-intro" data-reveal>
        <p className="section-kicker">{kicker}</p>
        <h2 className="section-title" data-parallax="0.95" data-kinetic="title">
          {title}
        </h2>
        <p className="section-lead">{lead}</p>
      </div>
      <Journey steps={steps} />
    </section>
  );
}

export function GuitarLessonsPage() {
  const steps: JourneyStep[] = [
    {
      eyebrow: "PONTO DE PARTIDA · SEU REPERTÓRIO",
      title: "A aula começa pela música que você quer tocar.",
      text: "Uma canção, uma dúvida ou uma meta concreta dão direção ao estudo. O plano considera seu nível e sua rotina — sem obrigar você a seguir uma sequência que não conversa com a sua música.",
      color: "cyan",
    },
    {
      eyebrow: "ENCONTRO INDIVIDUAL · AO VIVO",
      title: "Uma hora para entender, experimentar e perguntar.",
      text: "Toda semana, uma aula individual pelo Google Meet. Técnica, ritmo, harmonia, improvisação e repertório entram na conversa conforme o que pode levar seu som adiante.",
      color: "magenta",
    },
    {
      eyebrow: "ENTRE AS AULAS · CONTINUIDADE",
      title: "O estudo segue com você depois do encontro.",
      text: "Envie um vídeo do seu treino e receba uma resposta em vídeo com orientações para praticar. Materiais preparados para o seu momento ajudam a manter o caminho claro.",
      color: "violet",
      href: "#investimento",
      label: "Ver formato e investimento",
    },
  ];

  return (
    <SiteFrame>
      <Hero
        eyebrow="AULAS INDIVIDUAIS · GUITARRA E VIOLÃO · ONLINE"
        title="Sua guitarra,"
        accent="com mais direção."
        description="Aulas individuais para desenvolver o que faz diferença quando você toca: mais clareza, mais recursos e mais liberdade para transformar ideias em música. O caminho parte dos seus objetivos, não de uma fórmula pronta."
        note="1 encontro ao vivo por semana · acompanhamento por vídeo · R$ 200/mês"
        primaryHref={waLink(lessonMessage)}
        primaryLabel="Agendar aula inaugural gratuita"
        secondaryLabel="Conhecer as aulas"
      />

      <JourneySection
        kicker="UM CAMINHO FEITO PARA O SEU MOMENTO"
        title="Aprender é conectar a ideia ao instrumento."
        lead="Cada encontro tem um foco, mas nada fica isolado: o que você entende precisa fazer sentido na mão, no ouvido e na música que quer tocar."
        steps={steps}
      />

      <section
        id="investimento"
        className="lesson-offer relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24"
      >
        <figure className="lesson-portrait" data-reveal>
          <img
            src="/foto2.webp"
            alt="Valkyrja Reis tocando guitarra"
            width="1122"
            height="1402"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="lesson-portrait__caption">
            AULAS DE GUITARRA · COM INTENÇÃO
          </figcaption>
        </figure>
        <div className="manifesto-copy lesson-offer__copy" data-reveal>
          <p className="section-kicker">
            INVESTIMENTO · ACOMPANHAMENTO INDIVIDUAL
          </p>
          <h2
            className="lesson-price-title"
            data-parallax="0.95"
            data-kinetic="title"
          >
            R$ 200<span>/mês</span>
          </h2>
          <p>
            Um encontro individual ao vivo por semana, retorno em vídeo sobre o
            seu treino e materiais de apoio pensados para o que estamos
            desenvolvendo juntos.
          </p>
          <p className="lesson-offer__note">
            Começamos com uma aula inaugural gratuita e sem compromisso. Você me
            conta o que busca; a gente vê se o formato combina com você.
          </p>
          <a
            href={waLink(lessonMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-cta"
            data-parallax="-0.72"
            data-kinetic="cta"
          >
            Vamos conversar sobre a aula{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
    </SiteFrame>
  );
}

export function ImprovisationCommunityPage() {
  const steps: JourneyStep[] = [
    {
      eyebrow: "ESCUTA · HARMONIA · CONTEXTO",
      title: "Antes de escolher notas, ouça o que a música pede.",
      text: "Improvisar começa prestando atenção no ritmo, na harmonia e na intenção do momento. As escalas são um mapa; o ouvido ajuda a escolher para onde ir.",
      color: "cyan",
    },
    {
      eyebrow: "VOCABULÁRIO · FRASEADO · INTENÇÃO",
      title: "Faça das notas uma frase — não uma corrida.",
      text: "Explore pausas, repetição, ritmo e direção melódica. Pequenas escolhas mudam o sentido de uma frase e abrem espaço para encontrar uma voz própria no instrumento.",
      color: "magenta",
    },
    {
      eyebrow: "PRÁTICA · ENCONTROS · TROCA",
      title: "Estudar em companhia também faz a música avançar.",
      text: "Na comunidade gratuita, você encontra outros guitarristas, compartilha dúvidas e acompanha uma aula ao vivo por semana para levar novas ideias direto à prática.",
      color: "violet",
      href: groupUrl,
      label: "Entrar na comunidade gratuita",
      external: true,
    },
  ];

  return (
    <SiteFrame>
      <Hero
        eyebrow="A ARTE SUAVE DA IMPROVISAÇÃO · COMUNIDADE GRATUITA"
        title="Improvisar é"
        accent="ouvir e escolher."
        description="Um espaço para sair do piloto automático: ouvir melhor, experimentar ideias e construir frases com intenção. Estude improvisação junto com outros guitarristas, troque perguntas e leve o que aprende para a guitarra."
        note="Comunidade gratuita no WhatsApp · encontros ao vivo semanais"
        primaryHref={groupUrl}
        primaryLabel="Entrar grátis no grupo"
        secondaryLabel="Ver como funciona"
      />

      <JourneySection
        kicker="A ARTE SUAVE DA IMPROVISAÇÃO"
        title="Menos notas por reflexo. Mais música por escolha."
        lead="Improvisar não exige saber tudo antes de começar. Exige curiosidade para escutar, testar uma ideia e perceber o que ela provoca."
        steps={steps}
      />

      <section className="manifesto-section relative z-10" data-reveal>
        <div className="manifesto-inner mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="manifesto-copy">
            <p className="section-kicker">UM LUGAR PARA ESTUDAR EM MOVIMENTO</p>
            <h2 data-parallax="0.95" data-kinetic="title">
              Você não precisa chegar sabendo tudo.
              <br />
              <span>Chegue com vontade de tocar.</span>
            </h2>
            <p>
              Entre no grupo, acompanhe as aulas ao vivo e participe das trocas
              no seu ritmo. A comunidade é gratuita — e cada pergunta pode ser o
              começo de uma nova ideia na guitarra.
            </p>
            <a
              href={groupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-cta"
              data-parallax="-0.72"
              data-kinetic="cta"
            >
              Quero participar <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
