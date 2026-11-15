import type { ReactNode, SVGProps } from 'react';

type IconName = 'info' | 'arrow-up-right' | 'arrow-right' | 'arrow-left' | 'search' | 'menu' | 'x' | 'sparkles' | 'globe' | 'briefcase' | 'bag' | 'cpu' | 'book' | 'newspaper' | 'layers' | 'grid' | 'users' | 'check' | 'chevron-down' | 'shield' | 'mail' | 'plus' | 'external' | 'clock' | 'send' | 'compass' | 'star' | 'filter' | 'zap' | 'pause' | 'play' | 'move-horizontal' | 'mouse-pointer';

const paths: Record<IconName, ReactNode> = {
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>,
  'arrow-up-right': <><path d="M7 17 17 7"/><path d="M7 7h10v10"/></>,
  'arrow-right': <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
  'arrow-left': <><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  x: <><path d="m18 6-12 12M6 6l12 12"/></>,
  sparkles: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1 2.5 2.5 1-2.5 1L19 21l-1-2.5-2.5-1 2.5-1L19 14Z"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>,
  briefcase: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></>,
  bag: <><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
  cpu: <><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 9h6v6H9zM9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z"/><path d="M4 16.5A2.5 2.5 0 0 1 6.5 14H20M8 7h7"/></>,
  newspaper: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h5v5H7zM15 8h3M15 11h3M7 16h11"/></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6m3-3h-6"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  'chevron-down': <path d="m6 9 6 6 6-6"/>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  external: <><path d="M14 3h7v7M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  send: <><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>,
  compass: <><circle cx="12" cy="12" r="9"/><path d="m16.2 7.8-2.4 6-6 2.4 2.4-6 6-2.4Z"/></>,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>,
  filter: <><path d="M4 7h16M7 12h10m-7 5h4"/></>,
  zap: <path d="m13 2-3 9h7l-6 11 2-9H6l7-11Z"/>,
  pause: <><path d="M8 5h3v14H8zM15 5h3v14h-3z"/></>,
  play: <path d="m8 5 11 7-11 7V5Z"/>,
  'move-horizontal': <><path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/></>,
  'mouse-pointer': <path d="m5 3 14 11-7 1-3 6L5 3Z"/>
};

export function Icon({ name, size = 18, className, ...props }: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>{paths[name]}</svg>;
}
