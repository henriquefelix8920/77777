import { useEffect, useRef } from "react";

const VIDEO_SRC = "/club-videos/video7.mp4";
const POSTER_SRC = "/club-videos/video7-poster.webp";

/** Opening scene: the clip reveals, scales and drifts with hero scroll. */
export default function HeroScrollVideo() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const video = videoRef.current;
    if (!scene || !video) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const staticMode =
      motionQuery.matches ||
      connection?.saveData === true ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    if (staticMode) {
      scene.dataset.static = "true";
      return;
    }

    let frame = 0;
    let loaded = false;
    let inRange = false;

    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = scene.getBoundingClientRect();
        const viewport = window.innerHeight || 1;
        const progress = Math.max(
          0,
          Math.min(1, (viewport - rect.top) / (viewport + rect.height)),
        );
        const envelope = Math.sin(Math.PI * progress);
        const opacity = 0.12 + envelope * 0.54;
        const scale = 1.13 - progress * 0.13;
        const drift = (0.5 - progress) * 42;

        scene.style.setProperty("--hero-scene-opacity", opacity.toFixed(3));
        scene.style.setProperty("--hero-scene-scale", scale.toFixed(3));
        scene.style.setProperty("--hero-scene-drift", `${drift.toFixed(1)}px`);
        scene.style.setProperty(
          "--hero-scene-reveal",
          (0.84 + envelope * 0.16).toFixed(3),
        );
      });
    };

    const playWhenReady = () => {
      if (!inRange || document.hidden) return;
      void video.play().catch(() => {
        scene.dataset.static = "true";
      });
    };

    const onLoaded = () => {
      scene.classList.add("is-ready");
      playWhenReady();
    };

    const loadVideo = () => {
      if (loaded) return;
      loaded = true;
      video.src = VIDEO_SRC;
      video.load();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        inRange = entry.isIntersecting;
        if (inRange) {
          loadVideo();
          if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            scene.classList.add("is-ready");
            playWhenReady();
          }
        } else {
          video.pause();
        }
        updateScroll();
      },
      { rootMargin: "180px 0px", threshold: 0 },
    );

    video.addEventListener("loadeddata", onLoaded);
    observer.observe(scene);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else playWhenReady();
    };
    document.addEventListener("visibilitychange", onVisibility);
    updateScroll();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      video.removeEventListener("loadeddata", onLoaded);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return (
    <div ref={sceneRef} className="hero-scroll-scene" aria-hidden="true">
      <div className="hero-scroll-scene__frame">
        <img
          className="hero-scroll-scene__poster"
          src={POSTER_SRC}
          alt=""
          decoding="async"
        />
        <video
          ref={videoRef}
          className="hero-scroll-scene__video"
          muted
          playsInline
          loop
          preload="none"
          tabIndex={-1}
        />
      </div>
      <div className="hero-scroll-scene__shade" />
      <span className="hero-scroll-scene__edge" />
    </div>
  );
}
