import type { MouseEvent } from "react";

type LiquidMetalButtonProps = { label?: string; onClick?: () => void; viewMode?: "text" | "icon" };

export function LiquidMetalButton({ label = "Get Started", onClick, viewMode = "text" }: LiquidMetalButtonProps) {
  const handleClick = (_event: MouseEvent<HTMLButtonElement>) => onClick?.();
  return (
    <button type="button" className="shiny-cta" onClick={handleClick}>
      <span className="shiny-cta-glow" aria-hidden="true" />
      <span className="shiny-cta-label">{viewMode === "icon" ? "✦" : label}</span>
      <span className="shiny-cta-arrow" aria-hidden="true">↗</span>
    </button>
  );
}
