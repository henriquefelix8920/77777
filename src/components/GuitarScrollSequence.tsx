import { useEffect, useRef } from "react";

const GUITAR_VIDEO = "/club-videos/guitarra/video8.mp4";
const VIDEO_FPS = 24;
const SEEK_THRESHOLD = 1 / (VIDEO_FPS * 2);

export default function GuitarScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scrollFrame = 0;
    let videoReady = false;
    let disposed = false;

    const seekToScrollPosition = () => {
      scrollFrame = 0;
      if (
        disposed ||
        !videoReady ||
        !Number.isFinite(video.duration) ||
        video.duration <= 0 ||
        video.seeking
      )
        return;

      const range = section.offsetHeight - window.innerHeight;
      const progress = reduceMotion.matches
        ? 1
        : range > 0
          ? Math.max(
              0,
              Math.min(1, (window.scrollY - section.offsetTop) / range),
            )
          : 0;
      const lastFrameTime = Math.max(0, video.duration - 1 / VIDEO_FPS);
      const targetTime = progress * lastFrameTime;

      if (Math.abs(video.currentTime - targetTime) < SEEK_THRESHOLD) return;
      try {
        video.currentTime = targetTime;
      } catch {
        // The target can briefly be outside the buffered range while loading.
      }
    };

    const scheduleSeek = () => {
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(seekToScrollPosition);
    };

    const onVideoReady = () => {
      videoReady = true;
      scheduleSeek();
    };
    const onSeeked = () => scheduleSeek();
    const onMotionPreferenceChange = () => scheduleSeek();

    video.pause();
    video.addEventListener("loadedmetadata", onVideoReady);
    video.addEventListener("loadeddata", onVideoReady);
    video.addEventListener("seeked", onSeeked);
    window.addEventListener("scroll", scheduleSeek, { passive: true });
    window.addEventListener("resize", scheduleSeek, { passive: true });
    reduceMotion.addEventListener("change", onMotionPreferenceChange);

    let preloadObserver: IntersectionObserver | undefined;
    const preloadVideo = () => {
      video.preload = "auto";
      video.load();
      scheduleSeek();
    };

    if ("IntersectionObserver" in window) {
      preloadObserver = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          preloadVideo();
          preloadObserver?.disconnect();
        },
        { rootMargin: "600px 0px" },
      );
      preloadObserver.observe(section);
    } else {
      preloadVideo();
    }

    return () => {
      disposed = true;
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      preloadObserver?.disconnect();
      video.removeEventListener("loadedmetadata", onVideoReady);
      video.removeEventListener("loadeddata", onVideoReady);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", scheduleSeek);
      window.removeEventListener("resize", scheduleSeek);
      reduceMotion.removeEventListener("change", onMotionPreferenceChange);
      video.pause();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="guitar-scroll-sequence relative z-10"
      aria-label="Vídeo de uma guitarra sendo montada, sincronizado com a rolagem"
    >
      <div className="guitar-scroll-sticky">
        <div className="guitar-scroll-visual" aria-hidden="true">
          <video
            ref={videoRef}
            className="guitar-scroll-video"
            muted
            playsInline
            preload="none"
            tabIndex={-1}
          >
            <source src={GUITAR_VIDEO} type="video/mp4" />
          </video>
          <div className="guitar-scroll-vignette" />
        </div>
      </div>
    </section>
  );
}
