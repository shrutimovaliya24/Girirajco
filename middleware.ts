import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getBlogSlugById } from './lib/blog-slugs';
import { getProductSlugById } from './lib/product-slugs';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const productMatch = pathname.match(/^\/products\/(\d+)$/);
  if (productMatch) {
    const id = Number(productMatch[1]);
    const slug = getProductSlugById(id);
    if (!slug) return NextResponse.next();
    url.pathname = `/products/${slug}`;
    return NextResponse.redirect(url, 308);
  }

  const blogMatch = pathname.match(/^\/blog\/(\d+)$/);
  if (blogMatch) {
    const id = Number(blogMatch[1]);
    const slug = getBlogSlugById(id);
    if (!slug) return NextResponse.next();
    url.pathname = `/blog/${slug}`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/products/:path*', '/blog/:path*'],
};
