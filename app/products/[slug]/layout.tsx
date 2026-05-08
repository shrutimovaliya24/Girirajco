import type { Metadata } from 'next';
import { getProductIdFromSlug, getProductSlugById } from '../../../lib/product-slugs';
import productsData from '../../../data/products.json';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const productId = getProductIdFromSlug(slug);
  const canonicalSlug = productId != null ? getProductSlugById(productId) : null;

  if (productId == null || !canonicalSlug) {
    return {
      title: 'Product - Giriraj Industries',
      description: 'Industrial heating equipment from Giriraj Industries',
      robots: { index: false, follow: true },
    };
  }

  const record = (productsData as Array<{ id: number; name: string; summary: string; ogImage: string }>).find(
    (p) => p.id === productId
  );
  const productName = record?.name ?? 'Product';
  const description = record?.summary ?? 'Industrial heating equipment from Giriraj Industries';
  const imageUrl = record?.ogImage ?? '/product/Wood Pellet Burner.png';

  return {
    title: `${productName} - Giriraj Industries`,
    description,
    keywords: `${productName.toLowerCase()}, biomass heating, industrial equipment, Giriraj Industries`,
    alternates: {
      canonical: `https://girirajco.com/products/${canonicalSlug}`,
    },
    openGraph: {
      title: `${productName} - Giriraj Industries`,
      description,
      url: `https://girirajco.com/products/${canonicalSlug}`,
      siteName: 'Giriraj Industries',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${productName} - Giriraj Industries`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${productName} - Giriraj Industries`,
      description,
      images: [imageUrl],
    },
  };
}

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
