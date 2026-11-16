import Link from 'next/link';
import { Icon } from './icon';

export function SiteLogo() {
  return (
    <Link href="/" className="brand" aria-label="BD Web List home">
      <span className="brand-mark" aria-hidden="true"><Icon name="sparkles" size={17} /></span>
      <span className="brand-word">BD<span>WEB</span><em>LIST</em></span>
      <span className="brand-caption">Independent<br />web index</span>
    </Link>
  );
}
