export type Category =
  | 'Business'
  | 'E-commerce'
  | 'Technology'
  | 'Design & Creative'
  | 'Education'
  | 'Blog & Media'
  | 'Portfolio'
  | 'SaaS & Tools'
  | 'Community'
  | 'Other';

export type WebsiteHighlight = { label: string; value: string };
export type WebsiteContact = { label: string; value: string; url: string };
export type WebsiteLink = { label: string; url: string };

export type Website = {
  rank: number;
  slug: string;
  name: string;
  domain: string;
  url: string;
  category: Category;
  tagline: string;
  description: string;
  seoDescription: string;
  audience: string;
  logoText: string;
  color: string;
  accent: string;
  tags: string[];
  features: string[];
  techStack: string[];
  highlights: WebsiteHighlight[];
  contacts?: WebsiteContact[];
  relatedLinks?: WebsiteLink[];
  featured: boolean;
  label: string;
  added: string;
  infoChecked: string;
  demo: boolean;
};

// Curated listings are maintained manually in this file. The descriptions,
// capabilities and technology labels below are based on each website's public
// pages and linked portfolio information checked on 16 November 2026.
// No listing database or admin backend is used by the static directory.
export const websites: Website[] = [
  {
    rank: 1,
    slug: 'wishly-bd',
    name: 'Wishly BD',
    domain: 'wishly.bd',
    url: 'https://wishly.bd/',
    category: 'SaaS & Tools',
    tagline: 'Create personal wish websites for birthdays, proposals, anniversaries and heartfelt moments.',
    description: 'Wishly is a Bangladeshi no-code wish website maker for personal birthday pages, romantic proposals, anniversaries, apologies, miss-you messages, wedding moments, invitations and digital letters. Visitors choose an editable template, personalize the words and photos, preview the result, then publish one shareable link. The recipient can open the page in a browser without installing an app. The public homepage describes Wishly as free to start and lists 51 ready-made templates across 11 occasions.',
    seoDescription: 'Create a birthday website, romantic proposal, anniversary page or digital letter with Wishly BD. Personalize templates, photos and music, then share one link.',
    audience: 'People who want to create and share personal digital wishes, surprises and greeting pages for friends, partners and family.',
    logoText: 'W',
    color: '#f8e8ed',
    accent: '#a94366',
    tags: ['Birthday website', 'Proposal', 'Anniversary', 'Bangla & English', 'No-code', 'Digital letters'],
    features: [
      '51 ready-made templates across 11 occasions',
      'Visual editor: tap page elements to edit text and content',
      'Personal photo galleries and memories',
      'Music and video messages',
      'Private letters and personal messages',
      'Mobile-first creation, editing and preview',
      'One published link with WhatsApp and Messenger sharing',
      'QR code sharing for published pages',
      'Edit and publish again while keeping the same link'
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Cloudinary', 'SMTP Email'],
    highlights: [
      { label: 'Ready-made templates', value: '51' },
      { label: 'Occasions', value: '11' },
      { label: 'Getting started', value: 'Free to start' },
      { label: 'Sharing', value: 'One link + QR' }
    ],
    featured: true,
    label: 'Editor’s pick',
    added: '2026-11-16',
    infoChecked: '2026-11-16',
    demo: false
  },
  {
    rank: 2,
    slug: 'ra-fahim',
    name: 'RA Fahim',
    domain: 'rafahim.com',
    url: 'https://rafahim.com/',
    category: 'Portfolio',
    tagline: 'Web Developer & Creator building websites, web apps, SaaS products and digital experiences.',
    description: 'RA Fahim is a professional portfolio for a Bangladesh-based Web Developer & Creator. The site introduces his work across business websites, e-commerce platforms, SaaS products, custom web applications and tailored dashboards. Visitors can explore selected projects, services, technical skills, experience, insights articles, a CV and contact options. The portfolio describes a full-product approach that includes responsive frontend development, interactive interfaces, authentication, APIs, databases, admin systems, commerce workflows and performance optimization.',
    seoDescription: 'Explore RA Fahim’s Bangladesh-based portfolio for Next.js websites, SaaS products, e-commerce stores, custom web apps, dashboards and digital experiences.',
    audience: 'Businesses, founders and teams looking for a web developer, digital product builder or custom website and application services.',
    logoText: 'RA',
    color: '#e8edfb',
    accent: '#3b548f',
    tags: ['Web Developer', 'Next.js', 'React', 'SaaS', 'E-commerce', 'Web Applications', 'Bangladesh'],
    features: [
      'Professional developer profile and about section',
      'Selected projects and individual project information',
      'Website, web application, SaaS and e-commerce services',
      'Custom dashboards and full-product development',
      'Technical skills and experience overview',
      'Insights blog with web development and product topics',
      'CV and contact options for new projects'
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Node.js', 'Framer Motion'],
    highlights: [
      { label: 'Published experience', value: '2 years' },
      { label: 'Live products', value: '11' },
      { label: 'Core technologies', value: '5+' },
      { label: 'Main focus', value: 'Web · SaaS · Commerce' }
    ],
    relatedLinks: [
      { label: 'Digital Service Store', url: 'https://store.rafahim.com/' },
      { label: 'Projects', url: 'https://rafahim.com/projects/' },
      { label: 'Insights', url: 'https://rafahim.com/insights/' }
    ],
    featured: true,
    label: 'Creator portfolio',
    added: '2026-11-16',
    infoChecked: '2026-11-16',
    demo: false
  },
  {
    rank: 3,
    slug: 'sites-bd',
    name: 'SITES.BD',
    domain: 'sites.bd',
    url: 'https://sites.bd/',
    category: 'Technology',
    tagline: 'Build your online presence with domains, free subdomains, hosting and DNS tools.',
    description: 'SITES.BD is a domain and web-services platform that brings domain registration, free subdomains, web hosting, professional email, DNS and nameserver management, and customer account tools together. Its homepage promotes free subdomains with instant activation and managed DNS, plus a dashboard for managing domains, services, orders, invoices and support tickets. The platform is presented for beginners and developers who want to start or manage an online presence.',
    seoDescription: 'SITES.BD offers domain registration, free .sites.bd subdomains, web hosting, professional email and DNS management for website owners and developers.',
    audience: 'Individuals, small businesses and developers who need a domain, free subdomain, hosting, email or DNS management.',
    logoText: 'S',
    color: '#e2f1ff',
    accent: '#23689d',
    tags: ['Domain registration', 'Free subdomain', 'Web hosting', 'Professional email', 'DNS', 'Nameservers', 'Billing'],
    features: [
      'Domain search and registration for popular extensions',
      'Free subdomain options including .sites.bd',
      'Instant free-subdomain activation as promoted on the homepage',
      'Managed DNS and nameserver record management',
      'Web hosting for websites, blogs and online stores',
      'Professional email accounts and forwarding',
      'Customer dashboard for domains, services, orders and invoices',
      'Support ticket and account workflows'
    ],
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    highlights: [
      { label: 'Free subdomain', value: '100% free' },
      { label: 'Activation', value: 'Instant' },
      { label: 'DNS', value: 'Managed' },
      { label: 'Platform', value: 'Domains + hosting' }
    ],
    featured: true,
    label: 'Useful platform',
    added: '2026-11-16',
    infoChecked: '2026-11-16',
    demo: false
  },
  {
    rank: 4,
    slug: 'mohammad-arman',
    name: 'Mohammad Arman',
    domain: 'arman.bd',
    url: 'https://arman.bd/',
    category: 'Portfolio',
    tagline: 'Web Specialist offering web design, WordPress, SEO and AI-focused digital services.',
    description: 'Arman.bd is the professional website of Mohammad Arman, who presents himself as a Web Specialist, Web Designer, SEO Expert and AI Expert. The site highlights professional web development and WordPress expertise, SEO strategy, landing pages and custom web architecture. Its service links cover web design and development, e-commerce stores, SEO and digital growth, domain and hosting, AI-powered content and automation, VPS, and website security and maintenance. The website also includes project and blog discovery, FAQs, a shop and quick-support options.',
    seoDescription: 'Explore Mohammad Arman’s web services for WordPress, website design, e-commerce, SEO strategy, AI content automation, hosting and maintenance.',
    audience: 'Businesses and individuals seeking WordPress websites, web design, e-commerce, SEO, AI-related services or website support.',
    logoText: 'MA',
    color: '#fff0dc',
    accent: '#a8662a',
    tags: ['WordPress', 'Web Design', 'SEO Expert', 'AI Expert', 'E-commerce', 'Landing Pages', 'Hosting'],
    features: [
      'Professional profile for a Web Specialist',
      'Web design and development services',
      'WordPress website services',
      'E-commerce store development',
      'SEO and digital growth services',
      'Domain and hosting guidance/services',
      'AI-powered content and automation',
      'VPS, website security and maintenance information',
      'Blog posts, FAQs, works/projects and quick support',
      'Linked digital-product and service store at service.arman.bd'
    ],
    techStack: [],
    highlights: [
      { label: 'Specialties', value: 'Web · SEO · AI' },
      { label: 'CMS focus', value: 'WordPress' },
      { label: 'Services', value: 'Web + digital growth' }
    ],
    relatedLinks: [
      { label: 'Service Arman Store', url: 'https://service.arman.bd/' }
    ],
    featured: false,
    label: 'Web specialist',
    added: '2026-11-16',
    infoChecked: '2026-11-16',
    demo: false
  },
  {
    rank: 5,
    slug: 'elite-global',
    name: 'Elite Global',
    domain: 'eliteglobalstore.sites.bd',
    url: 'https://eliteglobalstore.sites.bd/',
    category: 'E-commerce',
    tagline: 'Premium gadgets, smart accessories, home decor, LED lighting and trending finds.',
    description: 'Elite Global is a Bangladesh-focused lifestyle e-commerce store for premium gadgets, smart accessories, home decor, LED lighting, gifts and trending everyday products. The storefront presents product collections, category browsing, featured products, new arrivals, deals and brand discovery. Customer-facing shopping tools include a cart, wishlist, secure checkout, cash on delivery, flexible payment choices, order tracking, order history, shipping information and returns. Its project portfolio also describes reviews, coupons and store administration tools.',
    seoDescription: 'Shop Elite Global for gadgets, smart accessories, home decor, LED lighting and gifts, with product categories, cart, wishlist, checkout and order tracking.',
    audience: 'Online shoppers in Bangladesh looking for gadgets, accessories, home decor, lighting and gift items.',
    logoText: 'EG',
    color: '#ececf8',
    accent: '#5d568f',
    tags: ['Online shopping', 'Gadgets', 'Lifestyle', 'Home decor', 'LED lighting', 'Gift items', 'Bangladesh'],
    features: [
      'Product collections and category-based browsing',
      'Premium gadgets and smart accessories',
      'Home decor, lamps and LED lighting',
      'Gift items and trending lifestyle products',
      'Featured products, new arrivals and deals',
      'Brand discovery and product search',
      'Shopping cart and wishlist',
      'Secure checkout and cash-on-delivery option',
      'Order tracking, order history and customer account',
      'Shipping information, returns, reviews and coupons'
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Framer Motion'],
    highlights: [
      { label: 'Store type', value: 'Lifestyle e-commerce' },
      { label: 'Market', value: 'Bangladesh' },
      { label: 'Checkout', value: 'Cash on delivery' },
      { label: 'Shopping tools', value: 'Cart + wishlist' }
    ],
    contacts: [
      { label: 'Email', value: 'eliteglobalstore@sites.bd', url: 'mailto:eliteglobalstore@sites.bd' },
      { label: 'WhatsApp', value: '+880 1995-534802', url: 'https://wa.me/8801995534802' },
      { label: 'Phone', value: '+880 1626-067171', url: 'tel:+8801626067171' }
    ],
    featured: false,
    label: 'Online store',
    added: '2026-11-16',
    infoChecked: '2026-11-16',
    demo: false
  },
  {
    rank: 6,
    slug: 'ponno-niketan',
    name: 'Ponno Niketan',
    domain: 'ponnoniketan.com',
    url: 'https://ponnoniketan.com/',
    category: 'E-commerce',
    tagline: 'Bangla and English online store with bKash, Nagad, cash on delivery and a reseller program.',
    description: 'Ponno Niketan is an online shopping platform for Bangladesh that works in both Bangla and English. Shoppers can browse categories and an offer zone, search, compare products and keep a wishlist, then check out with coupons and pay through bKash, Nagad or cash on delivery, with order tracking afterwards. Beyond the storefront, the platform includes a reseller program with packages, KYC, custom selling prices, a profit wallet and withdrawals, plus an affiliate system. Everything is run from a detailed admin panel covering orders, products, customers, returns, reviews, coupons, banners, reports and team access.',
    seoDescription: 'Shop Ponno Niketan, a Bangla and English online store for Bangladesh with bKash, Nagad and cash on delivery payments, order tracking and a reseller program.',
    audience: 'Online shoppers in Bangladesh, and people who want to earn by reselling or promoting products through a reseller or affiliate program.',
    logoText: 'PN',
    color: '#e3f3e8',
    accent: '#2f7d4f',
    tags: ['Online store', 'Multi-vendor', 'Bangla & English', 'bKash', 'Nagad', 'Cash on delivery', 'Reseller program'],
    features: [
      'Product catalog with categories, offer zone and search',
      'Compare products and save favourites to a wishlist',
      'Bangla and English language switch',
      'Checkout with coupons and bKash, Nagad or cash on delivery',
      'Order tracking after purchase',
      'Reseller program with packages, KYC, profit wallet and withdrawals',
      'Affiliate system',
      'Admin panel for orders, products, customers, returns, reviews, coupons, banners and reports'
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Cloudinary', 'Nodemailer', 'Zustand'],
    highlights: [
      { label: 'Languages', value: 'Bangla + English' },
      { label: 'Payments', value: 'bKash · Nagad · COD' },
      { label: 'Earning tools', value: 'Reseller + affiliate' },
      { label: 'Store type', value: 'Multi-vendor' }
    ],
    featured: false,
    label: 'Online store',
    added: '2026-11-16',
    infoChecked: '2026-11-16',
    demo: false
  },
  {
    rank: 7,
    slug: 'emirates-aluminium-shutter',
    name: 'Emirates Aluminium Shutter',
    domain: 'emiratesaluminiumshutter.com',
    url: 'https://emiratesaluminiumshutter.com/',
    category: 'Business',
    tagline: 'Dubai shutter and aluminium fabrication company with service pages and WhatsApp quotes.',
    description: 'Emirates Aluminium Shutter is the corporate website of a Dubai company that makes and installs rolling shutters, garage doors, gate motors, awnings and canopies. Each service has its own page, and visitors can request a quotation through a two-step WhatsApp wizard where they choose the service and the emirate. The site is available in English and Arabic and includes FAQ, insights and contact sections. Instagram and Facebook post cards on the site are refreshed automatically by a scheduled build.',
    seoDescription: 'Emirates Aluminium Shutter in Dubai: rolling shutters, garage doors, gate motors, awnings and canopies, with English and Arabic pages and WhatsApp quotes.',
    audience: 'Homeowners and businesses in the UAE looking for shutters, garage doors, gate motors, awnings, canopies or aluminium fabrication.',
    logoText: 'EA',
    color: '#fde9d6',
    accent: '#b4541a',
    tags: ['Dubai', 'Rolling shutters', 'Garage doors', 'Aluminium fabrication', 'English & Arabic', 'WhatsApp quote'],
    features: [
      'Nine service pages: shutters, garage doors, gate motors, awnings, canopies and fabrication',
      'Two-step WhatsApp quote wizard with service and emirate selection',
      'English and Arabic language switcher',
      'FAQ, insights and contact sections',
      'Instagram and Facebook post cards refreshed by a scheduled build'
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Static Export', 'GitHub Actions', 'GitHub Pages'],
    highlights: [
      { label: 'Location', value: 'Dubai, UAE' },
      { label: 'Service pages', value: '9' },
      { label: 'Languages', value: 'English + Arabic' },
      { label: 'Quotes', value: 'WhatsApp wizard' }
    ],
    featured: false,
    label: 'Business website',
    added: '2026-11-16',
    infoChecked: '2026-11-16',
    demo: false
  },
  {
    rank: 8,
    slug: 'assignment-cover',
    name: 'Assignment Cover',
    domain: 'sifaatsakib.sites.bd',
    url: 'https://sifaatsakib.sites.bd/',
    category: 'SaaS & Tools',
    tagline: 'Turn a few student details into a polished A4 assignment cover and export it as PDF or PNG.',
    description: 'Assignment Cover is a focused browser-based tool that helps students prepare a clean A4 cover page for their assignments. Enter the details, pick one of four cover styles, watch the live preview update, then export a print-ready PDF or a PNG. Everything runs in the browser, so no account is needed, and the layout works on both desktop and mobile screens.',
    seoDescription: 'Make a polished A4 assignment cover page online. Choose a style, preview it live and export a print-ready PDF or PNG, with no account needed.',
    audience: 'Students who need a neat, print-ready cover page for assignments, reports and lab files.',
    logoText: 'AC',
    color: '#fff3cf',
    accent: '#8a6a0a',
    tags: ['Assignment cover', 'A4 cover page', 'PDF export', 'PNG export', 'Student tool', 'No account'],
    features: [
      'Four cover styles: Classic, Modern, Minimal and Ceremonial',
      'Responsive builder with live cover preview',
      'Client-side data flow with no account required',
      'Print-ready A4 PDF and PNG export'
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'A4 Print Layout', 'PDF / PNG Export'],
    highlights: [
      { label: 'Cover styles', value: '4' },
      { label: 'Export', value: 'PDF + PNG' },
      { label: 'Account', value: 'Not required' },
      { label: 'Layout', value: 'A4 print-ready' }
    ],
    featured: false,
    label: 'Web tool',
    added: '2026-11-16',
    infoChecked: '2026-11-16',
    demo: false
  },
  {
    rank: 9,
    slug: 'office-by-global-skill-lab',
    name: 'Office by Global Skill Lab',
    domain: 'office.globalskilllab.com',
    url: 'https://office.globalskilllab.com/',
    category: 'SaaS & Tools',
    tagline: 'Franchise and training-center management with student registration, course orders, wallets and payouts.',
    description: 'Office by Global Skill Lab is a management system for a franchise and training-center network. Centers register students with OTP verification and duplicate checks, create course orders and send payment links by SMS and email, and follow their wallet, commission and monthly payouts. The head office manages franchises, rates, notifications and reports from role-based dashboards that include activity logs.',
    seoDescription: 'Office by Global Skill Lab is a franchise and training-center management system for student registration, course orders, payment links, wallets and payouts.',
    audience: 'Training centers, franchise partners and head-office teams that manage students, course orders and commissions in one system.',
    logoText: 'GS',
    color: '#dff2ef',
    accent: '#1f7a6d',
    tags: ['Franchise management', 'Training centers', 'Student registration', 'Wallet', 'Commission', 'Dashboards'],
    features: [
      'OTP-verified student registration with duplicate checks',
      'Course orders with SMS and email payment links',
      'Center wallet, commission and monthly payouts',
      'Role-based admin and center dashboards',
      'Reports, notifications and activity logs'
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Prisma', 'Tailwind CSS', 'WooCommerce', 'SMS & Email'],
    highlights: [
      { label: 'System type', value: 'Franchise management' },
      { label: 'Payments', value: 'SMS + email links' },
      { label: 'Tracking', value: 'Wallet + commission' },
      { label: 'Access', value: 'Role-based' }
    ],
    featured: false,
    label: 'Management system',
    added: '2026-11-16',
    infoChecked: '2026-11-16',
    demo: false
  },
  {
    rank: 10,
    slug: 'karim-properties-development',
    name: 'Karim Properties Development',
    domain: 'karimpropertiesbd.com',
    url: 'https://karimpropertiesbd.com/',
    category: 'Business',
    tagline: 'Dhaka real estate developer presenting residential projects, services and appointment enquiries.',
    description: 'Karim Properties Development is the WordPress website of a Dhaka real estate developer. It presents the company’s residential projects, each with its own detail page, along with a gallery and a blog. Service pages cover land development, construction, sales, design and legal support, and a booking-in-process section gives visitors clear appointment and contact paths.',
    seoDescription: 'Karim Properties Development is a Dhaka real estate developer with residential projects, land development, construction, sales, design and legal services.',
    audience: 'Home buyers and land owners in Dhaka looking for a real estate developer, residential projects or property services.',
    logoText: 'KP',
    color: '#f0eadf',
    accent: '#7a5a2b',
    tags: ['Real estate', 'Dhaka', 'Residential projects', 'Land development', 'Construction', 'WordPress'],
    features: [
      'Project showcase with a detail page for each development',
      'Service pages for land development, construction, sales, design and legal support',
      'Booking-in-process section with appointment and contact calls to action',
      'Gallery and blog',
      'Responsive Elementor layout with SEO-ready metadata'
    ],
    techStack: ['WordPress', 'Elementor', 'PHP'],
    highlights: [
      { label: 'Industry', value: 'Real estate' },
      { label: 'Location', value: 'Dhaka' },
      { label: 'Platform', value: 'WordPress' },
      { label: 'Service areas', value: '5' }
    ],
    featured: false,
    label: 'Real estate website',
    added: '2026-11-16',
    infoChecked: '2026-11-16',
    demo: false
  },
  {
    rank: 11,
    slug: 'vero-mart-bd',
    name: 'Vero Mart BD',
    domain: 'veromartbd.com',
    url: 'http://veromartbd.com/',
    category: 'E-commerce',
    tagline: 'Lifestyle online store for watches, belts, gadgets, money bags and menswear.',
    description: 'Vero Mart BD is a WooCommerce store for a Bangladeshi lifestyle brand, built on the Woodmart theme. The catalog covers watches, belts, gadgets, money bags, toys and menswear, with prices in BDT and bKash and Nagad payment information. Shoppers get a storefront with shop and category pages, a cart, wishlist, compare, quick view and customer accounts.',
    seoDescription: 'Shop Vero Mart BD for watches, belts, gadgets, money bags, toys and menswear, with BDT pricing, bKash and Nagad payment information and customer accounts.',
    audience: 'Online shoppers in Bangladesh looking for watches, belts, gadgets, money bags, toys and menswear.',
    logoText: 'VM',
    color: '#e8e9f7',
    accent: '#4a4fa3',
    tags: ['WooCommerce', 'Online store', 'Watches', 'Menswear', 'Gadgets', 'bKash', 'Nagad'],
    features: [
      'Woodmart storefront with shop, category and product pages',
      'Cart, wishlist, compare and quick view',
      'Customer accounts',
      'Categories for watches, belts, gadgets, money bags, toys and menswear',
      'BDT pricing with bKash and Nagad payment information'
    ],
    techStack: ['WordPress', 'WooCommerce', 'Woodmart', 'Elementor', 'PHP'],
    highlights: [
      { label: 'Platform', value: 'WooCommerce' },
      { label: 'Currency', value: 'BDT' },
      { label: 'Payments', value: 'bKash + Nagad info' },
      { label: 'Shopping tools', value: 'Cart + wishlist + compare' }
    ],
    featured: false,
    label: 'Online store',
    added: '2026-11-16',
    infoChecked: '2026-11-16',
    demo: false
  },
  {
    rank: 12,
    slug: 'toto-company',
    name: 'TOTO COMPANY',
    domain: 'totocompany.sites.bd',
    url: 'https://totocompany.sites.bd/',
    category: 'SaaS & Tools',
    tagline: 'Staff, salary and company accounts management with employee wallets, payroll and ID cards.',
    description: 'TOTO COMPANY is a staff, salary and company accounts management system. Every employee gets a login and a wallet, while admins run payroll, withdrawals, attendance, ID cards and the company cashbook from one place. Salary and commission credits can be scheduled, manual withdrawals are recorded with the method, a reference and proof of payment, and ID cards carry a public QR code for verification.',
    seoDescription: 'TOTO COMPANY is a staff and salary management system with employee wallets, scheduled payroll, withdrawals, attendance, QR-verified ID cards and a cashbook.',
    audience: 'Companies and teams that need one place to manage staff profiles, wallets, payroll, attendance and company accounts.',
    logoText: 'TC',
    color: '#e6eef9',
    accent: '#2b5a96',
    tags: ['Staff management', 'Payroll', 'Employee wallet', 'Attendance', 'ID cards', 'Cashbook', 'PWA'],
    features: [
      'Staff profiles with structured IDs, custom roles and permissions',
      'Employee wallets and ledger with scheduled salary and commission credits',
      'Manual withdrawals recorded with method, reference and payment proof',
      'ID cards with public QR verification',
      'Attendance, company cashbook and audit logs'
    ],
    techStack: ['Next.js', 'React', 'Supabase', 'Nodemailer', 'Cloudinary', 'Vercel Cron', 'PWA'],
    highlights: [
      { label: 'System type', value: 'Staff + accounts' },
      { label: 'Wallets', value: 'Per employee' },
      { label: 'ID cards', value: 'QR-verified' },
      { label: 'App type', value: 'PWA' }
    ],
    featured: false,
    label: 'Management system',
    added: '2026-11-16',
    infoChecked: '2026-11-16',
    demo: false
  },
  {
    rank: 13,
    slug: 'graftex-bd',
    name: 'Graftex BD',
    domain: 'graftexbd.com',
    url: 'https://graftexbd.com/',
    category: 'E-commerce',
    tagline: 'Bangla-first printing and packaging store with a product configurator and online payment.',
    description: 'Graftex BD is a Bangla-first printing and packaging store. Customers configure business cards, stationery and other custom print products, upload their artwork, pay online and track their orders. Orders are confirmed by email and by an automatic confirmation call, and an admin panel runs orders, quotes, inventory, POS, reviews and site content.',
    seoDescription: 'Order business cards, stationery and custom print products from Graftex BD: configure the product, upload artwork, pay online with EPS and track your order.',
    audience: 'Businesses and individuals in Bangladesh who need business cards, stationery, packaging or other custom printed products.',
    logoText: 'GB',
    color: '#fde4e4',
    accent: '#b03a3a',
    tags: ['Printing', 'Packaging', 'Business cards', 'Stationery', 'Bangla-first', 'Online payment'],
    features: [
      'Print product catalog with a configurator and artwork upload',
      'Cart, checkout and coupons',
      'EPS online payment',
      'Order confirmation emails and automatic confirmation calls',
      'Admin panel for orders, quotes, inventory, POS, reviews and site content'
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Cloudinary', 'Nodemailer', 'EPS Payment Gateway'],
    highlights: [
      { label: 'Language', value: 'Bangla-first' },
      { label: 'Products', value: 'Custom print' },
      { label: 'Payment', value: 'EPS online' },
      { label: 'Artwork', value: 'Upload supported' }
    ],
    featured: false,
    label: 'Printing store',
    added: '2026-11-16',
    infoChecked: '2026-11-16',
    demo: false
  }
];

export const categories: { name: Category; description: string; icon: string; tint: string }[] = [
  { name: 'Business', description: 'Brands, services & companies', icon: 'briefcase', tint: 'mint' },
  { name: 'E-commerce', description: 'Stores & online shopping', icon: 'bag', tint: 'peach' },
  { name: 'Technology', description: 'Tech, code & innovation', icon: 'cpu', tint: 'blue' },
  { name: 'Design & Creative', description: 'Designers, studios & art', icon: 'sparkles', tint: 'purple' },
  { name: 'Education', description: 'Learning & knowledge', icon: 'book', tint: 'yellow' },
  { name: 'Blog & Media', description: 'Stories, news & ideas', icon: 'newspaper', tint: 'pink' },
  { name: 'Portfolio', description: 'Independent work & talent', icon: 'layers', tint: 'blue' },
  { name: 'SaaS & Tools', description: 'Useful digital products', icon: 'grid', tint: 'mint' },
  { name: 'Community', description: 'Groups & shared interests', icon: 'users', tint: 'peach' },
  { name: 'Other', description: 'Something a little different', icon: 'globe', tint: 'purple' }
];

export const getWebsite = (slug: string) => websites.find((website) => website.slug === slug);

export const categorySlug = (value: string) => value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Categories with fewer live listings than this stay out of the sitemap and are marked noindex,
// so search engines do not index near-empty pages.
export const MIN_INDEXABLE_CATEGORY_LISTINGS = 2;

export const liveWebsites = websites.filter((website) => !website.demo);

// Most recent date on which any live listing was added or re-checked (used for sitemap lastModified).
export const latestListingUpdate = liveWebsites.reduce((latest, website) => {
  const date = website.infoChecked > website.added ? website.infoChecked : website.added;
  return date > latest ? date : latest;
}, '2026-11-15');
