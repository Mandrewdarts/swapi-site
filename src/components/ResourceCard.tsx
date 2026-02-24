import { useState } from 'react';

interface ResourceCardProps {
  imageUrl?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ResourceCard({ imageUrl, title, children, className = '' }: ResourceCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className={`resource-card ${className}`}>
      {imageUrl != null && (
        <div className="resource-card__image-wrap">
          <img
            src={imageError ? 'https://placehold.co/400x500/1a1a2e/4a5568?text=No+Image' : imageUrl}
            alt={title}
            className="resource-card__image"
            onError={() => setImageError(true)}
          />
        </div>
      )}
      <div className="resource-card__body">
        <h3 className="resource-card__title">{title}</h3>
        <div className="resource-card__meta">{children}</div>
      </div>
    </article>
  );
}
