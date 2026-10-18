import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Props = { children: ReactNode; className?: string; href?: string } & AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>;

export function RainbowButton({ children, className = "", href, ...props }: Props) {
  const classes = `rainbow-button ${className}`;
  if (href) return <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</a>;
  return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>;
}
