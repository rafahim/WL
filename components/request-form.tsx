'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Icon } from './icon';
import { categories } from '@/lib/data';
import { siteConfig } from '@/lib/config';

type FormStatus = { type: 'info' | 'error'; message: string; whatsappUrl?: string } | null;

export function RequestForm() {
  const [status, setStatus] = useState<FormStatus>(null);
  const [promo, setPromo] = useState('Free listing');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const value = (key: string) => String(formData.get(key) || '').trim();

    // Basic honeypot: ignore automated submissions without opening WhatsApp.
    if (value('companyFax')) {
      setStatus({ type: 'error', message: 'We could not process this request. Please try again.' });
      return;
    }

    const website = value('website');
    try {
      const parsed = new URL(website);
      if (parsed.protocol !== 'https:') throw new Error('https');
    } catch {
      setStatus({ type: 'error', message: 'Please enter a valid HTTPS website URL (for example, https://your-website.com).' });
      return;
    }

    for (const [label, field] of [['Logo image URL', 'logoUrl'], ['Screenshot URL', 'screenshotUrl'], ['Social or contact link', 'contactLink']]) {
      const link = value(field);
      if (!link) continue;
      try {
        if (new URL(link).protocol !== 'https:') throw new Error('https');
      } catch {
        setStatus({ type: 'error', message: `${label} must be a valid HTTPS URL.` });
        return;
      }
    }

    const lines = [
      '*BD WEB LIST — NEW WEBSITE SUBMISSION*',
      '',
      '*01 · WEBSITE DETAILS*',
      `Website name: ${value('name')}`,
      `Website URL: ${website}`,
      `Category: ${value('category')}`,
      `Tagline: ${value('tagline')}`,
      `Description: ${value('description')}`,
      `Logo image URL: ${value('logoUrl') || 'Not provided'}`,
      `Screenshot URL: ${value('screenshotUrl') || 'Not provided'}`,
      '',
      '*02 · SUBMITTER CONTACT DETAILS*',
      `Name: ${value('ownerName')}`,
      `Email: ${value('email')}`,
      `Social/contact link: ${value('contactLink') || 'Not provided'}`,
      '',
      '*03 · PLACEMENT REQUEST*',
      `Request type: ${value('promotionType') || 'Free listing'}`,
      `Guidelines confirmed: ${value('agreeToGuidelines') === 'yes' ? 'Yes' : 'No'}`,
      '',
      `Sent from: ${siteConfig.url}/submit/`
    ];

    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    setStatus({
      type: 'info',
      message: 'WhatsApp is ready with your completed form details. Review the message and tap Send in WhatsApp to submit your request.',
      whatsappUrl
    });

    // Opening a chat is user-initiated. WhatsApp requires the visitor to press Send.
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  return <form className="request-form" onSubmit={handleSubmit}>
    <div className="form-section"><div className="form-section-title"><span>01</span><div><h3>Website details</h3><p>Tell us what you have built.</p></div></div>
      <div className="form-grid">
        <label className="form-field"><span>Website name <b>*</b></span><input name="name" required maxLength={80} placeholder="e.g. Northstar Studio" /></label>
        <label className="form-field"><span>Website URL <b>*</b></span><input name="website" type="url" required maxLength={300} placeholder="https://yourwebsite.com" /></label>
        <label className="form-field"><span>Category <b>*</b></span><select name="category" required defaultValue=""><option value="" disabled>Select a category</option>{categories.map((item) => <option value={item.name} key={item.name}>{item.name}</option>)}</select></label>
        <label className="form-field"><span>Short tagline <b>*</b></span><input name="tagline" required maxLength={120} placeholder="What makes your website special?" /></label>
        <label className="form-field form-full"><span>Website description <b>*</b></span><textarea name="description" required minLength={40} maxLength={1200} rows={5} placeholder="Describe your website, what it offers, and who it is for..." /><small>40–1,200 characters. Please use original, clear wording.</small></label>
        <label className="form-field"><span>Logo image URL</span><input name="logoUrl" type="url" maxLength={500} placeholder="https://.../logo.png" /><small>Optional — a publicly accessible image link.</small></label>
        <label className="form-field"><span>Screenshot URL</span><input name="screenshotUrl" type="url" maxLength={500} placeholder="https://.../screenshot.jpg" /><small>Optional — a preview image link.</small></label>
      </div>
    </div>
    <div className="form-section"><div className="form-section-title"><span>02</span><div><h3>Your contact details</h3><p>So we can reach you about the review.</p></div></div>
      <div className="form-grid">
        <label className="form-field"><span>Your name <b>*</b></span><input name="ownerName" required maxLength={100} placeholder="Full name" /></label>
        <label className="form-field"><span>Email address <b>*</b></span><input name="email" type="email" required maxLength={180} placeholder="you@example.com" /></label>
        <label className="form-field form-full"><span>Social or contact link</span><input name="contactLink" type="url" maxLength={500} placeholder="https://linkedin.com/in/... (optional)" /></label>
      </div>
    </div>
    <div className="form-section"><div className="form-section-title"><span>03</span><div><h3>How would you like to be featured?</h3><p>Choose a request type. Paid placement is reviewed manually; no payment is collected here.</p></div></div>
      <div className="promo-options">
        {[{name:'Free listing',desc:'A standard listing in the directory.',price:'Free',icon:'globe' as const},{name:'Featured listing',desc:'Request extra visibility in a category.',price:'Review first',icon:'star' as const},{name:'Sponsored spotlight',desc:'Ask about a highlighted placement.',price:'Contact us',icon:'zap' as const}].map((item) => <button type="button" className={`promo-option ${promo === item.name ? 'chosen' : ''}`} key={item.name} onClick={() => setPromo(item.name)}><span className="promo-icon"><Icon name={item.icon} size={19}/></span><span className="promo-copy"><strong>{item.name}</strong><small>{item.desc}</small></span><span className="promo-price">{item.price}</span><span className="radio-dot"/></button>)}
        <input type="hidden" name="promotionType" value={promo}/>
      </div>
    </div>
    <div className="form-consent"><label className="consent-check"><input type="checkbox" name="agreeToGuidelines" value="yes" required/><span>I confirm that I own this website or have permission to submit it, and that it follows the <Link href="/guidelines/" target="_blank">listing guidelines</Link>.</span></label><p>Submitting a request does not guarantee publication. Every listing is reviewed manually.</p></div>
    <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="companyFax" tabIndex={-1} autoComplete="off" /></label></div>
    {status && <div className={`form-status ${status.type}`} role="status"><Icon name={status.type === 'info' ? 'info' : 'shield'} size={18}/><span>{status.message}{status.whatsappUrl && <> <a className="form-whatsapp-fallback" href={status.whatsappUrl} target="_blank" rel="noopener noreferrer">Open WhatsApp <Icon name="arrow-up-right" size={13}/></a></>}</span></div>}
    <button type="submit" className="button button-dark button-submit">Continue to WhatsApp <Icon name="send" size={17}/></button>
    <p className="form-security"><Icon name="shield" size={14}/> Your details are placed in a WhatsApp message. Nothing is sent until you tap Send in WhatsApp.</p>
  </form>;
}
