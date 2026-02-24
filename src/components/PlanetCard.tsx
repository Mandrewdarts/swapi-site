import { useState, useEffect } from 'react';
import { fetchPlanets } from '../api/swapi';
import type { Planet } from '../types/swapi';
import { ResourceCard } from './ResourceCard';

export function PlanetsGrid() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPlanets(page)
      .then((data) => {
        setPlanets(data.results);
        setHasNext(!!data.next);
        setHasPrev(!!data.previous);
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, [page]);

  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <section className="gallery">
      <div className="gallery__controls">
        <div className="pagination">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={!hasPrev || loading}
            className="btn"
          >
            Previous
          </button>
          <span className="page-num">Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasNext || loading}
            className="btn"
          >
            Next
          </button>
        </div>
      </div>

      {loading ? (
        <div className="card-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      ) : (
        <div className="card-grid">
          {planets.map((planet) => (
            <ResourceCard key={planet.url} title={planet.name}>
              <dl className="meta-list">
                <div><dt>Climate</dt><dd>{planet.climate}</dd></div>
                <div><dt>Terrain</dt><dd>{planet.terrain}</dd></div>
                <div><dt>Population</dt><dd>{planet.population}</dd></div>
                <div><dt>Diameter</dt><dd>{planet.diameter} km</dd></div>
                <div><dt>Orbital</dt><dd>{planet.orbital_period} days</dd></div>
                <div><dt>Rotation</dt><dd>{planet.rotation_period} hrs</dd></div>
              </dl>
            </ResourceCard>
          ))}
        </div>
      )}
    </section>
  );
}
