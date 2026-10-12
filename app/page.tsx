import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import AchievementsSection from './components/AchievementsSection';
import HomeProducts from './components/HomeProducts';
import PelletSpecificationsSection from './components/PelletSpecificationsSection';
import FuelSavingsCalculator from './components/FuelSavingsCalculator';
import WhyChooseUs from './components/WhyChooseUs';
import SectorsWeCover from './components/SectorsWeCover';
import Testimonials from './components/Testimonials';
import NeedHelp from './components/NeedHelp';
import type { Metadata } from 'next';
import faqData from '../data/faq.json';

export const metadata: Metadata = {
  title: { absolute: "Biomass Heating Systems Manufacturer in India | Giriraj Industries" },
  description: "Giriraj Industries manufactures high-efficiency biomass heating systems and biomass pellet burners. Calculate your fuel savings and discover how you can reduce energy costs by up to 56% with sustainable biomass pellets.",
  keywords: "biomass heating, biomass pellet burners, fuel savings calculator, industrial heating, renewable energy, sustainable heating",
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
    "description": "Manufacturer of high-efficiency biomass heating systems and biomass pellet burners"
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Biomass Pellet Burner - GPB Series",
    "description": "High-efficiency biomass heating systems and biomass pellet burners that help industries cut energy costs by up to 56%",
    "provider": {
      "@type": "Organization",
      "name": "Giriraj Industries",
      "url": "https://girirajco.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://girirajco.com"
      }
    ]
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <Hero />
      <AboutUs />
      <AchievementsSection />
      <HomeProducts />
      <PelletSpecificationsSection />
      <FuelSavingsCalculator />
      <WhyChooseUs />
      <SectorsWeCover />
      <Testimonials />
      <NeedHelp />
    </div>
  );
}
