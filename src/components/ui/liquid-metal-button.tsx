type LiquidMetalButtonProps = {
  label?: string;
  onClick?: () => void;
  viewMode?: "text" | "icon";
};

export function LiquidMetalButton({
  label = "Get Started",
  onClick,
  viewMode = "text",
}: LiquidMetalButtonProps) {
  return (
    <button type="button" className="tech-glow-button" onClick={onClick}>
      <span className="tech-glow-button-aura" aria-hidden="true" />
      <span className="tech-glow-button-sweep" aria-hidden="true" />
      <span className="tech-glow-button-label">{viewMode === "icon" ? "✦" : label}</span>
      <span className="tech-glow-button-arrow" aria-hidden="true">↗</span>
    </button>
  );
}
