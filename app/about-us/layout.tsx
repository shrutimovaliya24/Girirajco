import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us - Leading Biomass Heating Solutions Manufacturer",
  description: "Learn about Giriraj Industries - a leading manufacturer of high-efficiency biomass heating systems and wood pellet burners in India. Our mission, vision, and commitment to sustainable industrial heating solutions.",
  keywords: "about Giriraj Industries, biomass heating manufacturer, wood pellet burners India, sustainable heating solutions, industrial biomass equipment",
  openGraph: {
    title: "About Us - Giriraj Industries",
    description: "Leading manufacturer of high-efficiency biomass heating systems and wood pellet burners in India.",
    images: ["/product/Wood Pellet Burner.png"],
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

