import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "../../components/Icon";
import NeedHelp from "../../components/NeedHelp";
import blogPostsData from "../../../data/blog.json";
import { localizeBlogPostForDisplay } from "../../../lib/blog-localize";
import { getBlogPostIdFromSlug, getBlogSlugById } from "../../../lib/blog-slugs";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return (blogPostsData as Array<{ id: number }>)
    .map((p) => getBlogSlugById(p.id))
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postId = getBlogPostIdFromSlug(slug);
  const post = postId != null ? blogPostsData.find((p) => p.id === postId) : undefined;
  const backToBlogLabel = "Back to Blog";

  if (!post) {
    notFound();
  }

  if (!post.content || !post.content.sections || !Array.isArray(post.content.sections)) {
    notFound();
  }

  const displayPost = await localizeBlogPostForDisplay(post, "en");

  return (
    <div className="min-h-screen bg-white" lang="en">
      {/* Hero Section */}
      <section className="relative w-full bg-white py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#5FAA3F] transition-colors duration-300 mb-6 sm:mb-8"
          >
            <Icon name="arrow-left" className="w-4 h-4" />
            <span className="text-sm sm:text-base">{backToBlogLabel}</span>
          </Link>

          {/* Blog Header */}
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-[#5FAA3F] text-white text-xs sm:text-sm font-semibold rounded-full">
                {displayPost.category}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
              style={{ color: "#5FAA3F", fontFamily: "var(--font-poppins), Poppins, sans-serif", lineHeight: "1.2" }}
            >
              {displayPost.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Icon name="calendar" className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="user" className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="relative w-full bg-white py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10">
          <article className="max-w-6xl mx-auto">
            {/* Introduction */}
            {(displayPost.content as any)?.introductionImage ? (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-10 items-center">
                {/* Image - 40% */}
                <div className="order-2 lg:order-1 lg:col-span-2">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg bg-gray-50 min-h-[300px]">
                    <Image
                      src={(displayPost.content as any).introductionImage}
                      alt={`Introduction image for: ${displayPost.title}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                    />
                  </div>
                </div>
                {/* Text - 60% */}
                <div className="order-1 lg:order-2 lg:col-span-3">
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                    {(displayPost.content as any)?.introduction || "No introduction available"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none mb-8 sm:mb-10">
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                  {(displayPost.content as any)?.introduction || "No introduction available"}
                </p>
              </div>
            )}

            {/* Sections */}
            {displayPost.content?.sections && Array.isArray(displayPost.content.sections) && displayPost.content.sections.length > 0 && (
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              {displayPost.content.sections.map((section: any, index: number) => (
                <div key={index} className="relative">
                  {/* Section Heading */}
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6" style={{ color: "#5FAA3F", fontFamily: "var(--font-poppins), Poppins, sans-serif", lineHeight: "1.2" }}>
                    {section.heading || "Section"}
                  </h2>

                  {/* Section Content */}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                      {section.content || ""}
                    </p>

                    {/* Subheading */}
                    {section.subheading && (
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4" style={{ color: "#1A1A1A", fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
                        {section.subheading}
                      </h3>
                    )}

                    {/* Key Points */}
                    {section.keyPoints && (
                      <ul className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                        {section.keyPoints.map((point: string, pointIndex: number) => (
                          <li key={pointIndex} className="flex items-start gap-3">
                            <div className="mt-1 shrink-0">
                              <Icon name="check-circle" className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#5FAA3F' }} />
                            </div>
                            <p className="text-base sm:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                              {point}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Details */}
                    {section.details && (
                      <div className="bg-[#F5F5F5] rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 border-l-4" style={{ borderLeftColor: '#5FAA3F' }}>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                          {section.details}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            )}

            {/* Back to Blog Button */}
            <div className="mt-10 sm:mt-12 md:mt-16 pt-8 border-t border-gray-200">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                style={{ 
                  background: 'linear-gradient(90deg, #5FAA3F, #2E7D32)',
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif'
                }}
              >
                <Icon name="arrow-left" className="w-4 h-4" />
                <span>{backToBlogLabel}</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Need Help Section */}
      <NeedHelp />
    </div>
  );
}

