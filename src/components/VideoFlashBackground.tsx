import { useEffect, useRef } from "react";

const CLIPS = [1, 2, 3, 4, 5, 6].map(
  (number) => `/club-videos/video${number}.mp4`,
);
const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

/** One muted decoder at a time; random source, seek, crop, flash and rest interval. */
export default function VideoFlashBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const flash = flashRef.current;
    if (!video || !flash) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (
      reduceMotion ||
      connection?.saveData ||
      connection?.effectiveType === "slow-2g"
    )
      return;

    let timer = 0;
    let flashTimer = 0;
    let visible = !document.hidden;
    let lastClip = -1;
    let cancelled = false;

    const schedule = (delay: number) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(showFlash, delay);
    };
    const hideFlash = () => {
      flash.classList.remove("is-flashing");
      video.classList.remove("is-flashing");
      video.pause();
    };
    const showFlash = () => {
      if (cancelled || !visible) return;
      let index = Math.floor(Math.random() * CLIPS.length);
      if (CLIPS.length > 1 && index === lastClip)
        index =
          (index + 1 + Math.floor(Math.random() * (CLIPS.length - 1))) %
          CLIPS.length;
      lastClip = index;
      const nextSrc = new URL(CLIPS[index], window.location.href).href;
      if (video.src !== nextSrc) video.src = nextSrc;
      video.onloadedmetadata = () => {
        if (cancelled || !visible) return;
        const duration = Number.isFinite(video.duration) ? video.duration : 0;
        const maxStart = Math.max(0, duration - 3);
        try {
          video.currentTime = randomBetween(0, maxStart);
        } catch {
          /* metadata/seek not ready */
        }
        video.style.objectPosition = `${randomBetween(0, 100)}% ${randomBetween(0, 100)}%`;
        flash.style.setProperty(
          "--flash-tint",
          Math.random() > 0.5 ? "rgba(0,240,255,.22)" : "rgba(255,0,127,.2)",
        );
        video
          .play()
          .then(() => {
            flash.classList.add("is-flashing");
            video.classList.add("is-flashing");
            flashTimer = window.setTimeout(() => {
              hideFlash();
              if (visible && !cancelled) schedule(randomBetween(350, 1100));
            }, 3000);
          })
          .catch(() => schedule(1800));
      };
      video.onerror = () => schedule(2200);
      video.load();
    };

    const onVisibility = () => {
      visible = !document.hidden;
      if (!visible) {
        window.clearTimeout(timer);
        window.clearTimeout(flashTimer);
        hideFlash();
      } else {
        schedule(250);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    schedule(700);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.clearTimeout(flashTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return (
    <div className="club-background" aria-hidden="true">
      <div className="club-atmosphere" />
      <video
        ref={videoRef}
        className="club-video"
        muted
        playsInline
        preload="none"
        tabIndex={-1}
      />
      <div ref={flashRef} className="club-flash">
        <span />
      </div>
      <div className="club-vignette" />
      <div className="matrix-rain" />
    </div>
  );
}
