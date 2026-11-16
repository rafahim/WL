import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { Icon } from './icon';
import { SiteLogo } from './site-logo';

export function SiteFooter() {
  return (
    <footer className="folio-footer" id="manifesto">
      <div className="folio-container">
        <div className="folio-footer-main">
          <div className="folio-footer-brand">
            <SiteLogo />
            <p>A better way to get lost on the internet. An independent index of good websites, made for the curious.</p>
          </div>
          <div className="folio-footer-column"><span>Discover</span><Link href="/explore/">The index</Link><Link href="/#collections">Curations</Link><Link href="/submit/">Nominate a site</Link></div>
          <div className="folio-footer-column"><span>BD Web List</span><Link href="/about/">Manifesto</Link><Link href="/guidelines/">Guidelines</Link><Link href="/privacy/">Privacy</Link><Link href="/terms/">Terms</Link></div>
        </div>
        <div className="folio-footer-giant" aria-hidden="true">BD WEB LIST</div>
        <div className="folio-footer-bottom">
          <span>© {new Date().getFullYear()} BD Web List. Made for the curious in Bangladesh.</span>
          <span>DISCOVER · EXPLORE · PROMOTE</span>
          <a className="folio-footer-pill" href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hello BD Web List, I have a question.')}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with BD Web List on WhatsApp">
            <span className="pill-live" aria-hidden="true" />
            <span className="pill-label">Chat on WhatsApp</span>
            <span className="pill-arrow" aria-hidden="true"><Icon name="arrow-up-right" size={14} /></span>
          </a>
        </div>
      </div>
    </footer>
  );
}
