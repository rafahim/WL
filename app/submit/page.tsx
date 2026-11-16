import type { Metadata } from 'next';
import Link from 'next/link';
import { RequestForm } from '@/components/request-form';
import { Icon } from '@/components/icon';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ title: 'Submit Your Website — Get Discovered', description: 'Suggest your website for a manual review and possible listing in the BD Web List website directory.', path: '/submit/', ogTitle: 'Submit Your Website | BD Web List' });

export default function SubmitPage() {
  return <><section className="page-hero page-hero-submit"><div className="container"><div className="eyebrow"><span className="eyebrow-dot"/> YOUR WORK, OUT IN THE WORLD</div><h1>Let's put your website<br/>on the <em>map.</em></h1><p>Tell us what you've made. We'll take a look, and if it's a good fit, help more people discover it.</p><div className="submit-hero-points"><span><Icon name="check" size={15}/> Free to submit</span><span><Icon name="check" size={15}/> Human-reviewed</span><span><Icon name="check" size={15}/> No account needed</span></div></div></section>
    <section className="section submit-section"><div className="container submit-layout"><div className="submit-sidebar"><div className="submit-side-card"><span className="side-card-icon"><Icon name="shield" size={22}/></span><h3>Before you submit</h3><p>We want the directory to be genuinely useful, so every website is checked by a person before it goes live.</p><ul><li><Icon name="check" size={15}/> Your website should be live and accessible.</li><li><Icon name="check" size={15}/> Use a secure HTTPS address.</li><li><Icon name="check" size={15}/> Submit original, accurate information.</li><li><Icon name="check" size={15}/> Follow our content and quality rules.</li></ul><Link href="/guidelines/" className="text-link">Read all listing guidelines <Icon name="arrow-right" size={15}/></Link></div><div className="submit-side-note"><Icon name="send" size={18}/><div><strong>What happens next?</strong><p>Your completed details open in WhatsApp. Review the message and tap Send. We'll reply to you there after reviewing your website.</p></div></div></div>
      <div className="submit-form-panel"><div className="form-panel-heading"><span className="form-kicker">LISTING REQUEST</span><h2>Tell us about your <em>website.</em></h2><p>Complete the form, then review and send your details in WhatsApp.</p></div><RequestForm/></div>
    </div></section></>;
}
