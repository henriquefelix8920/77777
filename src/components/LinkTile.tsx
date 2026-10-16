import type { LinkItem } from "../config";

const ACCENTS: Record<LinkItem["accent"], string> = {
  cyan: "#00f0ff",
  magenta: "#ff007f",
  violet: "#7000ff",
  yellow: "#ffee00",
};

function TileIcon({ icon }: { icon: LinkItem["icon"] }) {
  switch (icon) {
    case "live":
      return (
        <span className="flex items-end h-[22px]" aria-hidden="true">
          <i className="eq-bar h-full" />
          <i className="eq-bar h-full" />
          <i className="eq-bar h-full" />
          <i className="eq-bar h-full" />
        </span>
      );
    case "course":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          {/* braço de guitarra + trastes = mapa pentatônico */}
          <path d="M4 3v18" />
          <path d="M8 3v18" />
          <path d="M2 7h10" />
          <path d="M2 12h10" />
          <path d="M2 17h10" />
          <circle cx="16.5" cy="9" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="20" cy="14.5" r="1.6" fill="currentColor" stroke="none" />
          <path d="M14 19c2-1 4.5-1 6 1" />
        </svg>
      );
    case "tiktok":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.7.14 3.2 3.2 0 0 1 .81-2.56 2.8 2.8 0 0 1 2.31-.76V9.02a6.1 6.1 0 0 0-1.26-.1A6.27 6.27 0 0 0 5 18.46a6.14 6.14 0 0 0 9.56-5.1V8.94a8.27 8.27 0 0 0 4.98 1.62V7.1a4.84 4.84 0 0 1 .05-.41z" />
        </svg>
      );
    case "youtube":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.6 7.2a2.73 2.73 0 0 0-1.9-1.93C17.95 4.75 12 4.75 12 4.75s-5.95 0-7.7.52A2.73 2.73 0 0 0 2.4 7.2 28.5 28.5 0 0 0 1.9 12a28.5 28.5 0 0 0 .5 4.8 2.73 2.73 0 0 0 1.9 1.93c1.75.52 7.7.52 7.7.52s5.95 0 7.7-.52a2.73 2.73 0 0 0 1.9-1.93 28.5 28.5 0 0 0 .5-4.8 28.5 28.5 0 0 0-.5-4.8zM9.85 15.13V8.87L15.33 12l-5.48 3.13z" />
        </svg>
      );
  }
}

export default function LinkTile({ item, index }: { item: LinkItem; index: number }) {
  const accent = ACCENTS[item.accent];

  const inner = (
    <>
      <span className="tile-icon">
        <TileIcon icon={item.icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="block truncate text-[15px] font-semibold tracking-wide">
            {item.label}
          </span>
          {item.icon === "live" && (
            <span className="flex items-center gap-1.5 rounded-full border border-neon-magenta/40 bg-neon-magenta/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-neon-magenta">
              <span className="live-dot" aria-hidden="true" />
              live
            </span>
          )}
        </span>
        {item.sub && (
          <span className="mt-0.5 block truncate text-[12.5px] font-light text-slate-400">
            {item.sub}
          </span>
        )}
      </span>
      <svg
        className="shrink-0 text-slate-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {item.external ? (
          <path d="M7 17 17 7M8 7h9v9" />
        ) : (
          <path d="m9 6 6 6-6 6" />
        )}
      </svg>
    </>
  );

  const style = {
    "--tile-accent": accent,
    animationDelay: `${300 + index * 110}ms`,
  } as React.CSSProperties;

  const animClass = "link-tile group anim-tile-in";

  if (item.comingSoon) {
    return (
      <div
        className={`${animClass} is-muted`}
        style={style}
        role="link"
        aria-disabled="true"
        aria-label={`${item.label} — ${item.sub ?? "em breve"}`}
      >
        {inner}
      </div>
    );
  }

  return (
    <a
      href={item.href}
      className={animClass}
      style={style}
      {...(item.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      aria-label={
        item.sub ? `${item.label} — ${item.sub}` : item.label
      }
    >
      {inner}
    </a>
  );
}
