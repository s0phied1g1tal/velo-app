import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
import styles from './StationDetail.module.css';

const stations = [
  { id: 1, name: 'Centraal Station', imageUrl: '/images/fiets.png' },
  { id: 2, name: 'Groenplaats', imageUrl: '/images/fiets.png' },
  { id: 3, name: 'Sint-Vincentius', imageUrl: '/images/fiets.png' }
];

export default function StationDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const result = await axios.get('http://api.citybik.es/v2/networks/velo-antwerpen');
        const station = result.data.network.stations.find(s => s.id.toString() === id);
        const stationData = stations.find(s => s.id.toString() === id);
        if (station) {
          setStation({ ...station, ...stationData });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching station data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!station) {
    return <div>Station not found.</div>;
  }

  const totalSlots = station.free_bikes + station.empty_slots;
  const bikePercentage = (station.free_bikes / totalSlots) * 100;
  const slotsPercentage = (station.empty_slots / totalSlots) * 100;

  return (
    <div className={styles.customContainer}>
      <h1 className={styles.customText}>{station.name}</h1>
      <p className={styles.customText}>Available bikes: {station.free_bikes}</p>
      <ProgressBar now={bikePercentage} label={`${station.free_bikes}`} className={styles.customProgressBar} />
      <p className={styles.customText}>Empty slots: {station.empty_slots}</p>
      <ProgressBar now={slotsPercentage} label={`${station.empty_slots}`} className={styles.customProgressBar} />
      <Link href="/" legacyBehavior>
        <a className={styles.customText} style={{ display: 'block', marginTop: '20px' }}>Back to Home</a>
      </Link>
    </div>
  );
}
