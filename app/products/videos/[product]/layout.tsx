import type { Metadata } from 'next';
import { productOrder } from '../../../../data/productVideos';

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
  const { product } = await params;
  
  // Find product name from slug
  const productName = productOrder.find(name => 
    name.toLowerCase().replace(/\s+/g, '-') === product
  ) || product;

  // Create friendly product name
  const displayName = productName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const title = `${displayName} - Product Videos | Giriraj Industries`;
  const description = `Watch videos of Giriraj Industries' ${displayName} biomass heating systems and equipment in action. See real installations and product demonstrations.`;

  return {
    title,
    description,
    keywords: `${displayName.toLowerCase()}, biomass heating videos, ${displayName.toLowerCase()} equipment, industrial heating videos, product demonstrations`,
    alternates: {
      canonical: `https://girirajco.com/products/videos/${product}`,
    },
    openGraph: {
      title: `${displayName} - Product Videos | Giriraj Industries`,
      description,
      url: `https://girirajco.com/products/videos/${product}`,
      siteName: "Giriraj Industries",
      images: [
        {
          url: "/product/Wood Pellet Burner.png",
          width: 1200,
          height: 630,
          alt: `${displayName} - Giriraj Industries`,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayName} - Product Videos | Giriraj Industries`,
      description,
      images: ["/product/Wood Pellet Burner.png"],
    },
  };
}

export default function ProductVideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

