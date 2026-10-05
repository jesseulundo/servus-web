import Image from "next/image";
import horizontal from "../../../public/brand/servus-logo-horizontal.png";
import horizontalDark from "../../../public/brand/servus-logo-horizontal-dark.png";

/**
 * Official logo only (blueprint: never alter geometry or proportions).
 * On dark backgrounds: white wordmark, symbol colors preserved.
 * TODO(brand): replace PNGs with the official SVG masters when available.
 */
export function Logo({ onDark = false, className = "h-9 w-auto", preload = false }: { onDark?: boolean; className?: string; preload?: boolean }) {
  return <Image src={onDark ? horizontalDark : horizontal} alt="ServUS" className={className} preload={preload} sizes="160px" />;
}
