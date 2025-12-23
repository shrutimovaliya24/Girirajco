import type { Metadata } from "next";
import { Poppins, Inter, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingContactWidget from "./components/FloatingContactWidget";
import I18nProvider from "./components/I18nProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://girirajco.com'),
  title: {
    default: "Giriraj Industries - High-Efficiency Biomass Heating Systems",
    template: "%s | Giriraj Industries"
  },
  description: "Giriraj Industries manufactures high-efficiency biomass heating systems and wood pellet burners that help industries cut energy costs by up to 56% and switch from fossil fuels to clean, sustainable wood pellets. Leading manufacturer in India.",
  keywords: [
    "biomass heating systems",
    "wood pellet burners",
    "biomass burners",
    "industrial heating",
    "wood pellets",
    "renewable energy",
    "sustainable heating",
    "GPB models",
    "fuel cost savings",
    "biomass equipment India",
    "industrial biomass solutions",
    "clean energy",
    "eco-friendly heating"
  ],
  authors: [{ name: "Giriraj Industries" }],
  creator: "Giriraj Industries",
  publisher: "Giriraj Industries",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://girirajco.com",
    siteName: "Giriraj Industries",
    title: "Giriraj Industries - High-Efficiency Biomass Heating Systems",
    description: "Manufacturing high-efficiency biomass heating systems and wood pellet burners. Cut energy costs by up to 56% with sustainable wood pellets.",
    images: [
      {
        url: "/product/Wood Pellet Burner.png",
        width: 1200,
        height: 630,
        alt: "Giriraj Industries - Wood Pellet Burner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Giriraj Industries - High-Efficiency Biomass Heating Systems",
    description: "Manufacturing high-efficiency biomass heating systems and wood pellet burners. Cut energy costs by up to 56% with sustainable wood pellets.",
    images: ["/product/Wood Pellet Burner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: "https://girirajco.com",
    languages: {
      "en": "https://girirajco.com",
      "gu": "https://girirajco.com/gu",
    },
  },
  category: "Industrial Equipment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#5FAA3F" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Surat, Gujarat, India" />
        <meta name="geo.position" content="21.1702;72.8311" />
        <meta name="ICBM" content="21.1702, 72.8311" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <link rel="alternate" hrefLang="en" href="https://girirajco.com" />
        <link rel="alternate" hrefLang="gu" href="https://girirajco.com/gu" />
        <link rel="alternate" hrefLang="x-default" href="https://girirajco.com" />
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Giriraj Industries",
              "url": "https://girirajco.com",
              "logo": "https://girirajco.com/logo.png",
              "description": "Manufacturer of high-efficiency biomass heating systems and wood pellet burners",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "628/5, Vav Gam, Pasodara Gam To, Patiya Road, Kamrej",
                "addressLocality": "Pasodara",
                "addressRegion": "Gujarat",
                "postalCode": "395013",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9825213536",
                "contactType": "Customer Service",
                "email": "info@girirajco.com",
                "areaServed": "IN",
                "availableLanguage": ["en", "gu"]
              },
              "sameAs": [
                "https://www.instagram.com/giriraj_india/"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        <I18nProvider>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingContactWidget />
        </I18nProvider>
      </body>
    </html>
  );
}
