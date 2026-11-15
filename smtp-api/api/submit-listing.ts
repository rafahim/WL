import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const rateBuckets = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

type ListingRequest = {
  name?: string;
  website?: string;
  category?: string;
  tagline?: string;
  description?: string;
  logoUrl?: string;
  screenshotUrl?: string;
  ownerName?: string;
  email?: string;
  contactLink?: string;
  promotionType?: string;
  agreeToGuidelines?: string;
  companyFax?: string;
};

const text = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validHttpsUrl = (value: string, required = false) => {
  if (!value) return !required;
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
};
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] || char);
const fieldRow = (label: string, value: string) => `<tr><td style="padding:10px 12px;border-bottom:1px solid #edf0f3;color:#7b8494;font-size:12px;width:165px;vertical-align:top">${label}</td><td style="padding:10px 12px;border-bottom:1px solid #edf0f3;color:#17213b;font-size:13px;vertical-align:top;word-break:break-word">${escapeHtml(value || 'Not provided')}</td></tr>`;

function cors(req: VercelRequest, res: VercelResponse): boolean {
  const allowedOrigin = process.env.ALLOWED_ORIGIN?.trim();
  const requestOrigin = req.headers.origin;
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
  if (!allowedOrigin || !requestOrigin || requestOrigin !== allowedOrigin) return false;
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  return true;
}

function checkRateLimit(req: VercelRequest): boolean {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const previous = rateBuckets.get(ip);
  if (!previous || previous.resetAt <= now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  previous.count += 1;
  return previous.count <= MAX_REQUESTS_PER_WINDOW;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cors(req, res)) return res.status(403).json({ error: 'This request origin is not allowed.' });
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  if (!checkRateLimit(req)) return res.status(429).json({ error: 'Too many requests. Please try again later.' });

  const body = (req.body || {}) as ListingRequest;
  // A hidden field catches basic automated form spam.
  if (text(body.companyFax, 200)) return res.status(200).json({ ok: true });

  const data = {
    name: text(body.name, 80),
    website: text(body.website, 300),
    category: text(body.category, 80),
    tagline: text(body.tagline, 120),
    description: text(body.description, 1200),
    logoUrl: text(body.logoUrl, 500),
    screenshotUrl: text(body.screenshotUrl, 500),
    ownerName: text(body.ownerName, 100),
    email: text(body.email, 180),
    contactLink: text(body.contactLink, 500),
    promotionType: text(body.promotionType, 80),
    agreeToGuidelines: text(body.agreeToGuidelines, 10)
  };

  if (!data.name || !data.website || !data.category || !data.tagline || data.description.length < 40 || !data.ownerName || !validEmail(data.email) || data.agreeToGuidelines !== 'yes') {
    return res.status(400).json({ error: 'Please complete all required fields with valid information.' });
  }
  if (!validHttpsUrl(data.website, true) || !validHttpsUrl(data.logoUrl) || !validHttpsUrl(data.screenshotUrl) || !validHttpsUrl(data.contactLink)) {
    return res.status(400).json({ error: 'Website and optional links must be valid HTTPS URLs.' });
  }

  const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM', 'ADMIN_EMAIL'];
  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length) {
    console.error(`Missing SMTP environment variables: ${missing.join(', ')}`);
    return res.status(500).json({ error: 'Email service is not configured. Please contact the site owner.' });
  }

  try {
    const port = Number(process.env.SMTP_PORT);
    if (!Number.isFinite(port) || port <= 0) return res.status(500).json({ error: 'SMTP port is not configured correctly.' });
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE === 'true' || port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 12000
    });

    const fields = [
      ['Website name', data.name], ['Website URL', data.website], ['Category', data.category],
      ['Tagline', data.tagline], ['Description', data.description], ['Logo URL', data.logoUrl],
      ['Screenshot URL', data.screenshotUrl], ['Owner name', data.ownerName], ['Contact email', data.email],
      ['Social/contact link', data.contactLink], ['Promotion request', data.promotionType]
    ];
    const rows = fields.map(([label, value]) => fieldRow(label, value)).join('');
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      replyTo: data.email,
      subject: `New BD Web List listing request: ${data.name}`,
      text: fields.map(([label, value]) => `${label}: ${value || 'Not provided'}`).join('\n\n'),
      html: `<div style="font-family:Arial,sans-serif;max-width:720px;margin:0 auto;color:#17213b"><div style="background:#111b34;color:#fff;padding:24px 28px;border-radius:12px 12px 0 0"><div style="font-size:11px;letter-spacing:2px;color:#d7fb69;font-weight:bold">BD WEB LIST · NEW SUBMISSION</div><h1 style="font-size:23px;margin:9px 0 0">A website wants to be discovered.</h1></div><div style="padding:22px 25px;border:1px solid #e8ebef;border-top:0;border-radius:0 0 12px 12px"><table style="border-collapse:collapse;width:100%">${rows}</table><p style="font-size:11px;color:#8a93a1;margin-top:18px">Review this request manually. Do not publish until the website has been checked.</p></div></div>`
    });

    // Confirmation is best-effort; the admin notification above is the primary delivery.
    let confirmationSent = false;
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: data.email,
        replyTo: process.env.ADMIN_EMAIL,
        subject: `We received your website submission — BD Web List`,
        text: `Hi ${data.ownerName},\n\nThanks for sending ${data.name} to BD Web List. Your listing request has been received and will be reviewed manually. Submission does not guarantee publication. We will contact you at this email address when there is an update.\n\nThe BD Web List team`,
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:28px;color:#17213b"><div style="font-size:11px;letter-spacing:2px;color:#839e3d;font-weight:bold">BD WEB LIST</div><h1 style="font-size:25px;margin:20px 0 10px">Thanks for sharing your website.</h1><p style="font-size:14px;line-height:1.8;color:#647086">Hi ${escapeHtml(data.ownerName)}, we've received the listing request for <strong>${escapeHtml(data.name)}</strong>. Our team will review the website and contact you at this email address when there is an update.</p><p style="font-size:12px;line-height:1.8;color:#8993a1">A submission does not guarantee publication. Every listing is reviewed manually.</p><p style="font-size:13px;margin-top:25px">The BD Web List team</p></div>`
      });
      confirmationSent = true;
    } catch (confirmationError) {
      console.error('Submitter confirmation email failed:', confirmationError);
    }

    return res.status(200).json({ ok: true, confirmationSent });
  } catch (error) {
    console.error('Listing email delivery failed:', error);
    return res.status(502).json({ error: 'We could not deliver your request by email. Please try again later.' });
  }
}
