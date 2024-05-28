// pages/station/[id].js

import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StationDetail from '../../components/StationDetail';

export default function StationDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [station, setStation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchData() {
        try {
          const result = await axios.get('http://api.citybik.es/v2/networks/velo-antwerpen');
          const stationData = result.data.network.stations.find(station => station.id === id);
          if (stationData) {
            setStation(stationData);
          } else {
            setError('Station niet gevonden.');
          }
        } catch (error) {
          setError('Er is een fout opgetreden bij het ophalen van de gegevens.');
          console.error(error);
        }
      }
      fetchData();
    }
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <StationDetail station={station} />
    </div>
  );
}
