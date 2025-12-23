import Hero from './components/Hero';
import AboutUs from './components/AboutUs';

import FuelSavingsCalculator from './components/FuelSavingsCalculator';
import WhyChooseUs from './components/WhyChooseUs';
import SectorsWeCover from './components/SectorsWeCover';
import Testimonials from './components/Testimonials';
import NeedHelp from './components/NeedHelp';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Home - High-Efficiency Biomass Heating Systems",
  description: "Giriraj Industries manufactures high-efficiency biomass heating systems and wood pellet burners. Calculate your fuel savings and discover how you can reduce energy costs by up to 56% with sustainable wood pellets.",
  keywords: "biomass heating, wood pellet burners, fuel savings calculator, industrial heating, renewable energy, sustainable heating",
  alternates: {
    canonical: "https://girirajco.com",
  },
  openGraph: {
    title: "Giriraj Industries - High-Efficiency Biomass Heating Systems",
    description: "Manufacturing high-efficiency biomass heating systems. Calculate your fuel savings and reduce energy costs by up to 56%.",
    url: "https://girirajco.com",
    siteName: "Giriraj Industries",
    images: [
      {
        url: "/product/Wood Pellet Burner.png",
        width: 1200,
        height: 630,
        alt: "Giriraj Industries - High-Efficiency Biomass Heating Systems",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Giriraj Industries - High-Efficiency Biomass Heating Systems",
    description: "Manufacturing high-efficiency biomass heating systems. Calculate your fuel savings and reduce energy costs by up to 56%.",
    images: ["/product/Wood Pellet Burner.png"],
  },
};

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Giriraj Industries",
    "url": "https://girirajco.com",
    "description": "Manufacturer of high-efficiency biomass heating systems and wood pellet burners",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://girirajco.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Wood Pellet Burner - GPB Series",
    "description": "High-efficiency biomass heating systems and wood pellet burners that help industries cut energy costs by up to 56%",
    "image": "https://girirajco.com/product/Wood Pellet Burner.png",
    "brand": {
      "@type": "Brand",
      "name": "Giriraj Industries"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Giriraj Industries"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "lowPrice": "50000",
      "highPrice": "500000",
      "offerCount": "1",
      "url": "https://girirajco.com/products/1"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      
      <Hero />
      <AboutUs />
     
      <FuelSavingsCalculator />
      <WhyChooseUs />
      <SectorsWeCover />
      <Testimonials />
      <NeedHelp />
    </div>
  );
}
