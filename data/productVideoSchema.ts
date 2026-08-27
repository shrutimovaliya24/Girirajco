import { productOrder, productVideos } from './productVideos';

const SITE = 'https://girirajco.com';

function productSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
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
