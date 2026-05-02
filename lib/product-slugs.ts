/** Stable English URL slugs for product detail pages (SEO). */
export const PRODUCT_SLUG_BY_ID: Record<number, string> = {
  1: 'biomass-pellet-burner',
  2: 'biomass-pellet-stove',
  3: 'batch-fryer',
  4: 'hot-air-generator',
  5: 'aluminium-melting-furnace',
};

export function getProductSlugById(id: number): string | undefined {
  return PRODUCT_SLUG_BY_ID[id];
}

export function getProductIdFromSlug(slug: string): number | null {
  const found = Object.entries(PRODUCT_SLUG_BY_ID).find(([, s]) => s === slug);
  return found ? Number(found[0]) : null;
}

export const PRODUCT_DETAIL_SLUGS = Object.values(PRODUCT_SLUG_BY_ID);
