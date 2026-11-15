import Link from 'next/link';
import { Icon } from '@/components/icon';

export default function NotFound() {
  return <section className="section not-found"><div className="container"><span className="not-found-code">404</span><h1>Looks like this page<br/>wandered <em>off.</em></h1><p>That page doesn't live here. Let's get you back to something worth discovering.</p><Link href="/" className="button button-dark">Back to homepage <Icon name="arrow-up-right" size={16}/></Link></div></section>;
}
