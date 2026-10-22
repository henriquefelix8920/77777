import { useEffect, useRef } from "react";

const FRAME_COUNT = 40;
const FRAME_BASE = "/club-videos/guitarra/ezgif-frame-";
const FRAME_PAD = (index: number) => String(index + 1).padStart(3, "0");
const FRAME_URL = (index: number) => `${FRAME_BASE}${FRAME_PAD(index)}.webp`;
const CACHE_RADIUS = 2;
const MAX_CACHED_FRAMES = 6;

export default function GuitarScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!section || !canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const imageCache = new Map<number, HTMLImageElement>();
    let latestFrame = reduceMotion.matches ? FRAME_COUNT - 1 : 0;
    let drawnFrame = -1;
    let scrollFrame = 0;
    let resizeObserver: ResizeObserver | undefined;
    let disposed = false;

    const draw = (index: number) => {
      const image = imageCache.get(index);
      if (!image?.complete || !image.naturalWidth || disposed) return false;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return false;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
      const pixelWidth = Math.round(width * dpr);
      const pixelHeight = Math.round(height * dpr);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const scale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight,
      );
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const offsetY = (height - drawHeight) * 0.56;
      context.drawImage(
        image,
        (width - drawWidth) / 2,
        offsetY,
        drawWidth,
        drawHeight,
      );
      drawnFrame = index;
      return true;
    };

    const trimCache = () => {
      if (imageCache.size <= MAX_CACHED_FRAMES) return;
      const keep = new Set<number>();
      for (
        let offset = -CACHE_RADIUS;
        offset <= CACHE_RADIUS + 1;
        offset += 1
      ) {
        const index = latestFrame + offset;
        if (index >= 0 && index < FRAME_COUNT) keep.add(index);
      }
      const candidates = [...imageCache.entries()]
        .filter(([index]) => !keep.has(index))
        .sort(
          (a, b) => Math.abs(b[0] - latestFrame) - Math.abs(a[0] - latestFrame),
        );
      for (const [index, image] of candidates) {
        if (imageCache.size <= MAX_CACHED_FRAMES) break;
        image.onload = null;
        image.onerror = null;
        if (!image.complete) image.src = "";
        imageCache.delete(index);
      }
    };

    const loadFrame = (index: number) => {
      if (index < 0 || index >= FRAME_COUNT || imageCache.has(index)) return;
      const image = new Image();
      image.decoding = "async";
      imageCache.set(index, image);
      image.onload = () => {
        if (disposed) return;
        if (index === latestFrame) draw(index);
        trimCache();
      };
      image.onerror = () => imageCache.delete(index);
      image.src = FRAME_URL(index);
    };

    const requestNeighborhood = (index: number) => {
      for (
        let offset = -CACHE_RADIUS;
        offset <= CACHE_RADIUS + 1;
        offset += 1
      ) {
        loadFrame(index + offset);
      }
      trimCache();
      const nearestLoaded = [...imageCache.keys()]
        .filter((candidate) => imageCache.get(candidate)?.complete)
        .sort((a, b) => Math.abs(a - index) - Math.abs(b - index))[0];
      if (
        nearestLoaded !== undefined &&
        Math.abs(nearestLoaded - index) <= CACHE_RADIUS &&
        nearestLoaded !== drawnFrame
      ) {
        draw(nearestLoaded);
      }
    };

    const updateFromScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const range = section.offsetHeight - window.innerHeight;
        const progress =
          range > 0
            ? Math.max(
                0,
                Math.min(1, (window.scrollY - section.offsetTop) / range),
              )
            : 0;
        latestFrame = reduceMotion.matches
          ? FRAME_COUNT - 1
          : Math.round(progress * (FRAME_COUNT - 1));
        requestNeighborhood(latestFrame);
      });
    };

    const resizeCanvas = () => {
      if (drawnFrame >= 0) draw(drawnFrame);
      updateFromScroll();
    };

    const startPreload = () => requestNeighborhood(latestFrame);
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        startPreload();
        observer.disconnect();
      },
      { rootMargin: "900px 0px" },
    );
    observer.observe(section);
    loadFrame(latestFrame);
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas, { passive: true });
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(resizeCanvas);
      resizeObserver.observe(canvas);
    }

    const onMotionChange = (event: MediaQueryListEvent) => {
      latestFrame = event.matches ? FRAME_COUNT - 1 : 0;
      requestNeighborhood(latestFrame);
      updateFromScroll();
    };
    reduceMotion.addEventListener("change", onMotionChange);
    updateFromScroll();

    return () => {
      disposed = true;
      cancelAnimationFrame(scrollFrame);
      observer.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", resizeCanvas);
      reduceMotion.removeEventListener("change", onMotionChange);
      imageCache.clear();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="guitar-scroll-sequence relative z-10"
      aria-label="Animação em tela cheia de uma guitarra, sincronizada com a rolagem"
    >
      <div className="guitar-scroll-sticky">
        <div className="guitar-scroll-visual" aria-hidden="true">
          <canvas ref={canvasRef} className="guitar-scroll-canvas" />
          <div className="guitar-scroll-vignette" />
        </div>
      </div>
    </section>
  );
}
