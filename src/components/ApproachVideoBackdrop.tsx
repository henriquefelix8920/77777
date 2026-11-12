import { useEffect, useRef } from "react";

const VIDEO_CLIPS = [1, 2, 3, 4, 5, 6].map(
  (number) => `/club-videos/video${number}.mp4`,
);

/** A single decoder rotates through the six optimized project clips. */
export default function ApproachVideoBackdrop() {
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const video = videoRef.current;
    if (!host || !video) return;

    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (
      connection?.saveData ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g"
    ) return;

    let active = false;
    let inView = false;
    let disposed = false;
    let lastClip = -1;
    let swapTimer = 0;
    let cycleTimer = 0;

    const chooseClip = () => {
      let next = Math.floor(Math.random() * VIDEO_CLIPS.length);
      if (next === lastClip) {
        next = (next + 1 + Math.floor(Math.random() * (VIDEO_CLIPS.length - 1))) % VIDEO_CLIPS.length;
      }
      lastClip = next;
      return next;
    };

    const stop = () => {
      active = false;
      window.clearTimeout(swapTimer);
      window.clearTimeout(cycleTimer);
      video.oncanplay = null;
      video.onerror = null;
      video.classList.remove("is-visible");
      video.pause();
      video.removeAttribute("src");
      video.load();
    };

    const showNext = () => {
      if (!active || disposed) return;
      const clip = chooseClip();
      video.classList.remove("is-visible");
      window.clearTimeout(swapTimer);
      swapTimer = window.setTimeout(() => {
        if (!active || disposed) return;
        video.pause();
        video.removeAttribute("src");
        video.load();
        video.src = VIDEO_CLIPS[clip];
        video.oncanplay = () => {
          video.oncanplay = null;
          if (!active || disposed) return;
          void video.play().then(() => {
            if (!active || disposed) {
              video.pause();
              return;
            }
            video.classList.add("is-visible");
            cycleTimer = window.setTimeout(showNext, 2000);
          }).catch(() => {
            cycleTimer = window.setTimeout(showNext, 900);
          });
        };
        video.onerror = () => {
          video.onerror = null;
          cycleTimer = window.setTimeout(showNext, 450);
        };
        video.load();
      }, 280);
    };

    const start = () => {
      if (active || disposed || !inView || document.hidden) return;
      active = true;
      showNext();
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    }, { rootMargin: "100px 0px" });

    observer.observe(host);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div ref={hostRef} className="approach-video-atmosphere" aria-hidden="true">
      <video ref={videoRef} muted playsInline preload="none" tabIndex={-1} />
      <span className="approach-video-colorwash" />
    </div>
  );
}
