import type { FC } from "react";

export interface LinkCardData {
  url: string;
  title: string;
  description?: string;
  image?: string;
  siteName?: string;
  favicon?: string;
}

export const LinkCard: FC<{ url: string; data: LinkCardData | null }> = ({ url, data }) => {
  if (!data) {
    return (
      <a className="link-card link-card--fallback" href={url} target="_blank" rel="noopener noreferrer">
        <div className="link-card__body">
          <div className="link-card__title">{url}</div>
          <div className="link-card__site">
            <span>{hostname(url)}</span>
          </div>
        </div>
      </a>
    );
  }

  const site = data.siteName ?? hostname(data.url);
  return (
    <a className="link-card" href={url} target="_blank" rel="noopener noreferrer">
      <div className="link-card__body">
        <div className="link-card__title">{data.title}</div>
        {data.description && <div className="link-card__desc">{data.description}</div>}
        <div className="link-card__site">
          {data.favicon && (
            <img className="link-card__favicon" src={data.favicon} alt="" loading="lazy" decoding="async" />
          )}
          <span>{site}</span>
        </div>
      </div>
      {data.image && (
        <div className="link-card__image">
          <img src={data.image} alt="" loading="lazy" decoding="async" />
        </div>
      )}
    </a>
  );
};

const hostname = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};
