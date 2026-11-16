import Link from 'next/link';

export function SiteLogo() {
  return (
    <Link href="/" className="brand" aria-label="BD Web List home">
      <span className="brand-mark brand-mark-svg" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
          <defs>
            <linearGradient id="bw-rim" x1="6" y1="4" x2="58" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c8ff65" /><stop offset=".55" stopColor="#b6a7ff" /><stop offset="1" stopColor="#ff8063" />
            </linearGradient>
            <linearGradient id="bw-b" x1="20" y1="14" x2="44" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e9ffb3" /><stop offset="1" stopColor="#c8ff65" />
            </linearGradient>
          </defs>
          <rect x="1.5" y="1.5" width="61" height="61" rx="19" fill="#0d0d0d" stroke="url(#bw-rim)" strokeWidth="3" />
          <path d="M21 15v34M21 15h13a8.5 8.5 0 0 1 0 17H21m0 0h15a8.5 8.5 0 0 1 0 17H21" stroke="url(#bw-b)" strokeWidth="6.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="48.5" cy="15.5" r="4.6" fill="#ff8063" />
        </svg>
      </span>
      <span className="brand-word">BD<span>WEB</span><em>LIST</em></span>
      <span className="brand-caption">Independent<br />web index</span>
    </Link>
  );
}
