import Link from 'next/link';

export function SiteLogo() {
  return <Link href="/" className="brand" aria-label="BD Web List home"><span className="brand-mark" aria-hidden="true"><i /><i /></span><span className="brand-word">BD<span> WEB LIST</span><b>.</b></span></Link>;
}
