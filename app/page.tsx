import Link from 'next/link';
import { Icon } from '@/components/icon';
import { WebsiteCard } from '@/components/website-card';
import { CategoryCard } from '@/components/category-card';
import { categories, websites } from '@/lib/data';
import { siteConfig } from '@/lib/config';

export default function HomePage() {
  const liveCount = websites.filter((website) => !website.demo).length;
  const pad = (value: number) => String(value).padStart(2, '0');
  const homeListings = websites.slice(0, 6);
  const activeCategories = categories.filter((category) => websites.some((site) => site.category === category.name));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'BD Web List — Discover Exceptional Websites',
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
    publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: websites.filter((website) => !website.demo).length,
      itemListElement: websites.filter((website) => !website.demo).map((website, index) => ({
        '@type': 'ListItem', position: index + 1, name: website.name,
        url: `${siteConfig.url}/websites/${website.slug}/`, description: website.seoDescription
      }))
    }
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

    <section className="masthead">
      <div className="masthead-grain" aria-hidden="true" />
      <div className="container masthead-inner">
        <div className="masthead-meta">
          <span><i className="status-pip" /> THE INDEPENDENT WEBSITE INDEX</span>
          <span>VOL. 01 <b>·</b> MADE FOR THE CURIOUS</span>
        </div>
        <div className="masthead-grid">
          <div className="masthead-copy">
            <div className="masthead-kicker"><span>01</span> FIND SOMETHING GOOD TODAY</div>
            <h1>The web is wide.<br /><em>Find your corner.</em></h1>
            <p className="masthead-description">A considered collection of websites worth opening. Discover useful digital products, independent makers, online stores and ideas from Bangladesh and beyond.</p>
            <div className="masthead-actions">
              <Link href="/explore/" className="button button-accent">Explore the index <Icon name="arrow-up-right" size={17} /></Link>
              <Link href="/submit/" className="button button-quiet-light">Put your website on the list <Icon name="arrow-right" size={16} /></Link>
            </div>
            <div className="masthead-foot">
              <div className="masthead-count"><strong>{pad(liveCount)}</strong><span>CURATED<br />WEBSITES</span></div>
              <div className="masthead-foot-rule" />
              <p>Small list. Real discoveries.<br /><b>Every listing gets its own page.</b></p>
            </div>
          </div>

          <div className="masthead-art" aria-label="A visual preview of websites listed on BD Web List">
            <div className="art-backdrop-grid" />
            <div className="art-stamp stamp-index"><small>BD / WEB LIST</small><strong>THE<br /><em>INDEX</em></strong><span>DISCOVER WHAT'S OUT THERE</span></div>
            <div className="art-card art-card-main">
              <div className="art-card-browser"><span /><span /><span /><small>wishly.bd</small><Icon name="arrow-up-right" size={13} /></div>
              <div className="art-card-main-inner">
                <span className="art-overline">A LITTLE MORE PERSONAL</span>
                <div className="art-big-type">Make<br /><i>moments</i><br />matter<span>.</span></div>
                <div className="art-sun" />
                <div className="art-loop loop-one" /><div className="art-loop loop-two" />
                <div className="art-main-bottom"><b>W</b><span>WISHLY BD<small>PERSONAL WISH WEBSITES</small></span><Icon name="arrow-up-right" size={15} /></div>
              </div>
            </div>
            <div className="art-float art-float-top"><span className="art-float-mark">RA</span><span><b>RA Fahim</b><small>PORTFOLIO / 02</small></span><Icon name="arrow-up-right" size={14} /></div>
            <div className="art-float art-float-bottom"><span className="art-float-mark art-mark-blue">S</span><span><b>SITES.BD</b><small>DOMAINS & HOSTING / 03</small></span><Icon name="arrow-up-right" size={14} /></div>
            <div className="art-side-note">A SHORTCUT TO<br />SOMETHING BETTER <span>↗</span></div>
            <div className="art-number">{pad(liveCount)}<span>/{pad(liveCount)}</span></div>
          </div>
        </div>
        <div className="masthead-bottomline"><span>GOOD WEBSITES ARE STILL OUT THERE.</span><span>SCROLL TO DISCOVER <b>↓</b></span></div>
      </div>
    </section>

    <section className="signal-strip" aria-label="Directory values">
      <div className="signal-track"><span>CURATED, NOT CROWDED</span><i>✳</i><span>BUILT FOR DISCOVERY</span><i>✳</i><span>INDEPENDENT WEB</span><i>✳</i><span>MADE TO BE FOUND</span><i>✳</i><span>CURATED, NOT CROWDED</span><i>✳</i><span>BUILT FOR DISCOVERY</span><i>✳</i><span>INDEPENDENT WEB</span><i>✳</i><span>MADE TO BE FOUND</span><i>✳</i></div>
    </section>

    <section className="section listing-section" id="directory">
      <div className="container">
        <div className="section-index-row"><span>01 / THE DIRECTORY</span><span>{pad(websites.length)} SELECTED LISTINGS</span></div>
        <div className="editorial-heading">
          <div><p className="eyebrow"><span className="eyebrow-dot" /> OPEN A NEW TAB</p><h2>Good finds, <em>in good company.</em></h2></div>
          <div className="editorial-heading-side"><p>{homeListings.length} starting points for your next idea, project, purchase or deep-dive. Each listing has its own story and details.</p><Link href="/explore/" className="text-link">View the full index <Icon name="arrow-up-right" size={16} /></Link></div>
        </div>
        <div className="website-grid website-grid-editorial">
          {homeListings.map((website) => <WebsiteCard website={website} key={website.slug} />)}
        </div>
        <div className="listings-endnote"><span><b>↳</b> SHOWING {pad(homeListings.length)} OF {pad(websites.length)} LISTINGS.</span><Link href="/explore/">View all listings <Icon name="arrow-up-right" size={14} /></Link><Link href="/submit/">Add a discovery <Icon name="arrow-up-right" size={14} /></Link></div>
      </div>
    </section>

    <section className="category-section" id="categories">
      <div className="container category-section-inner">
        <div className="category-intro"><p className="eyebrow eyebrow-dark"><span className="eyebrow-dot" /> 02 / BROWSE BY INTEREST</p><h2>Where would<br />you like to <em>wander?</em></h2><p>Start with a subject. We'll take it from there.</p><Link href="/explore/" className="category-all-link">All categories <Icon name="arrow-up-right" size={15} /></Link></div>
        <div className="category-grid category-grid-editorial">
          {activeCategories.map((category) => <CategoryCard key={category.name} category={category} count={websites.filter((site) => site.category === category.name).length} />)}
        </div>
      </div>
    </section>

    <section className="how-section">
      <div className="container how-section-grid">
        <div className="how-visual"><span className="how-visual-top">THE BD WEB LIST METHOD</span><div className="how-big-word">Find<span>.</span><br /><em>Follow.</em><br />Share<span>.</span></div><div className="how-visual-mark">BD<span>↗</span></div><div className="how-visual-bottom">A BETTER WAY THROUGH THE WEB</div></div>
        <div className="how-content"><p className="eyebrow"><span className="eyebrow-dot" /> 03 / HOW IT WORKS</p><h2>Less noise.<br /><em>More signal.</em></h2><p className="how-intro">BD Web List is built to make discovering websites feel simple and intentional. No endless feeds. Just useful places on the web, with enough context to decide where to go next.</p>
          <div className="how-steps"><div><span>01</span><section><h3>Browse with curiosity</h3><p>Explore the directory by topic, keyword or category.</p></section><Icon name="compass" size={19} /></div><div><span>02</span><section><h3>Know before you go</h3><p>Every listing has a dedicated page with useful information and a direct website link.</p></section><Icon name="layers" size={19} /></div><div><span>03</span><section><h3>Share what you make</h3><p>Send your website for a manual review. Approved listings join the directory.</p></section><Icon name="send" size={19} /></div></div>
          <Link href="/about/" className="text-link">More about BD Web List <Icon name="arrow-up-right" size={16} /></Link>
        </div>
      </div>
    </section>

    <section className="submit-band">
      <div className="container submit-band-inner"><div className="submit-band-noise" /><div className="submit-band-top"><span>04 / YOUR TURN</span><span>THE NEXT DISCOVERY COULD BE YOURS</span></div><div className="submit-band-copy"><p className="eyebrow eyebrow-light"><span className="eyebrow-pulse" /> BUILT SOMETHING WORTH FINDING?</p><h2>Give your website<br /><em>a place to be seen.</em></h2><p>Send us your website. We'll review the details and, if it's a fit, give it a proper place in the index.</p><Link href="/submit/" className="button button-paper">Submit your website <Icon name="arrow-up-right" size={17} /></Link></div><div className="submit-band-seal">BD<br /><span>WEB<br />LIST</span><i>✳</i></div><div className="submit-band-bottom"><span>FREE TO SUBMIT</span><span>HUMAN REVIEWED</span><span>NO ACCOUNT NEEDED</span></div></div>
    </section>
  </>;
}
