import { Link } from "react-router-dom";
import { ArrowUpRight, Compass, FileText, MessagesSquare, Music2, Radio, Video } from "lucide-react";
import VideoBackground from "../components/VideoBackground";
import WhatsAppButton from "../components/WhatsAppButton";
import { waLink } from "../config";
import { RainbowButton } from "../components/ui/rainbow-button";

const whatsappMessage = "Olá, Valkyrja! Quero agendar minha aula inaugural grátis de guitarra online e conhecer a proposta das aulas individuais.";

function BackLink() {
  return <Link to="/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-300 transition-colors hover:text-neon-cyan">← Voltar ao início</Link>;
}

function PageShell({ children, video }: { children: React.ReactNode; video: string }) {
  return <main className="landing-page relative min-h-dvh overflow-hidden bg-void text-slate-100 [font-family:inherit]">
    <VideoBackground src={video} />
    <div className="film-grain scanlines pointer-events-none fixed inset-0 z-[60]" aria-hidden="true" />
    <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[900px] flex-col px-5 pb-24 pt-7 sm:px-8">
      <header className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] text-slate-400"><BackLink /><span>Valkyrja Reis · Guitarra online</span></header>
      {children}
      <footer className="mt-16 pt-8 text-center text-[10px] uppercase tracking-[0.25em] text-slate-500">Valkyrja Reis ✦ Toque com intenção</footer>
    </div>
    <WhatsAppButton />
  </main>;
}

function Action({ href, children, external = true }: { href: string; children: React.ReactNode; external?: boolean }) {
  return <RainbowButton href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group inline-flex items-center justify-center gap-3 text-center text-xs font-bold uppercase tracking-[0.1em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-cyan"><span>{children}</span><ArrowUpRight className="rainbow-button__arrow h-5 w-5 shrink-0" strokeWidth={1.7} aria-hidden="true" /></RainbowButton>;
}

function CyberIcon({ type }: { type: "live" | "video" | "materials" | "direction" | "community" | "guitar" }) {
  const Icon = {
    live: Radio,
    video: Video,
    materials: FileText,
    direction: Compass,
    community: MessagesSquare,
    guitar: Music2,
  }[type];
  return <span
    className="cinema-icon mx-auto"
    data-icon={type}
    aria-hidden="true"
    onPointerMove={(event) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      event.currentTarget.style.setProperty("--icon-rotate-x", `${(0.5 - y) * 38}deg`);
      event.currentTarget.style.setProperty("--icon-rotate-y", `${(x - 0.5) * 38}deg`);
    }}
    onPointerLeave={(event) => {
      event.currentTarget.style.setProperty("--icon-rotate-x", "0deg");
      event.currentTarget.style.setProperty("--icon-rotate-y", "0deg");
    }}
  ><span className="cinema-icon__orbit" /><span className="cinema-icon__core"><Icon className="cinema-icon__glyph" strokeWidth={1.45} /></span><span className="cinema-icon__spark">✦</span></span>;
}

export function GuitarLessonsPage() {
  return <PageShell video="/video1.mp4">
    <section className="mt-14 grid items-center gap-8 md:grid-cols-[1.1fr_.9fr] md:mt-20">
      <div>
        <p className="inline-block rounded-full border border-neon-cyan/40 bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-neon-cyan">Acompanhamento individual · 100% online</p>
        <h1 className="neon-title mt-6 text-4xl font-black leading-tight sm:text-6xl">Sua guitarra.<br/><span className="text-neon-cyan">Sua música.</span><br/>Seu caminho.</h1>
        <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-slate-200">Chega de seguir um roteiro genérico. Tenha aulas de guitarra feitas em torno do que <strong>você quer tocar, entender e desenvolver</strong> — com orientação individual e acompanhamento entre os encontros.</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Action href={waLink(whatsappMessage)}>Quero agendar minha aula inaugural grátis</Action><Action href="#como-funciona" external={false}>Ver como funciona</Action></div>
        <p className="keep-centered mt-4 text-xs text-slate-400">Acompanhamento individual por R$ 200/mês · Converse comigo pelo WhatsApp</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/35 shadow-2xl">
        <img src="/foto2.jpg" alt="Valkyrja Reis, professora de guitarra" className="max-h-[520px] w-full object-cover object-center"/>
        <div className="keep-centered p-4 text-xs uppercase tracking-[0.2em] text-slate-300">Aula pensada para a sua trajetória musical</div>
      </div>
    </section>

    <section id="como-funciona" className="mt-20 rounded-3xl border border-white/15 bg-black/65 p-6 backdrop-blur-md sm:p-9">
      <p className="text-xs uppercase tracking-[0.25em] text-neon-cyan">Não é uma aula pronta para todo mundo</p>
      <h2 className="mt-3 text-3xl font-black sm:text-4xl">Um plano de evolução feito para você.</h2>
      <p className="mt-4 max-w-[68ch] leading-relaxed text-slate-300">Quer melhorar improvisação, ritmo, técnica, harmonia, repertório ou entender de vez como aplicar uma ideia musical? A gente direciona o trabalho para os seus objetivos e para os desafios que aparecem enquanto você toca.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <article className="group rounded-2xl border border-neon-cyan/25 bg-black/45 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-neon-cyan/70 hover:bg-black/70 hover:shadow-[0_0_28px_rgba(0,240,255,.12)]"><CyberIcon type="live" /><h3 className="icon-card-title mt-4 text-lg font-bold transition-colors group-hover:text-neon-cyan">1 encontro ao vivo por semana</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Aula individual pelo Google Meet para trabalhar diretamente no que você precisa evoluir, com espaço para perguntas e prática orientada.</p></article>
        <article className="group rounded-2xl border border-neon-magenta/25 bg-black/45 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-neon-magenta/70 hover:bg-black/70 hover:shadow-[0_0_28px_rgba(255,0,127,.12)]"><CyberIcon type="video" /><h3 className="icon-card-title mt-4 text-lg font-bold transition-colors group-hover:text-neon-magenta">Acompanhamento por vídeo</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Você me envia um vídeo do seu treino semanal e eu respondo com outro vídeo, com observações e orientações para seguir praticando.</p></article>
        <article className="group rounded-2xl border border-purple-400/25 bg-black/45 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-purple-300/70 hover:bg-black/70 hover:shadow-[0_0_28px_rgba(168,85,247,.15)]"><CyberIcon type="materials" /><h3 className="icon-card-title mt-4 text-lg font-bold transition-colors group-hover:text-purple-300">Materiais exclusivos</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">PDFs e materiais de aula preparados individualmente, alinhados ao conteúdo que estamos desenvolvendo juntos.</p></article>
        <article className="group rounded-2xl border border-yellow-300/25 bg-black/45 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-yellow-200/70 hover:bg-black/70 hover:shadow-[0_0_28px_rgba(250,204,21,.12)]"><CyberIcon type="direction" /><h3 className="icon-card-title mt-4 text-lg font-bold transition-colors group-hover:text-yellow-200">Direção sem fórmula genérica</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">O conteúdo parte das suas metas, do seu nível e das suas dúvidas reais. A ideia é fazer a música trabalhar a seu favor.</p></article>
      </div>
    </section>

    <section className="mt-16 grid gap-8 md:grid-cols-2 md:items-center">
      <div><p className="text-xs uppercase tracking-[0.25em] text-neon-magenta">Como começamos</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">Simples, direto e pessoal.</h2>
        <ol className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300"><li><strong className="text-white">01. Você me chama.</strong> Conte o que toca hoje e o que gostaria de desenvolver.</li><li><strong className="text-white">02. Alinhamos seus objetivos.</strong> Conversamos sobre suas prioridades e como as aulas podem se encaixar na sua rotina.</li><li><strong className="text-white">03. Começamos a trabalhar.</strong> Combinamos os encontros semanais e iniciamos seu acompanhamento individual.</li></ol>
      </div>
      <div className="rounded-3xl border border-neon-cyan/30 bg-black/75 p-7 text-center backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Investimento mensal</p><p className="mt-3 text-5xl font-black text-neon-cyan">R$ 200<span className="text-lg font-medium text-slate-300">/mês</span></p><p className="mt-4 text-sm leading-relaxed text-slate-300">Aula individual ao vivo toda semana, orientação por vídeo entre encontros e materiais exclusivos para o seu estudo.</p><Action href={waLink(whatsappMessage)}>Agendar aula inaugural grátis</Action><p className="mt-3 text-xs text-slate-500">Sem compromisso: vamos entender se faz sentido para você.</p>
      </div>
    </section>
    <section className="mt-16 rounded-2xl border border-white/15 bg-black/55 p-6 text-center sm:p-9"><h2 className="text-2xl font-black sm:text-3xl">Você não precisa estudar tudo. Precisa estudar o que te leva adiante.</h2><p className="mx-auto mt-4 max-w-[60ch] text-slate-300">Me chama no WhatsApp, me conta onde você está e onde quer chegar com a guitarra. Vamos pensar no caminho juntos.</p><div className="mt-6"><Action href={waLink(whatsappMessage)}>Quero agendar minha aula inaugural grátis</Action></div></section>
  </PageShell>;
}

export function ImprovisationCommunityPage() {
  const groupUrl = "https://chat.whatsapp.com/KwVqvaK5EAcBwuQr7cXGPD";
  return <PageShell video="/video3.mp4">
    <section className="mt-16 text-center sm:mt-24">
      <p className="inline-block rounded-full border border-neon-magenta/40 bg-black/45 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-neon-magenta">Comunidade gratuita · WhatsApp</p>
      <h1 className="neon-title mx-auto mt-7 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">A Arte Suave da <span className="text-neon-magenta">Improvisação</span></h1>
      <p className="mx-auto mt-6 max-w-[62ch] text-lg leading-relaxed text-slate-200">Improvisar não é tocar notas aleatórias. É aprender a ouvir, escolher e contar histórias com a guitarra. Entre para um grupo gratuito para estudar, trocar ideias e desenvolver sua musicalidade junto com outros guitarristas.</p>
      <div className="mt-8"><Action href={groupUrl}>Entrar grátis no grupo do WhatsApp ↗</Action></div>
      <p className="mt-3 text-xs text-slate-400">Gratuito para participar · Entre e acompanhe as próximas aulas ao vivo</p>
    </section>
    <section className="mt-16 grid gap-4 sm:grid-cols-3">
      <article className="group rounded-2xl border border-neon-cyan/25 bg-black/65 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-neon-cyan/70 hover:shadow-[0_0_28px_rgba(0,240,255,.14)]"><CyberIcon type="live" /><h2 className="icon-card-title mt-4 font-bold transition-colors group-hover:text-neon-cyan">Uma aula ao vivo por semana</h2><p className="mt-2 text-sm leading-relaxed text-slate-300">Encontros semanais para estudar ideias de improvisação e levar conceitos direto para o instrumento.</p></article>
      <article className="group rounded-2xl border border-neon-magenta/25 bg-black/65 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-neon-magenta/70 hover:shadow-[0_0_28px_rgba(255,0,127,.14)]"><CyberIcon type="community" /><h2 className="icon-card-title mt-4 font-bold transition-colors group-hover:text-neon-magenta">Troca de ideias sem formalidade</h2><p className="mt-2 text-sm leading-relaxed text-slate-300">Compartilhe dúvidas, referências, descobertas e conversas sobre guitarra com a comunidade.</p></article>
      <article className="group rounded-2xl border border-purple-400/25 bg-black/65 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-purple-300/70 hover:shadow-[0_0_28px_rgba(168,85,247,.15)]"><CyberIcon type="guitar" /><h2 className="icon-card-title mt-4 font-bold transition-colors group-hover:text-purple-300">Mais intenção ao improvisar</h2><p className="mt-2 text-sm leading-relaxed text-slate-300">Explore escalas, frases, ritmo e vocabulário musical com ideias que você pode experimentar tocando.</p></article>
    </section>
    <section className="mt-16 overflow-hidden rounded-3xl border border-white/15 bg-black/60 md:grid md:grid-cols-[.85fr_1.15fr] md:items-center">
      <img src="/foto2.jpg" alt="Valkyrja Reis com sua guitarra" className="h-full max-h-[430px] w-full object-cover object-center"/>
      <div className="p-6 sm:p-9"><p className="text-xs uppercase tracking-[0.25em] text-neon-cyan">Seu próximo passo</p><h2 className="mt-3 text-3xl font-black">Aprenda junto. Pergunte. Experimente. Toque.</h2><p className="mt-4 text-sm leading-relaxed text-slate-300">A proposta é construir um espaço acessível para quem quer se aproximar da improvisação, compartilhar o processo e manter a guitarra presente na semana. Você não precisa chegar sabendo tudo — só precisa ter vontade de participar.</p><div className="mt-6"><Action href={groupUrl}>Quero entrar no grupo gratuito</Action></div><p className="mt-3 text-xs text-slate-500">A Arte Suave da Improvisação · comunidade no WhatsApp</p></div>
    </section>
    <section className="mt-12 text-center"><h2 className="text-2xl font-black">A guitarra fica mais interessante quando a gente troca.</h2><p className="mt-3 text-slate-300">Vem fazer parte da conversa — sua participação é gratuita.</p><div className="mt-6"><Action href={groupUrl}>Entrar agora no WhatsApp ↗</Action></div></section>
  </PageShell>;
}
