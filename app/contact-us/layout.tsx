import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with Giriraj Industries",
  description: "Contact Giriraj Industries for inquiries about biomass heating systems, wood pellet burners, and industrial heating solutions. Located in Surat, Gujarat, India. Phone: +91 9825213536, Email: info@girirajco.com",
  keywords: "contact Giriraj Industries, biomass heating inquiry, wood pellet burner contact, industrial heating solutions, Surat Gujarat",
  alternates: {
    canonical: "https://girirajco.com/contact-us",
  },
  openGraph: {
    title: "Contact Us - Giriraj Industries",
    description: "Get in touch with Giriraj Industries for biomass heating systems and wood pellet burners. Located in Surat, Gujarat.",
    url: "https://girirajco.com/contact-us",
    siteName: "Giriraj Industries",
    images: [
      {
        url: "/product/Wood Pellet Burner.png",
        width: 1200,
        height: 630,
        alt: "Contact Giriraj Industries",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Giriraj Industries",
    description: "Get in touch with Giriraj Industries for biomass heating systems and wood pellet burners. Located in Surat, Gujarat.",
    images: ["/product/Wood Pellet Burner.png"],
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

