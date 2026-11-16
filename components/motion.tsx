'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const REVEAL = '.h-reveal,.section-heading,.editorial-heading,.section-index-row,.category-card,.category-intro,.how-visual,.how-content .how-intro,.how-steps>div,.submit-band-inner,.page-hero .container>*,.explore-bottom-cta,.listings-endnote,.footer-main>*,.footer-giant,.footer-bottom,.empty-state';
const SPOT = '.h-card,.website-card,.category-card,.how-visual';

export function Motion() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  // Scroll progress + header state + cursor glow + hero parallax (mounted once)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
        document.documentElement.classList.toggle('is-scrolled', window.scrollY > 24);
      });
    };
    const onMove = (e: PointerEvent) => {
      if (glow.current) glow.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      const target = e.target as HTMLElement | null;
      const spot = target?.closest?.(SPOT) as HTMLElement | null;
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
        spot.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      const hero = document.querySelector('.masthead') as HTMLElement | null;
      if (hero && !reduce) {
        const r = hero.getBoundingClientRect();
        if (e.clientY >= r.top && e.clientY <= r.bottom) {
          hero.style.setProperty('--px', String(((e.clientX / window.innerWidth) - 0.5).toFixed(3)));
          hero.style.setProperty('--py', String((((e.clientY - r.top) / r.height) - 0.5).toFixed(3)));
        }
      }
      const btn = target?.closest?.('.button') as HTMLElement | null;
      if (btn && !reduce) {
        const r = btn.getBoundingClientRect();
        btn.style.translate = `${((e.clientX - r.left) / r.width - 0.5) * 8}px ${((e.clientY - r.top) / r.height - 0.5) * 6}px`;
      }
    };
    const onLeave = (e: PointerEvent) => {
      const btn = (e.target as HTMLElement | null)?.closest?.('.button') as HTMLElement | null;
      if (btn) btn.style.translate = '';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    if (fine) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerout', onLeave);
      document.documentElement.classList.add('has-glow');
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerout', onLeave);
    };
  }, []);

  // Scroll-reveal, re-run on every route change
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('rv-in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    const t = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>(REVEAL).forEach((el, i) => {
        if (el.classList.contains('rv')) return;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // already visible: no flash
        el.style.setProperty('--d', `${(i % 4) * 70}ms`);
        el.classList.add('rv');
        io.observe(el);
      });
    }, 60);
    return () => { window.clearTimeout(t); io.disconnect(); };
  }, [pathname]);

  return <><div className="scroll-progress" ref={bar} aria-hidden="true" /><div className="cursor-glow" ref={glow} aria-hidden="true" /></>;
}
