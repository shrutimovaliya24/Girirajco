import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Products - Biomass Heating Systems & Wood Pellet Burners",
  description: "Explore Giriraj Industries' range of high-efficiency biomass heating systems, wood pellet burners (GPB models), hot air generators, and industrial heating equipment. View specifications, models, and technical details.",
  keywords: "biomass heating products, wood pellet burners, GPB models, hot air generators, industrial heating equipment, biomass burners, fuel-efficient heating systems",
  openGraph: {
    title: "Products - Biomass Heating Systems & Wood Pellet Burners",
    description: "Explore our range of high-efficiency biomass heating systems, wood pellet burners, and industrial heating equipment.",
    images: ["/product/Wood Pellet Burner.png"],
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

