// src/pages/radar.js
import React, { useEffect, useState } from 'react';
import Station from '../components/Station';
import Radar from '../components/Radar';

const RadarPage = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://api.citybik.es/v2/networks/velo-antwerpen')
      .then(response => response.json())
      .then(data => {
        const stationsData = data.network.stations.slice(0, 3);
        setStations(stationsData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching station data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1 className="title">Velo stations</h1>
      <Radar stations={stations} />
      <div className="stations">
        {stations.map(station => (
          <div key={station.id}>
            <a href={`/station/${station.id}`} className="station-link">
              <Station 
                name={station.name} 
                availableBikes={station.free_bikes} 
                availableSlots={station.empty_slots} 
              />
            </a>
          </div>
        ))}
      </div>
      <style jsx>{`
        .container {
          margin-top: 20px;
          padding: 20px;
          background-image: url('styles/ab95dffe36b72b8ce2d27634b1c97e9c.jpg');
          background-size: cover;
          background-position: center;
          border-radius: 10px;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        }
        .title {
          color: black;
          font-size: 25px;
          margin-bottom: 20px;
          text-align: center;
        }
        .stations {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        .station-link {
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }
        .station-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default RadarPage;

