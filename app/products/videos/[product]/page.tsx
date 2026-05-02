import { notFound } from 'next/navigation';
import {
  productOrder,
  productVideos,
  videoProductNameToSlug,
} from '../../../../data/productVideos';
import ProductVideoDetailClient from './ProductVideoDetailClient';

export default async function ProductVideoDetailPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  const productName = productOrder.find(
    (name) => videoProductNameToSlug(name) === product
  );
  if (!productName || !productVideos[productName]) {
    notFound();
  }
  return <ProductVideoDetailClient productSlug={product} />;
}
