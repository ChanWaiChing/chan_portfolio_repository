import Image from "next/image";

/** Preserve the supplied star and Japanese lettering; render the English line as text. */
export function BrandWordmark({ href = "#introduction" }: { href?: string }) {
  return <a href={href} className="wordmark" aria-label="大穂兄弟のトップ">
    <span className="relative block w-[204px] max-[760px]:w-[150px] max-[400px]:w-[124px]">
      <Image src="/images/brand/oho-brothers-night.webp" alt="大穂兄弟 OHO BROTHERS" width={816} height={272} priority unoptimized className="block h-auto w-full mix-blend-screen" style={{ clipPath: "polygon(0 0,100% 0,100% 72%,34% 72%,34% 100%,0 100%)" }} />
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 816 272" aria-hidden="true" focusable="false">
        <text x="548" y="243" textAnchor="middle" fill="#e0efff" fontFamily={'"Arial Black", "Noto Sans JP Variable", sans-serif'} fontWeight="900" fontSize="52" letterSpacing="5" textLength="450" lengthAdjust="spacingAndGlyphs">OHO BROTHERS</text>
      </svg>
    </span>
  </a>;
}
