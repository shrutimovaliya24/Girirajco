import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Product Videos - Watch Our Equipment in Action",
  description: "Watch videos of Giriraj Industries' biomass heating systems, wood pellet burners, and industrial equipment in action. See our products for Namkeen, Peanut, Chana, Fryms, and more.",
  keywords: "biomass heating videos, wood pellet burner videos, industrial equipment videos, product demonstrations, Giriraj Industries videos",
  alternates: {
    canonical: "https://girirajco.com/products/videos",
  },
  openGraph: {
    title: "Product Videos - Giriraj Industries",
    description: "Watch videos of our biomass heating systems and industrial equipment in action.",
    url: "https://girirajco.com/products/videos",
    siteName: "Giriraj Industries",
    images: [
      {
        url: "/product/Wood Pellet Burner.png",
        width: 1200,
        height: 630,
        alt: "Product Videos - Giriraj Industries",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Videos - Giriraj Industries",
    description: "Watch videos of our biomass heating systems and industrial equipment in action.",
    images: ["/product/Wood Pellet Burner.png"],
  },
};

export default function ProductVideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

