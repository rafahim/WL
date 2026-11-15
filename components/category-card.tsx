import Link from 'next/link';
import { Icon } from './icon';
import { categorySlug, type Category } from '@/lib/data';

const iconMap: Record<string, 'briefcase' | 'bag' | 'cpu' | 'sparkles' | 'book' | 'newspaper' | 'layers' | 'grid' | 'users' | 'globe'> = {
  briefcase: 'briefcase', bag: 'bag', cpu: 'cpu', sparkles: 'sparkles', book: 'book', newspaper: 'newspaper', layers: 'layers', grid: 'grid', users: 'users', globe: 'globe'
};

export function CategoryCard({ category, count }: { category: { name: Category; description: string; icon: string; tint: string }; count: number }) {
  return <Link href={`/categories/${categorySlug(category.name)}/`} className="category-card">
    <span className={`category-icon tint-${category.tint}`}><Icon name={iconMap[category.icon]} size={21}/></span>
    <span className="category-copy"><strong>{category.name}</strong><small>{category.description}</small></span>
    <span className="category-count">{count.toString().padStart(2, '0')}</span>
  </Link>;
}
