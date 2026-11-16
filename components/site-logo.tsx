import Link from 'next/link';

export function SiteLogo() {
  return (
    <Link href="/" className="brand" aria-label="BD Web List home">
      <span className="brand-mark brand-mark-photo" aria-hidden="true">
        <img src="/ra-fahim-logo.png" alt="" width="256" height="256" decoding="async" />
      </span>
      <span className="brand-word">BD<span>WEB</span><em>LIST</em></span>
      <span className="brand-caption">Independent<br />web index</span>
    </Link>
  );
}
