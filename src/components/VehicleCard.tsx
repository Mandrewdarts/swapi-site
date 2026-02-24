import { useState, useEffect } from 'react';
import { fetchVehicles } from '../api/swapi';
import type { Vehicle } from '../types/swapi';
import { ResourceCard } from './ResourceCard';

export function VehiclesGrid() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchVehicles(page)
      .then((data) => {
        setVehicles(data.results);
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
          {vehicles.map((vehicle) => (
            <ResourceCard key={vehicle.url} title={vehicle.name}>
              <dl className="meta-list">
                <div><dt>Model</dt><dd>{vehicle.model}</dd></div>
                <div><dt>Manufacturer</dt><dd>{vehicle.manufacturer}</dd></div>
                <div><dt>Cost</dt><dd>{vehicle.cost_in_credits}</dd></div>
                <div><dt>Length</dt><dd>{vehicle.length} m</dd></div>
                <div><dt>Speed</dt><dd>{vehicle.max_atmosphering_speed}</dd></div>
                <div><dt>Crew</dt><dd>{vehicle.crew}</dd></div>
                <div><dt>Passengers</dt><dd>{vehicle.passengers}</dd></div>
                <div><dt>Cargo</dt><dd>{vehicle.cargo_capacity} kg</dd></div>
              </dl>
            </ResourceCard>
          ))}
        </div>
      )}
    </section>
  );
}
