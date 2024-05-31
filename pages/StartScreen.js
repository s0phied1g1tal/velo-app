// src/components/StartScreen.js
import axios from 'axios';
import { useEffect, useState } from 'react';
import StationList from '../components/StationList';
import Radar from '../components/Radar';

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
   <h1>Velo Antwerpen Stations</h1>
      <Radar />
      <StationList stations={stations} />
    </div>
  );
}

