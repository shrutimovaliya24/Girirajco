import { notFound } from 'next/navigation';
import { getProductIdFromSlug, getProductSlugById } from '../../../lib/product-slugs';
import ProductDetailPageClient from './ProductDetailPageClient';
import productsData from '../../../data/products.json';

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return (productsData as Array<{ id: number }>)
    .map((p) => getProductSlugById(p.id))
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getProductIdFromSlug(slug)) {
    notFound();
  }
  return <ProductDetailPageClient />;
}
