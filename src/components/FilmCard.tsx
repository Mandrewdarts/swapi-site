import { useState, useEffect } from 'react';
import { fetchFilms } from '../api/swapi';
import type { Film } from '../types/swapi';

export function FilmsList() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchFilms()
      .then(setFilms)
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, []);

  if (error) return <div className="error-message">Error: {error}</div>;

  if (loading) {
    return (
      <section className="films-section">
        <div className="films-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-film" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="films-section">
      <div className="films-grid">
        {films.map((film) => (
          <article key={film.url} className="film-card">
            <div className="film-card__header">
              <span className="film-card__episode">Episode {film.episode_id}</span>
              <h3 className="film-card__title">{film.title}</h3>
              <time className="film-card__date">{film.release_date}</time>
            </div>
            <p className="film-card__crawl">
              {film.opening_crawl.slice(0, 280)}
              {film.opening_crawl.length > 280 ? '…' : ''}
            </p>
            <dl className="film-card__meta">
              <div><dt>Director</dt><dd>{film.director}</dd></div>
              <div><dt>Producer</dt><dd>{film.producer}</dd></div>
              <div><dt>Characters</dt><dd>{film.characters.length}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
