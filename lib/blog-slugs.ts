/** Stable English URL slugs for blog posts (SEO). */
export const BLOG_SLUG_BY_ID: Record<number, string> = {
  1: 'biomass-pellet-burner-roi-indian-industry',
  2: 'biomass-fired-batch-fryers-food-industry',
  3: 'indirect-hot-air-generator-drying-efficiency',
  4: 'biomass-pellets-industrial-decarbonization-india',
};

export function getBlogSlugById(id: number): string | undefined {
  return BLOG_SLUG_BY_ID[id];
}

export function getBlogPostIdFromSlug(slug: string): number | null {
  const found = Object.entries(BLOG_SLUG_BY_ID).find(([, s]) => s === slug);
  return found ? Number(found[0]) : null;
}

export const BLOG_DETAIL_SLUGS = Object.values(BLOG_SLUG_BY_ID);
