import { useState } from 'react';

interface ResourceCardProps {
  imageUrl?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ResourceCard({
  imageUrl,
  title,
  children,
  className = '',
}: ResourceCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className={`resource-card ${className}`}>
      {/* Image removed for People tab as requested */}
      <div className="resource-card__body">
        <h3 className="resource-card__title">{title}</h3>
        <div className="resource-card__meta">{children}</div>
      </div>
    </article>
  );
}
