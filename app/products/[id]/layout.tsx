import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const productId = parseInt(id);
  
  const productNames: Record<number, string> = {
    1: "Wood Pellet Burner",
    2: "Hot Air Generator",
    3: "Wood Pellet Stove",
    4: "Aluminium Melting Furnace",
    5: "Batch Fryer",
  };

  const productDescriptions: Record<number, string> = {
    1: "High-efficiency wood pellet burner (GPB series) for industrial heating. Reduce fuel costs by up to 56% with sustainable wood pellets.",
    2: "Hot air generator for industrial applications. Efficient biomass-powered heating system.",
    3: "Wood pellet stove for residential and commercial use. Clean and efficient heating solution.",
    4: "Aluminium melting furnace powered by biomass. Energy-efficient industrial furnace.",
    5: "Batch fryer for food processing. Efficient heating with biomass fuel.",
  };

  const productName = productNames[productId] || "Product";
  const description = productDescriptions[productId] || "Industrial heating equipment from Giriraj Industries";

  return {
    title: `${productName} - Giriraj Industries`,
    description,
    keywords: `${productName.toLowerCase()}, biomass heating, industrial equipment, Giriraj Industries`,
    alternates: {
      canonical: `https://girirajco.com/products/${productId}`,
    },
    openGraph: {
      title: `${productName} - Giriraj Industries`,
      description,
      url: `https://girirajco.com/products/${productId}`,
      siteName: "Giriraj Industries",
      images: [
        {
          url: `/product/${productId === 1 ? 'Wood Pellet Burner.png' : productId === 2 ? 'Hot Air Generator.png' : productId === 3 ? 'Wood Pellet Stove.png' : productId === 4 ? 'Aluminium Melting Furnace.png' : 'Batch Fryer.png'}`,
          width: 1200,
          height: 630,
          alt: `${productName} - Giriraj Industries`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${productName} - Giriraj Industries`,
      description,
      images: [`/product/${productId === 1 ? 'Wood Pellet Burner.png' : productId === 2 ? 'Hot Air Generator.png' : productId === 3 ? 'Wood Pellet Stove.png' : productId === 4 ? 'Aluminium Melting Furnace.png' : 'Batch Fryer.png'}`],
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

