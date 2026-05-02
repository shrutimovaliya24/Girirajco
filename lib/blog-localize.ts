import blogPostsData from '../data/blog.json';
import type { Locale } from '../app/i18n/serverTranslate';
import { tCommon } from '../app/i18n/serverTranslate';

export type BlogPostRecord = (typeof blogPostsData)[number];

type SectionRecord = {
  heading?: string;
  content?: string;
  subheading?: string;
  details?: string;
  keyPoints?: string[];
};

const CATEGORY_I18N_KEY: Record<string, string> = {
  Economics: 'blog.categoryEconomics',
  'Food Processing': 'blog.categoryFoodProcessing',
  'Industrial Solutions': 'blog.categoryIndustrialSolutions',
  Sustainability: 'blog.categorySustainability',
};

async function tr(locale: Locale, key: string, fallback: string): Promise<string> {
  if (locale === 'en') return fallback;
  const value = await tCommon(key, locale);
  return value === key ? fallback : value;
}

async function localizeCategory(locale: Locale, label: string): Promise<string> {
  const mapKey = CATEGORY_I18N_KEY[label];
  if (!mapKey || locale === 'en') return label;
  return tr(locale, mapKey, label);
}

async function localizeSection(
  locale: Locale,
  postId: number,
  sectionIndex: number,
  enSection: SectionRecord
): Promise<SectionRecord> {
  if (locale === 'en') return enSection;

  const si = sectionIndex + 1;
  const prefix = `blog.blog${postId}Section${si}`;

  const heading = enSection.heading
    ? await tr(locale, `${prefix}Heading`, enSection.heading)
    : enSection.heading;
  const content = enSection.content
    ? await tr(locale, `${prefix}Content`, enSection.content)
    : enSection.content;

  const subheading =
    enSection.subheading != null
      ? await tr(locale, `${prefix}Subheading`, enSection.subheading)
      : undefined;

  const details =
    enSection.details != null
      ? await tr(locale, `${prefix}Details`, enSection.details)
      : undefined;

  let keyPoints = enSection.keyPoints;
  if (enSection.keyPoints?.length) {
    keyPoints = await Promise.all(
      enSection.keyPoints.map((p, k) =>
        tr(locale, `${prefix}Point${k + 1}`, p)
      )
    );
  }

  return {
    ...enSection,
    heading,
    content,
    subheading,
    details,
    keyPoints,
  };
}

/** Listing cards: localized title, excerpt, category */
export async function localizeBlogSummary(
  post: BlogPostRecord,
  locale: Locale
): Promise<{ title: string; excerpt: string; category: string }> {
  if (locale === 'en') {
    return {
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
    };
  }

  const id = post.id;
  const [title, excerpt, category] = await Promise.all([
    tr(locale, `blog.blog${id}Title`, post.title),
    tr(locale, `blog.blog${id}Excerpt`, post.excerpt),
    localizeCategory(locale, post.category),
  ]);

  return { title, excerpt, category };
}

/** Full article body for `[slug]` page */
export async function localizeBlogPostForDisplay(
  post: BlogPostRecord,
  locale: Locale
): Promise<BlogPostRecord> {
  if (locale === 'en') return post;

  const id = post.id;
  const rawContent = post.content as {
    introduction?: string;
    introductionImage?: string;
    sections?: SectionRecord[];
  };

  const introduction = rawContent.introduction
    ? await tr(locale, `blog.blog${id}Introduction`, rawContent.introduction)
    : rawContent.introduction;

  const sections = rawContent.sections?.length
    ? await Promise.all(
        rawContent.sections.map((s, idx) =>
          localizeSection(locale, id, idx, s)
        )
      )
    : rawContent.sections;

  const [title, excerpt, category] = await Promise.all([
    tr(locale, `blog.blog${id}Title`, post.title),
    tr(locale, `blog.blog${id}Excerpt`, post.excerpt),
    localizeCategory(locale, post.category),
  ]);

  return {
    ...post,
    title,
    excerpt,
    category,
    content: {
      ...rawContent,
      introduction: introduction ?? rawContent.introduction ?? '',
      sections: sections ?? rawContent.sections,
    },
  } as BlogPostRecord;
}

/** SEO metadata strings */
export async function localizeBlogMeta(
  post: BlogPostRecord,
  locale: Locale
): Promise<{ title: string; description: string; category: string }> {
  const summary = await localizeBlogSummary(post, locale);
  return {
    title: summary.title,
    description: summary.excerpt,
    category: summary.category,
  };
}
