import Image from "next/image";
import Link from "next/link";
import Icon from "../components/Icon";
import NeedHelp from "../components/NeedHelp";
import blogPostsData from "../../data/blog.json";
import { getBlogSlugById } from "../../lib/blog-slugs";
import { tCommon } from "../i18n/serverTranslate";

export default async function BlogPage() {
  const blogPosts = blogPostsData;
  const title = await tCommon("blog.title");
  const description = await tCommon("blog.description");
  const readMoreLabel = await tCommon("blog.readMore");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full bg-white py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10">
          <div className="text-center mb-1 sm:mb-1.5 md:mb-2">
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3"
              style={{ color: "#5FAA3F", fontFamily: "var(--font-poppins), Poppins, sans-serif", lineHeight: "1.2" }}
            >
              {title}
            </h1>
            <div className="flex justify-center mb-2 sm:mb-2.5">
              <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
            </div>
            <p
              className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="relative w-full bg-white pt-0 pb-4 sm:pb-5 md:pb-6 lg:pb-8 xl:pb-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {blogPosts.map((post) => {
              const slug = getBlogSlugById(post.id);
              if (!slug) return null;
              return (
              <article
                key={post.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-lg hover:border-[#5FAA3F] group h-full flex flex-col"
              >
                {/* Blog Image */}
                <div className="relative w-full h-32 sm:h-36 md:h-40 overflow-hidden bg-transparent">
                  <Image
                    src={post.image}
                    alt={`${post.title} (${post.category})`}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className="px-2 sm:px-3 py-1 text-white text-xs sm:text-xs font-semibold rounded-full" style={{ backgroundColor: '#5FAA3F' }}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-4 sm:p-5 flex flex-col grow">
                  {/* Meta Information */}
                  <div className="flex items-center flex-wrap gap-3 sm:gap-4 text-xs sm:text-xs md:text-sm text-gray-500 mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                    <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                      <Icon name="calendar" className="w-3 h-3 shrink-0" />
                      <span className="whitespace-nowrap">{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                      <Icon name="user" className="w-3 h-3 shrink-0" />
                      <span className="whitespace-nowrap">{post.author}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-2.5 md:mb-3 line-clamp-2 transition-colors duration-300 grow"
                    style={{ color: '#1A1A1A', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-3" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${slug}`}
                    className="inline-flex items-center gap-2 font-semibold text-xs sm:text-xs md:text-sm lg:text-base hover:gap-3 hover:bg-[#5FAA3F] hover:text-white px-2 py-1 rounded transition-all duration-300 group/link mt-auto text-[#5FAA3F]"
                  >
                    <span>{readMoreLabel}</span>
                    <Icon name="arrow-right" className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform duration-300" style={{ color: '#5FAA3F' }} />
                  </Link>
                </div>
              </article>
            );
            })}
          </div>
        </div>
      </section>

      {/* Need Help Section */}
      <NeedHelp />
    </div>
  );
}
