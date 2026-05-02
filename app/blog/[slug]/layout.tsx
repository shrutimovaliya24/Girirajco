import type { Metadata } from 'next';
import blogPostsData from '../../../data/blog.json';
import { getBlogPostIdFromSlug, getBlogSlugById } from '../../../lib/blog-slugs';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const postId = getBlogPostIdFromSlug(slug);
  const canonicalSlug = postId != null ? getBlogSlugById(postId) : null;
  const post = postId != null ? blogPostsData.find((p) => p.id === postId) : undefined;

  if (!post || !canonicalSlug) {
    return {
      title: 'Blog Post Not Found - Giriraj Industries',
      description: 'The requested blog post could not be found.',
      robots: { index: false, follow: true },
    };
  }

  const title = post.title;
  const description = post.excerpt;
  const image = post.image;

  return {
    title: `${title} - Giriraj Industries`,
    description,
    keywords: `${post.category.toLowerCase()}, biomass heating, biomass pellet burners, industrial heating, ${title.toLowerCase()}`,
    alternates: {
      canonical: `https://girirajco.com/blog/${canonicalSlug}`,
    },
    openGraph: {
      title: `${title} - Giriraj Industries`,
      description,
      url: `https://girirajco.com/blog/${canonicalSlug}`,
      siteName: 'Giriraj Industries',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      section: post.category,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - Giriraj Industries`,
      description,
      images: [image],
    },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
