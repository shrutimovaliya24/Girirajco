import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Product Videos - Watch Our Equipment in Action",
  description: "Watch videos of Giriraj Industries' biomass heating systems, wood pellet burners, and industrial equipment in action. See our products for Namkeen, Peanut, Chana, Fryms, and more.",
  keywords: "biomass heating videos, wood pellet burner videos, industrial equipment videos, product demonstrations, Giriraj Industries videos",
  openGraph: {
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

