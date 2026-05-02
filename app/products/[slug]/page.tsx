import { notFound } from 'next/navigation';
import { getProductIdFromSlug } from '../../../lib/product-slugs';
import ProductDetailPageClient from './ProductDetailPageClient';

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
