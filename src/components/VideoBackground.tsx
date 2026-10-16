import { useEffect, useRef, useState } from "react";

/**
 * Fundo cinematográfico: video01.mp4 (colocado na pasta /public pelo cliente).
 * - Fallback gráfico neon enquanto o vídeo não existe/carrega;
 * - Zoom lento contínuo (Ken Burns) sobre o vídeo;
 * - Pausa a decodificação quando a aba está oculta (performance/bateria);
 * - prefers-reduced-motion: primeiro frame estático, sem zoom.
 */
export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = () => {
      v.play().catch(() => {
        /* autoplay bloqueado ou arquivo ausente — fallback permanece ativo */
      });
    };

    const onLoaded = () => {
      setVideoReady(true);
      tryPlay();
    };
    const onError = () => setVideoReady(false);

    v.addEventListener("loadeddata", onLoaded);
    v.addEventListener("error", onError);

    const onVisibility = () => {
      if (document.hidden) v.pause();
      else if (videoReady) tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      v.removeEventListener("loadeddata", onLoaded);
      v.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [videoReady]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-void" aria-hidden="true">
      {/* Fallback: palco neon com feixe de luz e silhueta de cordas */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1600ms] ${
          videoReady ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% -10%, rgba(112,0,255,0.35) 0%, rgba(8,10,20,0.9) 55%, #05060d 100%)",
          }}
        />
        {/* feixe cônico de "refletor" */}
        <div
          className="absolute left-1/2 top-0 h-[120vh] w-[130vw] -translate-x-1/2 opacity-40"
          style={{
            background:
              "conic-gradient(from 170deg at 50% -8%, transparent 0deg, rgba(0,240,255,0.14) 12deg, transparent 26deg, rgba(255,0,127,0.12) 40deg, transparent 56deg)",
            filter: "blur(6px)",
          }}
        />
        {/* seis cordas verticais luminosas */}
        <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 gap-[7vw] opacity-50">
          {[0.9, 0.75, 0.6, 0.5, 0.38, 0.26].map((w, i) => (
            <span
              key={i}
              className="h-full rounded-full"
              style={{
                width: `${w}px`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(180deg, transparent, rgba(0,240,255,0.5), transparent)"
                    : "linear-gradient(180deg, transparent, rgba(255,0,127,0.4), transparent)",
              }}
            />
          ))}
        </div>
        {/* poeira/lens flare */}
        <div
          className="absolute left-[18%] top-[22%] h-40 w-40 rounded-full opacity-30 blur-3xl"
          style={{ background: "#ffee00" }}
        />
        <div
          className="absolute right-[12%] top-[58%] h-56 w-56 rounded-full opacity-20 blur-3xl"
          style={{ background: "#7000ff" }}
        />
      </div>

      {/* Vídeo real do guitarrista */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ${
          videoReady ? "opacity-100" : "opacity-0"
        } ${reducedMotion ? "" : "hero-zoom"}`}
        src="/video01.mp4"
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        tabIndex={-1}
      />

      {/* Vinheta cinematográfica + véu para legibilidade dos links */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 50% 40%, transparent 40%, rgba(5,6,13,0.82) 100%), linear-gradient(180deg, rgba(8,10,20,0.55) 0%, rgba(8,10,20,0.25) 38%, rgba(5,6,13,0.88) 100%)",
        }}
      />
      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.04); }
          to   { transform: scale(1.16); }
        }
        .hero-zoom { animation: heroZoom 26s ease-in-out infinite alternate; }
      `}</style>
    </div>
  );
}
