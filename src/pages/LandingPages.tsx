import { Link } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";
import WhatsAppButton from "../components/WhatsAppButton";
import { waLink } from "../config";

const whatsappMessage = "Olá, Valkyrja! Quero agendar minha aula inaugural grátis de guitarra online e conhecer a proposta das aulas individuais.";

function BackLink() {
  return <Link to="/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-300 transition-colors hover:text-neon-cyan">← Voltar ao início</Link>;
}

function PageShell({ children, video }: { children: React.ReactNode; video: string }) {
  return <main className="relative min-h-dvh overflow-hidden bg-void text-slate-100 [font-family:inherit]">
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
  return <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-neon-cyan/60 bg-black/65 px-6 py-4 text-center text-sm font-extrabold uppercase tracking-wider text-white shadow-[0_0_22px_rgba(0,240,255,.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-neon-magenta hover:text-neon-cyan hover:shadow-[0_0_30px_rgba(0,240,255,.32),0_0_45px_rgba(255,0,127,.18)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-cyan"><span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" /><span className="relative">{children}</span><span className="relative text-neon-magenta transition-transform duration-300 group-hover:translate-x-1 group-hover:text-neon-cyan" aria-hidden="true">↗</span></a>;
}

function CyberIcon({ type }: { type: "live" | "video" | "materials" | "direction" | "community" | "guitar" }) {
  const paths: Record<string, string> = {
    live: "M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1 M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
    video: "M4 6.5A2.5 2.5 0 0 1 6.5 4h7A2.5 2.5 0 0 1 16 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 4 17.5Zm12-7 5 3v9l-5 3Z",
    materials: "M5 3.5h10l4 4V21H5a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Zm10 0v5h4M7 13h8M7 17h8",
    direction: "M12 3 20 7v5c0 5-3.5 7.8-8 9-4.5-1.2-8-4-8-9V7Zm-3 9 2 2 4-4",
    community: "M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20Zm-6.5-9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm6.5-6.5a3.5 3.5 0 0 1 0 6.8m1 3.2a4 4 0 0 1 4 4V20",
    guitar: "M14 4 20 10l-2 2-2-2-3 3 2 2-2 2-6-6 2-2 2 2 3-3-2-2Zm-7 8-3 3a2.8 2.8 0 0 0 4 4l3-3"
  };
  return <span className="group/icon inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neon-cyan/30 bg-black/55 text-neon-cyan shadow-[0_0_18px_rgba(0,240,255,.08)] transition-all duration-300 group-hover:border-neon-magenta/70 group-hover:text-neon-magenta group-hover:shadow-[0_0_24px_rgba(255,0,127,.25)]" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={paths[type]} /></svg></span>;
}

export function GuitarLessonsPage() {
  return <PageShell video="/video01.mp4">
    <section className="mt-14 grid items-center gap-8 md:grid-cols-[1.1fr_.9fr] md:mt-20">
      <div>
        <p className="inline-block rounded-full border border-neon-cyan/40 bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-neon-cyan">Acompanhamento individual · 100% online</p>
        <h1 className="neon-title mt-6 text-4xl font-black leading-tight sm:text-6xl">Sua guitarra.<br/><span className="text-neon-cyan">Sua música.</span><br/>Seu caminho.</h1>
        <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-slate-200">Chega de seguir um roteiro genérico. Tenha aulas de guitarra feitas em torno do que <strong>você quer tocar, entender e desenvolver</strong> — com orientação individual e acompanhamento entre os encontros.</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Action href={waLink(whatsappMessage)}>Quero agendar minha aula inaugural grátis</Action><a href="#como-funciona" className="group inline-flex items-center justify-center rounded-xl border border-white/25 bg-black/45 px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_24px_rgba(0,240,255,.2)] active:translate-y-0">Ver como funciona ↓</a></div>
        <p className="mt-4 text-xs text-slate-400">Acompanhamento individual por R$ 200/mês · Converse comigo pelo WhatsApp</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/35 shadow-2xl">
        <img src="/foto2.jpg" alt="Valkyrja Reis, professora de guitarra" className="max-h-[520px] w-full object-cover object-center"/>
        <div className="p-4 text-xs uppercase tracking-[0.2em] text-slate-300">Aula pensada para a sua trajetória musical</div>
      </div>
    </section>

    <section id="como-funciona" className="mt-20 rounded-3xl border border-white/15 bg-black/65 p-6 backdrop-blur-md sm:p-9">
      <p className="text-xs uppercase tracking-[0.25em] text-neon-cyan">Não é uma aula pronta para todo mundo</p>
      <h2 className="mt-3 text-3xl font-black sm:text-4xl">Um plano de evolução feito para você.</h2>
      <p className="mt-4 max-w-[68ch] leading-relaxed text-slate-300">Quer melhorar improvisação, ritmo, técnica, harmonia, repertório ou entender de vez como aplicar uma ideia musical? A gente direciona o trabalho para os seus objetivos e para os desafios que aparecem enquanto você toca.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <article className="group rounded-2xl border border-neon-cyan/25 bg-black/45 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-neon-cyan/70 hover:bg-black/70 hover:shadow-[0_0_28px_rgba(0,240,255,.12)]"><CyberIcon type="live" /><h3 className="mt-4 text-lg font-bold transition-colors group-hover:text-neon-cyan">1 encontro ao vivo por semana</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Aula individual pelo Google Meet para trabalhar diretamente no que você precisa evoluir, com espaço para perguntas e prática orientada.</p></article>
        <article className="group rounded-2xl border border-neon-magenta/25 bg-black/45 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-neon-magenta/70 hover:bg-black/70 hover:shadow-[0_0_28px_rgba(255,0,127,.12)]"><CyberIcon type="video" /><h3 className="mt-4 text-lg font-bold transition-colors group-hover:text-neon-magenta">Acompanhamento por vídeo</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Você me envia um vídeo do seu treino semanal e eu respondo com outro vídeo, com observações e orientações para seguir praticando.</p></article>
        <article className="group rounded-2xl border border-purple-400/25 bg-black/45 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-purple-300/70 hover:bg-black/70 hover:shadow-[0_0_28px_rgba(168,85,247,.15)]"><CyberIcon type="materials" /><h3 className="mt-4 text-lg font-bold transition-colors group-hover:text-purple-300">Materiais exclusivos</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">PDFs e materiais de aula preparados individualmente, alinhados ao conteúdo que estamos desenvolvendo juntos.</p></article>
        <article className="group rounded-2xl border border-yellow-300/25 bg-black/45 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-yellow-200/70 hover:bg-black/70 hover:shadow-[0_0_28px_rgba(250,204,21,.12)]"><CyberIcon type="direction" /><h3 className="mt-4 text-lg font-bold transition-colors group-hover:text-yellow-200">Direção sem fórmula genérica</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">O conteúdo parte das suas metas, do seu nível e das suas dúvidas reais. A ideia é fazer a música trabalhar a seu favor.</p></article>
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
  return <PageShell video="/video01.mp4">
    <section className="mt-16 text-center sm:mt-24">
      <p className="inline-block rounded-full border border-neon-magenta/40 bg-black/45 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-neon-magenta">Comunidade gratuita · WhatsApp</p>
      <h1 className="neon-title mx-auto mt-7 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">A Arte Suave da <span className="text-neon-magenta">Improvisação</span></h1>
      <p className="mx-auto mt-6 max-w-[62ch] text-lg leading-relaxed text-slate-200">Improvisar não é tocar notas aleatórias. É aprender a ouvir, escolher e contar histórias com a guitarra. Entre para um grupo gratuito para estudar, trocar ideias e desenvolver sua musicalidade junto com outros guitarristas.</p>
      <div className="mt-8"><Action href={groupUrl}>Entrar grátis no grupo do WhatsApp ↗</Action></div>
      <p className="mt-3 text-xs text-slate-400">Gratuito para participar · Entre e acompanhe as próximas aulas ao vivo</p>
    </section>
    <section className="mt-16 grid gap-4 sm:grid-cols-3">
      <article className="group rounded-2xl border border-neon-cyan/25 bg-black/65 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-neon-cyan/70 hover:shadow-[0_0_28px_rgba(0,240,255,.14)]"><CyberIcon type="live" /><h2 className="mt-4 font-bold transition-colors group-hover:text-neon-cyan">Uma aula ao vivo por semana</h2><p className="mt-2 text-sm leading-relaxed text-slate-300">Encontros semanais para estudar ideias de improvisação e levar conceitos direto para o instrumento.</p></article>
      <article className="group rounded-2xl border border-neon-magenta/25 bg-black/65 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-neon-magenta/70 hover:shadow-[0_0_28px_rgba(255,0,127,.14)]"><CyberIcon type="community" /><h2 className="mt-4 font-bold transition-colors group-hover:text-neon-magenta">Troca de ideias sem formalidade</h2><p className="mt-2 text-sm leading-relaxed text-slate-300">Compartilhe dúvidas, referências, descobertas e conversas sobre guitarra com a comunidade.</p></article>
      <article className="group rounded-2xl border border-purple-400/25 bg-black/65 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-purple-300/70 hover:shadow-[0_0_28px_rgba(168,85,247,.15)]"><CyberIcon type="guitar" /><h2 className="mt-4 font-bold transition-colors group-hover:text-purple-300">Mais intenção ao improvisar</h2><p className="mt-2 text-sm leading-relaxed text-slate-300">Explore escalas, frases, ritmo e vocabulário musical com ideias que você pode experimentar tocando.</p></article>
    </section>
    <section className="mt-16 overflow-hidden rounded-3xl border border-white/15 bg-black/60 md:grid md:grid-cols-[.85fr_1.15fr] md:items-center">
      <img src="/foto2.jpg" alt="Valkyrja Reis com sua guitarra" className="h-full max-h-[430px] w-full object-cover object-center"/>
      <div className="p-6 sm:p-9"><p className="text-xs uppercase tracking-[0.25em] text-neon-cyan">Seu próximo passo</p><h2 className="mt-3 text-3xl font-black">Aprenda junto. Pergunte. Experimente. Toque.</h2><p className="mt-4 text-sm leading-relaxed text-slate-300">A proposta é construir um espaço acessível para quem quer se aproximar da improvisação, compartilhar o processo e manter a guitarra presente na semana. Você não precisa chegar sabendo tudo — só precisa ter vontade de participar.</p><div className="mt-6"><Action href={groupUrl}>Quero entrar no grupo gratuito</Action></div><p className="mt-3 text-xs text-slate-500">A Arte Suave da Improvisação · comunidade no WhatsApp</p></div>
    </section>
    <section className="mt-12 text-center"><h2 className="text-2xl font-black">A guitarra fica mais interessante quando a gente troca.</h2><p className="mt-3 text-slate-300">Vem fazer parte da conversa — sua participação é gratuita.</p><div className="mt-6"><Action href={groupUrl}>Entrar agora no WhatsApp ↗</Action></div></section>
  </PageShell>;
}
