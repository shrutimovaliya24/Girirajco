import type { Metadata } from 'next';
import blogPostsData from '../../../data/blog.json';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const postId = parseInt(params.id);
  const post = blogPostsData.find((p) => p.id === postId);

  if (!post) {
    return {
      title: "Blog Post Not Found - Giriraj Industries",
      description: "The requested blog post could not be found.",
    };
  }

  const title = post.title;
  const description = post.excerpt;
  const image = post.image;

  return {
    title: `${title} - Giriraj Industries`,
    description,
    keywords: `${post.category.toLowerCase()}, biomass heating, wood pellet burners, industrial heating, ${title.toLowerCase()}`,
    alternates: {
      canonical: `https://girirajco.com/blog/${postId}`,
    },
    openGraph: {
      title: `${title} - Giriraj Industries`,
      description,
      url: `https://girirajco.com/blog/${postId}`,
      siteName: "Giriraj Industries",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      section: post.category,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
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

