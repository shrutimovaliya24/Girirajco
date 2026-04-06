import { productOrder, productVideos, type ProductVideoData } from './productVideos';

const SITE = 'https://girirajco.com';
const DEFAULT_THUMBNAIL = `${SITE}/product/Wood%20Pellet%20Burner.png`;

function productSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

function collectSrcs(data: ProductVideoData): string[] {
  const out: string[] = [];
  if (data.videos) {
    for (const v of data.videos) out.push(v.src);
  }
  if (data.categories) {
    for (const arr of Object.values(data.categories)) {
      for (const v of arr) out.push(v.src);
    }
  }
  return out;
}

/** Absolute URL for static files under /public (handles spaces in paths). */
function absoluteFromPath(path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return new URL(clean, `${SITE}/`).href;
}

/**
 * JSON-LD @graph of VideoObject entries for all clips on a product video page.
 */
export function buildProductVideoJsonLd(productSlugParam: string): {
  '@context': string;
  '@graph': Record<string, unknown>[];
} | null {
  const productName = productOrder.find((n) => productSlug(n) === productSlugParam);
  if (!productName) return null;

  const data = productVideos[productName];
  if (!data) return null;

  const srcs = collectSrcs(data);
  if (srcs.length === 0) return null;

  const watchPage = `${SITE}/products/videos/${productSlugParam}`;

  const graph = srcs.map((src, i) => ({
    '@type': 'VideoObject',
    '@id': `${watchPage}#video-${i + 1}`,
    name: `${productName} — equipment demonstration ${i + 1}`,
    description: `Giriraj Industries biomass heating equipment in action: ${productName}. Demonstration video ${i + 1} of ${srcs.length}.`,
    thumbnailUrl: DEFAULT_THUMBNAIL,
    contentUrl: absoluteFromPath(src),
    embedUrl: watchPage,
    publisher: {
      '@type': 'Organization',
      name: 'Giriraj Industries',
      url: SITE,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function buildVideosHubItemListJsonLd(): {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  numberOfItems: number;
  itemListElement: Record<string, unknown>[];
} {
  const items = productOrder
    .filter((name) => {
      const d = productVideos[name];
      return Boolean(d && (d.videos || d.categories));
    })
    .map((name, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'WebPage',
        name: `${name} — product videos`,
        url: `${SITE}/products/videos/${productSlug(name)}`,
        description: `Watch Giriraj Industries biomass heating equipment videos for ${name}.`,
      },
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Product demonstration videos',
    description:
      'Biomass heating and industrial equipment demonstration videos by application.',
    numberOfItems: items.length,
    itemListElement: items,
  };
}
