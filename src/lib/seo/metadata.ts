export interface SeoInput {
  title: string;
  description: string;
  pathname: string;
  site: URL;
  image?: string;
  noindex?: boolean;
}

export function createSeoMetadata(input: SeoInput) {
  const canonical = new URL(input.pathname, input.site).toString();
  const image = input.image ? new URL(input.image, input.site).toString() : undefined;

  return {
    title: input.title,
    description: input.description,
    canonical,
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      image,
    },
    robots: input.noindex ? 'noindex, nofollow' : 'index, follow',
  };
}
