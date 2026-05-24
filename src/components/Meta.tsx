import type { FC } from "react";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, TWITTER } from "../consts";

export const Meta: FC<{
  pathname: string;
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
}> = ({ pathname, title, description = SITE_DESCRIPTION, canonical, noindex }) => {
  const fullTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  const pageTitle = title ?? SITE_TITLE;
  const canonicalUrl = canonical ?? new URL(pathname, SITE_URL).toString();
  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const ogImageUrl = new URL(`/cover${normalizedPath}cover.png`, SITE_URL).toString();
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
