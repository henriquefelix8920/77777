import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { useEffect, useRef } from "react";

type LiquidMetalButtonProps = { label?: string; onClick?: () => void; viewMode?: "text" | "icon" };

export function LiquidMetalButton({ label = "Get Started", onClick, viewMode = "text" }: LiquidMetalButtonProps) {
  const shaderRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<{ destroy?: () => void; setSpeed?: (speed: number) => void } | null>(null);
  useEffect(() => {
    if (!shaderRef.current) return;
    try {
      mountRef.current = new ShaderMount(shaderRef.current, liquidMetalFragmentShader, {
        u_repetition: 4, u_softness: .5, u_shiftRed: .3, u_shiftBlue: .3,
        u_distortion: 0, u_contour: 0, u_angle: 45, u_scale: 8,
        u_shape: 1, u_offsetX: .1, u_offsetY: -.1
      }, undefined, .6);
    } catch (error) { console.error("Liquid metal shader unavailable", error); }
    return () => { mountRef.current?.destroy?.(); mountRef.current = null; };
  }, []);
  return <span className="liquid-metal-wrap">
    <span className="liquid-metal-canvas" ref={shaderRef} aria-hidden="true" />
    <button type="button" className="liquid-metal-button" onMouseEnter={() => mountRef.current?.setSpeed?.(1)} onMouseLeave={() => mountRef.current?.setSpeed?.(.6)} onClick={() => { mountRef.current?.setSpeed?.(2.4); onClick?.(); }}>
      {viewMode === "icon" ? "✦" : label}
    </button>
  </span>;
}