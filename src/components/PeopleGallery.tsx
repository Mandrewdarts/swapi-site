import { useState, useEffect } from 'react';
import { fetchPeople } from '../api/swapi';
// import { fetchCharacterImageMap, getCharacterImageUrl } from '../api/characterImages';
import type { Person } from '../types/swapi';
import { ResourceCard } from './ResourceCard';

export function PeopleGallery() {
  const [people, setPeople] = useState<Person[]>([]);
  // const [imageMap, setImageMap] = useState<Map<string, string> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   fetchCharacterImageMap().then(setImageMap).catch(() => setImageMap(new Map()));
  // }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPeople(page, search || undefined)
      .then((data) => {
        setPeople(data.results);
        setHasNext(!!data.next);
        setHasPrev(!!data.previous);
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, [page, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <section className="gallery">
      <div className="gallery__controls">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="search"
            placeholder="Search characters..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn btn--primary">
            Search
          </button>
        </form>
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
          {people.map((person) => (
            <ResourceCard key={person.url} title={person.name}>
              <dl className="meta-list">
                <div>
                  <dt>Height</dt>
                  <dd>{person.height} cm</dd>
                </div>
                <div>
                  <dt>Mass</dt>
                  <dd>{person.mass} kg</dd>
                </div>
                <div>
                  <dt>Birth</dt>
                  <dd>{person.birth_year}</dd>
                </div>
                <div>
                  <dt>Gender</dt>
                  <dd>{person.gender}</dd>
                </div>
                <div>
                  <dt>Hair</dt>
                  <dd>{person.hair_color}</dd>
                </div>
                <div>
                  <dt>Skin</dt>
                  <dd>{person.skin_color}</dd>
                </div>
                <div>
                  <dt>Eyes</dt>
                  <dd>{person.eye_color}</dd>
                </div>
                {/* Films section removed as requested */}
              </dl>
            </ResourceCard>
          ))}
        </div>
      )}
    </section>
  );
}
