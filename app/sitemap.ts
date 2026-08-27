import { MetadataRoute } from 'next';
import { VIDEO_PRODUCT_SLUGS } from '../data/productVideos';
import { PRODUCT_DETAIL_SLUGS } from '../lib/product-slugs';
import blogPostsData from '../data/blog.json';
import { getBlogSlugById } from '../lib/blog-slugs';

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

  // Product detail pages (slug URLs)
  const productPages = PRODUCT_DETAIL_SLUGS.map((slug) => `/products/${slug}`);

  const blogPages = (blogPostsData as Array<{ id: number }>)
    .map((post) => getBlogSlugById(post.id))
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => `/blog/${slug}`);

  const videoProductPages = VIDEO_PRODUCT_SLUGS.map(
    (slug) => `/products/videos/${slug}`
  );

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

