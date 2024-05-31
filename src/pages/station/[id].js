// src/pages/station/[id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Radar from '../../components/Radar';

const StationDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://api.citybik.es/v2/networks/velo-antwerpen`)
        .then(response => response.json())
        .then(data => {
          const stationData = data.network.stations.find(st => st.id === id);
          setStation(stationData);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching station data:", error);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
        },
        error => {
          console.error("Error retrieving user location:", error);
          setUserCoords(null); // Reset userCoords if an error occurs
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setUserCoords(null); // Reset userCoords if geolocation is not supported
    }
  }, []);

  const handleBack = () => {
    router.back();
  };

  if (loading) return <div>Loading...</div>;
  if (!station) return <div>Station not found</div>;

  const totalBikesAndSlots = station.free_bikes + station.empty_slots;
  const bikeProgressWidth = (station.free_bikes / totalBikesAndSlots) * 100;
  const slotProgressWidth = (station.empty_slots / totalBikesAndSlots) * 100;

  return (
    <div className="container">
      <h1 className="title">Station {station.name}</h1>
      <div className="progress-bars">
        <div className="progress-bar">
          <p className="progress-label">Available Bikes: {station.free_bikes}</p>
          <div className="progress" style={{ width: `${bikeProgressWidth}%` }}></div>
        </div>
        <div className="progress-bar">
          <p className="progress-label">Available Slots: {station.empty_slots}</p>
          <div className="progress" style={{ width: `${slotProgressWidth}%` }}></div>
        </div>
      </div>
      <div className="radar">
        <h2 className="radar-title">Radar</h2>
        {userCoords && <Radar stations={[station]} userCoords={userCoords} />}
      </div>
      <button className="back-button" onClick={handleBack}>Back</button>
      <style jsx>{`
        .container {
          margin-top: 100px;
          padding: 20px;
          background-color: #f5f5f5;
          border-radius: 10px;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .title {
          color: #f44336;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .progress-bars {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        .progress-bar {
          width: 80%;
          background-color: #fafafa;
          border-radius: 10px;
          margin-bottom: 10px;
          overflow: hidden;
        }
        .progress {
          background-color: orange;
          height: 20px;
        }
        .progress-label {
          color: #333;
          margin: 5px;
          font-size: 14px;
        }
        .radar-title {
          color: red;
          margin-top: 20px;
          font-size: 20px;
        }
        .back-button {
          margin-top: 20px;
          background-color: orange;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 10px 20px;
          cursor: pointer;
          transition: background-color 0.3s;
          font-size: 16px;
        }
        .back-button:hover {
          background-color: #ef5350;
        }
      `}</style>
    </div>
  );
};

export default StationDetailPage;
