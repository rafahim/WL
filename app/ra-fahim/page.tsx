import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { siteConfig } from '@/lib/config';

const profileUrl = `${siteConfig.url}/ra-fahim/`;
const profileImage = `${siteConfig.url}/ra-fahim-profile.png`;
const description = 'RA Fahim is a web developer and creator who builds modern websites, web applications and e-commerce platforms.';

export const metadata: Metadata = {
  title: 'RA Fahim — Developer & Creator',
  description,
  keywords: [
    'RA Fahim',
    'Web Developer Bangladesh',
    'Web Developer & Creator',
    'Next.js Developer',
    'React Developer',
    'E-commerce Website Developer',
    'Web Application Developer',
    'Digital Product Builder'
  ],
  alternates: { canonical: '/ra-fahim/' },
  openGraph: {
    type: 'profile',
    title: 'RA Fahim — Developer & Creator',
    description,
    url: profileUrl,
    images: [{ url: profileImage, width: 540, height: 540, alt: 'RA Fahim — Developer & Creator' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RA Fahim — Developer & Creator',
    description,
    images: [profileImage]
  },
  robots: { index: true, follow: true }
};

const services = [
  {
    number: '01',
    title: 'Web development',
    description: 'Responsive websites and web applications with a focus on clarity, performance and maintainable structure.',
    icon: 'globe' as const,
    tags: ['Websites', 'Web apps']
  },
  {
    number: '02',
    title: 'E-commerce',
    description: 'Online stores and business platforms that make browsing, checkout and day-to-day management straightforward.',
    icon: 'bag' as const,
    tags: ['Online stores', 'Business platforms']
  },
  {
    number: '03',
    title: 'Product thinking',
    description: 'Turning a practical idea into a complete user experience—from interface details to the systems behind it.',
    icon: 'layers' as const,
    tags: ['User experience', 'Digital products']
  }
];

const socials = [
  { name: 'Facebook', detail: 'Connect on Facebook', href: 'https://www.facebook.com/itsrafahim', mark: 'f' },
  { name: 'Instagram', detail: 'Follow on Instagram', href: 'https://www.instagram.com/itsrafahim', mark: 'ig' },
  { name: 'YouTube', detail: 'Watch on YouTube', href: 'https://www.youtube.com/@itsrafahim', mark: '▶' },
  { name: 'Portfolio', detail: 'Explore my work', href: 'https://rafahim.com', mark: '↗' },
  { name: 'GitHub', detail: 'See my code', href: 'https://github.com/rafahim', mark: 'gh' }
];

export default function RaFahimPage() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${profileUrl}#person`,
    name: 'RA Fahim',
    alternateName: 'rafahim',
    jobTitle: 'Web Developer & Creator',
    description,
    image: profileImage,
    url: profileUrl,
    sameAs: [
      'https://www.facebook.com/itsrafahim',
      'https://www.instagram.com/itsrafahim',
      'https://www.youtube.com/@itsrafahim',
      'https://github.com/rafahim',
      'https://rafahim.com'
    ],
    email: 'mailto:dev@rafahim.com'
  };

  return <div className="rf-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }} />

    <section className="rf-hero">
      <div className="rf-hero-grid" aria-hidden="true" />
      <div className="rf-orbit rf-orbit-one" aria-hidden="true" />
      <div className="rf-orbit rf-orbit-two" aria-hidden="true" />
      <div className="container rf-hero-layout">
        <div className="rf-hero-copy">
          <Link href="/" className="rf-back"><Icon name="arrow-left" size={14} /> Back to BD Web List</Link>
          <div className="rf-pill"><span className="rf-pill-dot" /> Independent digital builder</div>
          <p className="rf-kicker">DEVELOPER <span>•</span> CREATOR</p>
          <h1>RA <em>Fahim</em><span className="rf-title-period">.</span></h1>
          <p className="rf-intro">Web developer and digital product builder focused on clean, practical experiences—from modern websites and web apps to e-commerce platforms and the infrastructure behind them.</p>
          <div className="rf-hero-actions">
            <a className="rf-button rf-button-primary" href="https://rafahim.com" target="_blank" rel="noopener noreferrer">View portfolio <Icon name="arrow-up-right" size={16} /></a>
            <a className="rf-button rf-button-secondary" href="mailto:dev@rafahim.com"><Icon name="mail" size={16} /> Contact me</a>
          </div>
          <div className="rf-hero-signals">
            <span><i /> Thoughtful digital experiences</span>
            <span><i /> Websites, apps &amp; commerce</span>
          </div>
        </div>

        <div className="rf-portrait-stage">
          <div className="rf-portrait-halo" aria-hidden="true" />
          <div className="rf-portrait-ring rf-portrait-ring-a" aria-hidden="true" />
          <div className="rf-portrait-ring rf-portrait-ring-b" aria-hidden="true" />
          <div className="rf-portrait-card">
            <div className="rf-portrait-top"><span /><span /><span /><small>PROFILE / 001</small><b>BD</b></div>
            <div className="rf-portrait-image"><img src="/ra-fahim-profile.png" alt="Portrait of RA Fahim" width="540" height="540" /></div>
            <div className="rf-portrait-meta"><div><strong>RA Fahim</strong><span>Developer • Creator</span></div><span className="rf-portrait-mark"><Icon name="sparkles" size={17} /></span></div>
          </div>
          <div className="rf-float-tag rf-float-top"><span className="rf-float-icon"><Icon name="cpu" size={17} /></span><span><b>Build with purpose</b><small>Thoughtful by design</small></span></div>
          <div className="rf-float-tag rf-float-bottom"><span className="rf-float-icon rf-float-icon-warm"><Icon name="layers" size={17} /></span><span><b>From idea to product</b><small>Websites · Apps · Commerce</small></span></div>
          <div className="rf-stage-index">R / F <span>—</span> 2026</div>
        </div>
      </div>
      <div className="container rf-hero-bottom"><span>DESIGN MINDED. BUILD FOCUSED.</span><span>SCROLL TO EXPLORE <i>↓</i></span></div>
    </section>

    <section className="rf-section rf-about-section">
      <div className="container">
        <div className="rf-section-heading">
          <span className="rf-eyebrow"><i /> A LITTLE ABOUT ME</span>
          <span className="rf-section-index">01 / INTRODUCTION</span>
        </div>
        <div className="rf-about-grid">
          <h2>I build useful things <em>for the web.</em></h2>
          <div className="rf-about-copy">
            <p>I build modern websites, web applications and e-commerce experiences with a focus on polished interfaces, straightforward user flows and dependable systems.</p>
            <p>My approach brings the visible experience and the technology behind it together—so the final product feels clear, useful and considered.</p>
            <a className="rf-text-link" href="https://rafahim.com" target="_blank" rel="noopener noreferrer">Explore my portfolio <Icon name="arrow-up-right" size={15} /></a>
          </div>
        </div>
        <div className="rf-service-grid">
          {services.map((service) => <article className="rf-service-card" key={service.number}>
            <div className="rf-service-top"><span>{service.number}</span><span className="rf-service-icon"><Icon name={service.icon} size={20} /></span></div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="rf-service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="rf-capability-band">
      <div className="container rf-capability-inner">
        <div><span className="rf-eyebrow"><i /> THE WAY I WORK</span><h2>Good digital work lives in the <em>details.</em></h2></div>
        <div className="rf-capability-list">
          <span><Icon name="check" size={15} /> Clear, responsive interfaces</span>
          <span><Icon name="check" size={15} /> Straightforward user journeys</span>
          <span><Icon name="check" size={15} /> Practical systems behind the scenes</span>
          <span><Icon name="check" size={15} /> A considered end-to-end experience</span>
        </div>
      </div>
    </section>

    <section className="rf-section rf-connect-section">
      <div className="container">
        <div className="rf-section-heading">
          <span className="rf-eyebrow"><i /> FIND ME ONLINE</span>
          <span className="rf-section-index">02 / CONNECTIONS</span>
        </div>
        <div className="rf-connect-heading"><h2>Let's connect <em>somewhere.</em></h2><p>Explore my work, follow along or get in touch about a project.</p></div>
        <div className="rf-social-grid">
          {socials.map((social, index) => <a className="rf-social-card" href={social.href} target="_blank" rel="noopener noreferrer" key={social.name}>
            <span className="rf-social-number">0{index + 1}</span>
            <span className="rf-social-mark">{social.mark}</span>
            <span className="rf-social-copy"><strong>{social.name}</strong><small>{social.detail}</small></span>
            <Icon name="arrow-up-right" size={17} className="rf-social-arrow" />
          </a>)}
        </div>
        <div className="rf-contact-strip"><div><span className="rf-eyebrow"><i /> HAVE A PROJECT IN MIND?</span><strong>For collaboration, projects or inquiries.</strong></div><a href="mailto:dev@rafahim.com">dev@rafahim.com <Icon name="arrow-up-right" size={16} /></a></div>
      </div>
    </section>

    <section className="rf-cta-section">
      <div className="container"><div className="rf-cta-card">
        <div className="rf-cta-decoration" aria-hidden="true">RF</div>
        <span className="rf-eyebrow"><i /> START A CONVERSATION</span>
        <h2>Have an idea? Let's <em>build it.</em></h2>
        <p>Reach out to discuss a website, web application, e-commerce platform or a digital product idea.</p>
        <div className="rf-cta-actions"><a className="rf-button rf-button-primary" href="mailto:dev@rafahim.com">Get in touch <Icon name="arrow-up-right" size={16} /></a><a className="rf-cta-portfolio" href="https://rafahim.com" target="_blank" rel="noopener noreferrer">Visit rafahim.com <Icon name="external" size={14} /></a></div>
      </div></div>
    </section>

    <div className="container rf-page-end"><Link href="/" className="rf-back"><Icon name="arrow-left" size={14} /> Return to BD Web List</Link><span>RA FAHIM <i>•</i> DEVELOPER &amp; CREATOR</span></div>
  </div>;
}
