import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { Icon } from '@/components/icon';

export const metadata: Metadata = pageMetadata({ title: 'Listing guidelines', description: 'Review BD Web List website submission rules and quality standards.', path: '/guidelines/' });

const rules = [
  ['Live and accessible', 'Your website must load reliably and be available to visitors. Websites that are parked, broken, or still under construction may be declined.'],
  ['Secure connection', 'Submit a valid HTTPS address. We may decline websites that trigger browser security warnings or distribute harmful files.'],
  ['Accurate information', 'Use the real website name, a working URL, and an original description. Do not submit misleading claims or keyword-stuffed text.'],
  ['Right category', 'Choose the category that best describes the website. We may adjust the category to keep the directory organised.'],
  ['You have permission', 'You must own the website or have permission from its owner to submit its information, logo, and screenshots.'],
  ['Respectful and lawful content', 'We do not accept phishing, malware, scams, illegal services, deceptive schemes, hate content, or websites that facilitate harm.']
];

export default function GuidelinesPage() {
  return <><section className="page-hero page-hero-soft"><div className="container"><div className="eyebrow"><span className="eyebrow-dot"/> THE QUALITY CHECK</div><h1>Good neighbours<br/>make a better <em>internet.</em></h1><p>These guidelines help us keep BD Web List useful, safe, and worth exploring.</p></div></section><section className="section"><div className="container content-narrow"><div className="guideline-intro"><span className="guideline-icon"><Icon name="shield" size={24}/></span><div><h2>Every listing gets a human review.</h2><p>We may verify the website, check the submitted information, and decline or remove a listing that does not meet these standards.</p></div></div><div className="guideline-list">{rules.map(([title, description], index) => <article className="guideline-item" key={title}><span className="guideline-index">{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div><div className="content-block"><h2>Duplicate and promotional requests</h2><p>One active listing per website or domain is the general rule. If a listing already exists, contact us to request an update instead of submitting another copy.</p><p>Featured and sponsored placements are requests, not guarantees. Any sponsored placement must be clearly labelled. Payment does not override the content or quality review.</p><h2>Updates and removal</h2><p>Website owners can contact us to request corrections or removal. BD Web List may also update or remove listings that become inaccessible, misleading, unsafe, or no longer meet these guidelines.</p><Link href="/submit/" className="button button-dark">Ready to submit? <Icon name="arrow-up-right" size={16}/></Link></div></div></section></>;
}
