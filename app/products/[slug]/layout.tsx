import type { Metadata } from 'next';
import { getProductIdFromSlug, getProductSlugById } from '../../../lib/product-slugs';

const productNames: Record<number, string> = {
  1: 'Biomass Pellet Burner',
  2: 'Biomass Pellet Stove',
  3: 'Batch Fryer',
  4: 'Hot Air Generator',
  5: 'Aluminium Melting Furnace',
};

const productDescriptions: Record<number, string> = {
  1: 'High-efficiency biomass pellet burner (GPB series) for industrial heating. Reduce fuel costs by up to 56% with sustainable biomass pellets.',
  2: 'Compact, efficient biomass pellet stove for controlled heating in commercial and small industrial spaces.',
  3: 'Batch fryer for food processing. Efficient heating with biomass fuel.',
  4: 'Hot air generator for industrial applications. Efficient biomass-powered heating system.',
  5: 'Aluminium melting furnace powered by biomass. Energy-efficient industrial furnace.',
};

const productOgImage: Record<number, string> = {
  1: 'Wood Pellet Burner.png',
  2: 'Wood Pellet Stove.png',
  3: 'Batch Fryer.png',
  4: 'Hot Air Generator.png',
  5: 'Aluminium Melting Furnace.png',
};

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

  const productName = productNames[productId] || 'Product';
  const description =
    productDescriptions[productId] || 'Industrial heating equipment from Giriraj Industries';
  const imageFile = productOgImage[productId] || 'Wood Pellet Burner.png';

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
          url: `/product/${imageFile}`,
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
      images: [`/product/${imageFile}`],
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
