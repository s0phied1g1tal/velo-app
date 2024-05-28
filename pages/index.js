import axios from 'axios';
import { useEffect, useState } from 'react';
import StationList from '../components/StationList';
import Radar from '../components/radar';

export default function Home() {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get('http://api.citybik.es/v2/networks/velo-antwerpen');
        setStations(result.data.network.stations.slice(0, 3)); // Selecteer de eerste 3 stations
      } catch (error) {
        setError('Er is een fout opgetreden bij het ophalen van de gegevens.');
        console.error(error);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <div className="menu">
        <h1>Velo Antwerpen Stations</h1>
        <button onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
      </div>
      {menuOpen && (
        <ul>
          <li><a href="#">Link 1</a></li>
          <li><a href="#">Link 2</a></li>
          <li><a href="#">Link 3</a></li>
        </ul>
      )}
      <Radar />
      <StationList stations={stations} />
    </div>
  );
}
