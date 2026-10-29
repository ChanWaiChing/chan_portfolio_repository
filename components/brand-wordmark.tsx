/** Two independent brush strokes meeting in one team. */
export function BrandWordmark() {
  return <a href="#introduction" className="wordmark" aria-label="大穂兄弟のトップ">
    <svg className="brand-symbol" viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <defs><linearGradient id="brand-ocean" x1="11" y1="45" x2="40" y2="12" gradientUnits="userSpaceOnUse"><stop stopColor="#68c8d6"/><stop offset="1" stopColor="#8d83dc"/></linearGradient><linearGradient id="brand-sunset" x1="25" y1="46" x2="49" y2="17" gradientUnits="userSpaceOnUse"><stop stopColor="#f4bc88"/><stop offset="1" stopColor="#e69ab2"/></linearGradient></defs>
      <rect x="2" y="2" width="56" height="56" rx="16" fill="#243b50"/>
      <path d="M10 44C17 40 18 15 26 13C32 12 31 37 39 38C44 39 47 27 50 19C48 34 44 47 36 45C27 43 29 23 25 22C21 24 20 43 10 44Z" fill="url(#brand-ocean)"/>
      <path d="M18 48C25 42 31 18 39 16C45 15 45 30 51 32C46 37 41 32 40 25C35 27 29 47 18 48Z" fill="url(#brand-sunset)"/>
      <path d="m31 29 3 3-3 3-3-3Z" fill="#f3f4ef"/>
    </svg>
    <span className="brand-name">大穂兄弟<span>デザインと開発</span></span>
  </a>;
}
