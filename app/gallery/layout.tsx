import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Gallery - Biomass Heating Systems & Industrial Equipment",
  description: "View our gallery showcasing Giriraj Industries' biomass heating systems, wood pellet burners, and industrial heating equipment in action. See our products and installations.",
  keywords: "biomass heating gallery, wood pellet burner images, industrial heating equipment photos, biomass systems gallery",
  openGraph: {
    title: "Gallery - Giriraj Industries",
    description: "View our gallery of biomass heating systems, wood pellet burners, and industrial heating equipment.",
    images: ["/gallery/gallery1.jpg"],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

