import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://girirajco.com';
  
  // Static pages
  const routes = [
    '',
    '/about-us',
    '/products',
    '/contact-us',
    '/gallery',
    '/blog',
    '/products/videos',
  ];

  // Product detail pages
  const productPages = Array.from({ length: 5 }, (_, i) => i + 1).map(
    (id) => `/products/${id}`
  );

  // Blog pages (assuming 3 blog posts based on common structure)
  const blogPages = Array.from({ length: 3 }, (_, i) => i + 1).map(
    (id) => `/blog/${id}`
  );

  // Video product pages
  const videoProductPages = [
    'namkeen',
    'peanut',
    'chana',
    'fryms',
    'chikki',
    'banana-chips',
    'papad',
    'milk',
    'maida-items',
    'murmura',
    'steam-boiler',
    'hot-water-system',
    'aluminium',
    'cello-tape',
  ].map((slug) => `/products/videos/${slug}`);

  const allRoutes = [
    ...routes,
    ...productPages,
    ...blogPages,
    ...videoProductPages,
  ];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.startsWith('/products/') ? 0.9 : 0.8,
  }));
}

