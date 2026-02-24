import { useState } from 'react';
import './App.css';
import { PeopleGallery } from './components/PeopleGallery';
import { PlanetsGrid } from './components/PlanetCard';
import { VehiclesGrid } from './components/VehicleCard';

type Tab = 'people' | 'planets' | 'vehicles';

function App() {
  const [tab, setTab] = useState<Tab>('people');

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Star Wars Databank</h1>
        <nav className="tabs">
          <button
            className={`tab ${tab === 'people' ? 'tab--active' : ''}`}
            onClick={() => setTab('people')}
          >
            People
          </button>
          <button
            className={`tab ${tab === 'planets' ? 'tab--active' : ''}`}
            onClick={() => setTab('planets')}
          >
            Planets
          </button>
          <button
            className={`tab ${tab === 'vehicles' ? 'tab--active' : ''}`}
            onClick={() => setTab('vehicles')}
          >
            Vehicles
          </button>
        </nav>
      </header>
      <main className="app-main">
        {tab === 'people' && <PeopleGallery />}
        {tab === 'planets' && <PlanetsGrid />}
        {tab === 'vehicles' && <VehiclesGrid />}
      </main>
    </div>
  );
}

export default App;
