import { useEffect, useRef } from "react";

const CLIPS = [1, 2, 3, 4, 5, 6].map(
  (number) => `/club-videos/video${number}.mp4`,
);
const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

type PreparedClip = { player: number; clip: number };

/** Two alternating decoders keep full-screen video continuous between 3s flashes. */
export default function VideoFlashBackground() {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([null, null]);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const players = videoRefs.current;
    const flash = flashRef.current;
    if (!players[0] || !players[1] || !flash) return;

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
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g"
    )
      return;

    let activePlayer = -1;
    let lastClip = -1;
    let timer = 0;
    let fadeTimer = 0;
    let preloadTimer = 0;
    let startTimer = 0;
    let generation = 0;
    let visible = !document.hidden;
    let cancelled = false;
    let nextPrepared: Promise<PreparedClip | null> | null = null;
    const cancelWaiters = new Set<() => void>();

    const chooseClip = () => {
      let clip = Math.floor(Math.random() * CLIPS.length);
      if (clip === lastClip)
        clip =
          (clip + 1 + Math.floor(Math.random() * (CLIPS.length - 1))) %
          CLIPS.length;
      lastClip = clip;
      return clip;
    };

    const waitForPlayable = (
      video: HTMLVideoElement,
      src: string,
      token: number,
    ) =>
      new Promise<boolean>((resolve) => {
        let settled = false;
        let timeout = 0;
        const finish = (ready: boolean) => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timeout);
          video.removeEventListener("loadedmetadata", onReadyState);
          video.removeEventListener("loadeddata", onReadyState);
          video.removeEventListener("canplay", onReadyState);
          video.removeEventListener("seeked", onReadyState);
          video.removeEventListener("error", onError);
          cancelWaiters.delete(cancel);
          resolve(ready && !cancelled && token === generation);
        };
        const onReadyState = () => {
          if (
            video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
            !video.seeking
          )
            finish(true);
        };
        const onError = () => finish(false);
        const cancel = () => finish(false);
        cancelWaiters.add(cancel);
        video.addEventListener("loadedmetadata", onReadyState);
        video.addEventListener("loadeddata", onReadyState);
        video.addEventListener("canplay", onReadyState);
        video.addEventListener("seeked", onReadyState);
        video.addEventListener("error", onError);
        timeout = window.setTimeout(() => finish(false), 7000);
        video.src = new URL(src, window.location.href).href;
        video.load();
        video.addEventListener(
          "loadedmetadata",
          () => {
            if (settled || token !== generation) return;
            const latestStart = Math.max(0, video.duration - 3);
            try {
              video.currentTime = randomBetween(0, latestStart);
            } catch {
              onReadyState();
            }
          },
          { once: true },
        );
      });

    const prepare = async (
      player: number,
      token: number,
    ): Promise<PreparedClip | null> => {
      const video = players[player];
      if (!video || cancelled || !visible || token !== generation) return null;
      video.pause();
      video.classList.remove("is-flashing");
      video.removeAttribute("src");
      video.load();
      video.style.objectPosition = `${randomBetween(0, 100)}% ${randomBetween(0, 100)}%`;
      const clip = chooseClip();
      const ready = await waitForPlayable(video, CLIPS[clip], token);
      if (!ready || !visible || token !== generation) return null;
      return { player, clip };
    };

    const activate = async (
      prepared: PreparedClip,
      token: number,
    ): Promise<boolean> => {
      const incoming = players[prepared.player];
      if (!incoming || cancelled || !visible || token !== generation)
        return false;
      try {
        await incoming.play();
      } catch {
        return false;
      }
      if (cancelled || !visible || token !== generation) {
        incoming.pause();
        return false;
      }
      const outgoing = activePlayer >= 0 ? players[activePlayer] : null;
      flash.style.setProperty(
        "--flash-tint",
        Math.random() > 0.5 ? "rgba(0,240,255,.16)" : "rgba(255,0,127,.16)",
      );
      flash.classList.add("is-flashing");
      incoming.classList.add("is-flashing");
      activePlayer = prepared.player;
      if (outgoing && outgoing !== incoming) {
        fadeTimer = window.setTimeout(() => {
          outgoing.classList.remove("is-flashing");
          outgoing.pause();
        }, 140);
      }
      return true;
    };

    const scheduleAdvance = (delay: number, token: number) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => void advance(token), delay);
    };

    const advance = async (token: number) => {
      if (cancelled || !visible || token !== generation || activePlayer < 0)
        return;
      const inactivePlayer = 1 - activePlayer;
      const prepared = await (nextPrepared ?? prepare(inactivePlayer, token));
      nextPrepared = null;
      if (cancelled || !visible || token !== generation) return;
      if (!prepared) {
        nextPrepared = prepare(inactivePlayer, token);
        scheduleAdvance(180, token);
        return;
      }
      const switched = await activate(prepared, token);
      if (!switched) {
        nextPrepared = prepare(inactivePlayer, token);
        scheduleAdvance(180, token);
        return;
      }
      preloadTimer = window.setTimeout(() => {
        if (!cancelled && visible && token === generation)
          nextPrepared = prepare(1 - activePlayer, token);
      }, 160);
      scheduleAdvance(3000, token);
    };

    const start = async () => {
      if (cancelled || !visible) return;
      const token = ++generation;
      const prepared = await prepare(0, token);
      if (!prepared || cancelled || !visible || token !== generation) {
        if (!cancelled && visible && token === generation)
          timer = window.setTimeout(() => void start(), 500);
        return;
      }
      const started = await activate(prepared, token);
      if (!started) {
        timer = window.setTimeout(() => void start(), 500);
        return;
      }
      nextPrepared = prepare(1, token);
      scheduleAdvance(3000, token);
    };

    const scheduleStart = () => {
      window.clearTimeout(startTimer);
      startTimer = window.setTimeout(() => {
        startTimer = 0;
        if (!cancelled && visible) void start();
      }, 650);
    };

    const onVisibility = () => {
      visible = !document.hidden;
      window.clearTimeout(timer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(preloadTimer);
      window.clearTimeout(startTimer);
      generation++;
      cancelWaiters.forEach((cancel) => cancel());
      if (!visible) {
        flash.classList.remove("is-flashing");
        players.forEach((video) => {
          if (!video) return;
          video.pause();
          video.classList.remove("is-flashing");
          video.removeAttribute("src");
          video.load();
        });
        activePlayer = -1;
        nextPrepared = null;
      } else {
        nextPrepared = null;
        scheduleStart();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    if (visible) scheduleStart();
    return () => {
      cancelled = true;
      generation++;
      window.clearTimeout(timer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(preloadTimer);
      window.clearTimeout(startTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelWaiters.forEach((cancel) => cancel());
      flash.classList.remove("is-flashing");
      players.forEach((video) => {
        if (!video) return;
        video.pause();
        video.removeAttribute("src");
        video.load();
      });
    };
  }, []);

  return (
    <div className="club-background" aria-hidden="true">
      <div className="club-atmosphere" />
      <video
        ref={(node) => {
          videoRefs.current[0] = node;
        }}
        className="club-video"
        muted
        playsInline
        preload="none"
        tabIndex={-1}
      />
      <video
        ref={(node) => {
          videoRefs.current[1] = node;
        }}
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
