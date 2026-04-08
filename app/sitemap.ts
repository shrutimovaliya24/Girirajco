import { MetadataRoute } from 'next';
import blogPostsData from '../data/blog.json';

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

  // Blog pages (source of truth: `data/blog.json`)
  const blogPages = blogPostsData.map((post) => `/blog/${post.id}`);

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

