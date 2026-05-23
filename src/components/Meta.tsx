import type { ImageMetadata } from "astro";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, TWITTER } from "../consts";
import type { FC } from "react";

const absoluteUrl = (input: string): string => {
  return new URL(input, SITE_URL).toString();
};

const resolveOgImage = (pathname: string, ogImage: ImageMetadata | string | undefined): string => {
  if (typeof ogImage === "string") return absoluteUrl(ogImage);
  if (ogImage && "src" in ogImage) return absoluteUrl(ogImage.src);
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return absoluteUrl(`/cover${normalized}cover.png`);
};

export const Meta: FC<{
  pathname: string;
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: ImageMetadata | string;
  noindex?: boolean;
}> = ({ pathname, title, description = SITE_DESCRIPTION, canonical, ogImage, noindex }) => {
  const fullTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  const pageTitle = title ?? SITE_TITLE;
  const canonicalUrl = canonical ?? absoluteUrl(pathname);
  const ogImageUrl = resolveOgImage(pathname, ogImage);
  const ogType = title ? "article" : "website";

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={SITE_TITLE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </>
  );
};
