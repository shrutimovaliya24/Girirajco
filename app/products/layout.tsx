import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Products - Biomass Heating Systems & Wood Pellet Burners",
  description: "Explore Giriraj Industries' range of high-efficiency biomass heating systems, wood pellet burners (GPB models), hot air generators, and industrial heating equipment. View specifications, models, and technical details.",
  keywords: "biomass heating products, wood pellet burners, GPB models, hot air generators, industrial heating equipment, biomass burners, fuel-efficient heating systems",
  alternates: {
    canonical: "https://girirajco.com/products",
  },
  openGraph: {
    title: "Products - Biomass Heating Systems & Wood Pellet Burners",
    description: "Explore our range of high-efficiency biomass heating systems, wood pellet burners, and industrial heating equipment.",
    url: "https://girirajco.com/products",
    siteName: "Giriraj Industries",
    images: [
      {
        url: "/product/Wood Pellet Burner.png",
        width: 1200,
        height: 630,
        alt: "Giriraj Industries Products",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
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

