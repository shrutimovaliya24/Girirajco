import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog - Biomass Heating Insights & Industry News",
  description: "Read the latest articles, insights, and news about biomass heating systems, wood pellet burners, renewable energy, and sustainable industrial heating solutions from Giriraj Industries.",
  keywords: "biomass heating blog, wood pellet burner articles, renewable energy news, sustainable heating insights, industrial heating blog",
  alternates: {
    canonical: "https://girirajco.com/blog",
  },
  openGraph: {
    title: "Blog - Biomass Heating Insights & Industry News",
    description: "Latest articles and insights about biomass heating systems and sustainable industrial heating.",
    url: "https://girirajco.com/blog",
    siteName: "Giriraj Industries",
    images: [
      {
        url: "/blog/blog1.png",
        width: 1200,
        height: 630,
        alt: "Giriraj Industries Blog",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Biomass Heating Insights & Industry News",
    description: "Latest articles and insights about biomass heating systems and sustainable industrial heating.",
    images: ["/blog/blog1.png"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

