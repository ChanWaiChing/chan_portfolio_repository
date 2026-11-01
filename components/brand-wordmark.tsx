import Image from "next/image";

/** The supplied compass-star lockup, recolored for the night-sky header. */
export function BrandWordmark() {
  return <a href="#introduction" className="wordmark" aria-label="大穂兄弟のトップ">
    <Image src="/images/brand/oho-brothers-night.webp" alt="大穂兄弟 Oho Brothers" width={816} height={272} priority unoptimized className="block h-auto w-[204px] mix-blend-screen max-[760px]:w-[150px] max-[400px]:w-[124px]" />
  </a>;
}
