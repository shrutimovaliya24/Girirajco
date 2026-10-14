import { MetadataRoute } from 'next';
import { VIDEO_PRODUCT_SLUGS } from '../data/productVideos';
import { PRODUCT_DETAIL_SLUGS } from '../lib/product-slugs';
import blogPostsData from '../data/blog.json';
import { getBlogSlugById } from '../lib/blog-slugs';

// Date the main pages' content last changed. Update this when you edit
// page content, so Google can trust <lastmod> instead of seeing a new
// date on every build.
const SITE_CONTENT_UPDATED = '2026-10-14';

// "June 15, 2022" -> "2022-06-15"
function toIsoDate(date: string): string | undefined {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return undefined;
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');
  return `${parsed.getFullYear()}-${month}-${day}`;
}

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

  const mainPages: MetadataRoute.Sitemap = [...routes, ...productPages].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: SITE_CONTENT_UPDATED,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.startsWith('/products/') ? 0.9 : 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = (blogPostsData as Array<{ id: number; date: string }>)
    .map((post) => ({ slug: getBlogSlugById(post.id), date: toIsoDate(post.date) }))
    .filter((post): post is { slug: string; date: string | undefined } => Boolean(post.slug))
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      ...(post.date ? { lastModified: post.date } : {}),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  // No lastmod: these pages have no tracked content date.
  const videoProductPages: MetadataRoute.Sitemap = VIDEO_PRODUCT_SLUGS.map((slug) => ({
    url: `${baseUrl}/products/videos/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...mainPages, ...blogPages, ...videoProductPages];
}
