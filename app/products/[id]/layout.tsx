import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const productId = parseInt(params.id);
  
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
    openGraph: {
      title: `${productName} - Giriraj Industries`,
      description,
      images: [`/product/product${productId}.png`],
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

