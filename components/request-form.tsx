'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Icon } from './icon';
import { categories } from '@/lib/data';
import { siteConfig } from '@/lib/config';

type FormStatus = { type: 'success' | 'error'; message: string } | null;

export function RequestForm() {
  const [status, setStatus] = useState<FormStatus>(null);
  const [sending, setSending] = useState(false);
  const [promo, setPromo] = useState('Free listing');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (String(formData.get('website') || '').trim() === '') {
      setStatus({ type: 'error', message: 'Please enter your website URL.' });
      return;
    }
    const website = String(formData.get('website') || '').trim();
    try {
      const parsed = new URL(website);
      if (parsed.protocol !== 'https:') throw new Error('https');
    } catch {
      setStatus({ type: 'error', message: 'Please enter a valid HTTPS website URL (for example, https://your-website.com).' });
      return;
    }
    const apiUrl = process.env.NEXT_PUBLIC_LISTING_API_URL;
    if (!apiUrl) {
      setStatus({ type: 'error', message: `The request form is ready, but the email service has not been connected yet.${siteConfig.contactEmail ? ` Please contact ${siteConfig.contactEmail} for now.` : ' Please try again later.'}` });
      return;
    }
    const payload = Object.fromEntries(formData.entries());
    setSending(true);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'We could not send your request. Please try again.');
      setStatus({ type: 'success', message: 'Your request has been sent. We will review the website and contact you by email.' });
      form.reset();
      setPromo('Free listing');
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Something went wrong. Please try again.' });
    } finally {
      setSending(false);
    }
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
    {status && <div className={`form-status ${status.type}`} role="status"><Icon name={status.type === 'success' ? 'check' : 'shield'} size={18}/>{status.message}</div>}
    <button type="submit" className="button button-dark button-submit" disabled={sending}>{sending ? 'Sending request...' : 'Send listing request'}{sending ? <span className="button-spinner"/> : <Icon name="arrow-up-right" size={17}/>}</button>
    <p className="form-security"><Icon name="shield" size={14}/> Your details are only used to review this submission and contact you.</p>
  </form>;
}
