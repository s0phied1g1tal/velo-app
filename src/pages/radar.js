// src/pages/radar.js
import React, { useEffect, useState } from 'react';
import Station from '../components/Station';
import Radar from '../components/Radar';

const RadarPage = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.citybik.es/v2/networks/velo-antwerpen')
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
          margin-top: 100px;
          padding: 40px;
          background-color: white;
          background-position: center;
       
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
        }
        .title {
          color: orange;
          font-size: 40px;
          margin-bottom: 20px;
          text-align: center;
        }
        .stations {
    
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        .station-link {
          text-decoration: none;
          color: black;
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

