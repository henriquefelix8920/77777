import { useEffect, useRef } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

export function HeroShaderBackground() {
  return (
    <div className="hero-shader-background" aria-hidden="true">
      <MeshGradient
        colors={["#020611", "#073a78", "#087eaa", "#101b54"]}
        distortion={0.72}
        swirl={0.42}
        speed={0.16}
        style={{ width: "100%", height: "100%" }}
      />
      <span className="hero-shader-vignette" />
    </div>
  );
}

export function WireframeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animation = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    };

    const draw = (time: number) => {
      if (!context || !width || !height) return;
      context.clearRect(0, 0, width, height);
      const t = reduceMotion ? 0 : time * 0.00022;
      const cols = Math.max(18, Math.floor(width / 24));
      const rows = Math.max(22, Math.floor(height / 20));
      const horizon = height * 0.25;
      const points: { x: number; y: number; z: number }[][] = [];

      for (let r = 0; r <= rows; r++) {
        const line: { x: number; y: number; z: number }[] = [];
        const depth = r / rows;
        for (let c = 0; c <= cols; c++) {
          const u = c / cols - 0.5;
          const wave = Math.sin(u * 8.5 + t * 2.1 + depth * 4.2) * 0.11
            + Math.cos(u * 4.2 - t * 1.4 + depth * 7) * 0.065;
          const perspective = 0.24 + depth * 1.16;
          line.push({
            x: width * 0.5 + u * width * 1.18 * perspective,
            y: horizon + depth * height * 0.94 + wave * height * (0.3 + depth * 0.7),
            z: depth,
          });
        }
        points.push(line);
      }

      context.lineWidth = 0.7;
      for (let r = 0; r <= rows; r++) {
        const alpha = 0.12 + (r / rows) * 0.42;
        context.strokeStyle = `rgba(82, 174, 255, ${alpha})`;
        context.beginPath();
        points[r].forEach((point, index) => index ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y));
        context.stroke();
      }
      for (let c = 0; c <= cols; c++) {
        context.beginPath();
        for (let r = 0; r <= rows; r++) {
          const point = points[r][c];
          if (r === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }
        context.strokeStyle = "rgba(65, 197, 255, 0.34)";
        context.stroke();
      }

      const glow = context.createRadialGradient(width * 0.52, height * 0.56, 0, width * 0.52, height * 0.56, width * 0.52);
      glow.addColorStop(0, "rgba(0, 136, 255, 0.16)");
      glow.addColorStop(1, "rgba(0, 12, 30, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
    };

    const tick = (time: number) => {
      if (!visible) return;
      draw(time);
      frame = time;
      animation = window.requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduceMotion) animation = window.requestAnimationFrame(tick);
      else window.cancelAnimationFrame(animation);
    }, { threshold: 0.01 });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    return () => {
      window.cancelAnimationFrame(animation);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="story-wireframe-canvas" aria-hidden="true" />;
}
