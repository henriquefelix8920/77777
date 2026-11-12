import type { MouseEvent } from "react";
type LiquidMetalButtonProps={label?:string;onClick?:()=>void;viewMode?:"text"|"icon"};
export function LiquidMetalButton({label="Get Started",onClick,viewMode="text"}:LiquidMetalButtonProps){
 const handleClick=(_event:MouseEvent<HTMLButtonElement>)=>onClick?.();
 return <span className="liquid-metal-wrap"><button type="button" className="liquid-metal-button" onClick={handleClick} aria-label={viewMode==="icon"?label:undefined}>{viewMode==="icon"?"✦":label}</button></span>;
}