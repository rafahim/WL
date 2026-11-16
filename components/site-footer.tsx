import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { Icon } from './icon';
import { SiteLogo } from './site-logo';

export function SiteFooter() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-cta"><div><span className="footer-title">Got a website worth sharing?</span><h3>Let the web <em>discover</em> it.</h3></div><Link href="/submit/" className="button button-accent">Submit a website <Icon name="arrow-up-right" size={15} /></Link></div>
    <div className="footer-main"><div className="footer-brand"><SiteLogo /><p>A little corner of the internet for discovering useful websites and helping great ideas get seen.</p><a className="footer-email" href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hello BD Web List, I have a question.')}`} target="_blank" rel="noopener noreferrer"><Icon name="send" size={16} /> WhatsApp: {siteConfig.whatsappDisplay}</a></div>
      <div className="footer-col"><span className="footer-title">Discover</span><Link href="/explore/">Explore websites</Link><Link href="/#categories">Browse categories</Link><Link href="/submit/">Submit a website</Link></div>
      <div className="footer-col"><span className="footer-title">BD Web List</span><Link href="/about/">About us</Link><Link href="/guidelines/">Listing guidelines</Link><Link href="/privacy/">Privacy policy</Link><Link href="/terms/">Terms of use</Link></div>
    </div>
    <div className="footer-giant" aria-hidden="true">BD WEB LIST</div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} BD Web List. Made for the curious.</span><span className="footer-note"><Icon name="sparkles" size={14} /> A curated web, one discovery at a time.</span><Link href="/ra-fahim/" className="footer-note footer-developer">Developed by <strong>RA Fahim</strong> <Icon name="arrow-up-right" size={12} /></Link><a href="#top" className="to-top" aria-label="Back to top"><Icon name="arrow-up-right" size={14} /></a></div>
  </div></footer>;
}
