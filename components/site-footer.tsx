import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { Icon } from './icon';
import { SiteLogo } from './site-logo';

export function SiteFooter() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-main"><div className="footer-brand"><SiteLogo /><p>A little corner of the internet for discovering useful websites and helping great ideas get seen.</p>{siteConfig.contactEmail ? <a className="footer-email" href={`mailto:${siteConfig.contactEmail}`}><Icon name="mail" size={16} /> {siteConfig.contactEmail}</a> : <Link className="footer-email" href="/submit/"><Icon name="send" size={16} /> Send a listing request</Link>}</div>
      <div className="footer-col"><span className="footer-title">Discover</span><Link href="/explore/">Explore websites</Link><Link href="/#categories">Browse categories</Link><Link href="/submit/">Submit a website</Link></div>
      <div className="footer-col"><span className="footer-title">BD Web List</span><Link href="/about/">About us</Link><Link href="/guidelines/">Listing guidelines</Link><Link href="/privacy/">Privacy policy</Link><Link href="/terms/">Terms of use</Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} BD Web List. Made for the curious.</span><span className="footer-note"><Icon name="sparkles" size={14} /> A curated web, one discovery at a time.</span></div>
  </div></footer>;
}
