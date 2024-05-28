import React, { useEffect, useRef, useState } from 'react';
import styles from './Radar.module.css';

const stations = [
  { id: 1, name: 'Centraal Station', latitude: 51.2172, longitude: 4.4211 },
  { id: 2, name: 'Groenplaats', latitude: 51.2194, longitude: 4.4010 },
  { id: 3, name: 'Sint-Vincentius', latitude: 51.2148, longitude: 4.4192 }
];

const Radar = () => {
  const radarRef = useRef(null);
  const [userPosition, setUserPosition] = useState(null);

  // Function to convert lat/lon to x/y coordinates on the radar
  const convertToXY = (latitude, longitude, centerLatitude, centerLongitude, radius) => {
    const x = (longitude - centerLongitude) * 100000; // scale factor for longitude
    const y = (latitude - centerLatitude) * 100000; // scale factor for latitude
    return {
      x: radius + x,
      y: radius - y
    };
  };

  // Function to calculate the distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  // Function to calculate the angle between two coordinates
  const calculateAngle = (lat1, lon1, lat2, lon2) => {
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
    const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
              Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);
    return Math.atan2(y, x);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setUserPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, error => {
        console.error('Error obtaining user location:', error);
        // Default to a known location if user location is not available
        setUserPosition({
          latitude: 51.2172,
          longitude: 4.4211
        });
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Default to a known location if geolocation is not supported
      setUserPosition({
        latitude: 51.2172,
        longitude: 4.4211
      });
    }
  }, []);

  useEffect(() => {
    if (!userPosition) return;

    const ctx = radarRef.current.getContext('2d');
    const radarRadius = radarRef.current.width / 2;

    const drawRadar = () => {
      ctx.clearRect(0, 0, radarRef.current.width, radarRef.current.height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 2;

      // Draw radar circles
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(radarRadius, radarRadius, (radarRadius / 3) * i, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Draw stations
      stations.forEach(station => {
        const distance = calculateDistance(userPosition.latitude, userPosition.longitude, station.latitude, station.longitude);
        const angle = calculateAngle(userPosition.latitude, userPosition.longitude, station.latitude, station.longitude);
        const x = radarRadius + Math.cos(angle) * (radarRadius / 3);
        const y = radarRadius - Math.sin(angle) * (radarRadius / 3);

        // Draw arrow
        ctx.beginPath();
        ctx.moveTo(radarRadius, radarRadius);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#ff5a5f';
        ctx.stroke();

        // Draw station name and distance
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.fillText(`${station.name} (${distance.toFixed(2)} km)`, x + 10, y);
      });
    };

    // Draw sweeping line
    const sweep = () => {
      drawRadar();

      const now = new Date();
      const sweepAngle = ((now.getSeconds() + now.getMilliseconds() / 1000) / 60) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(radarRadius, radarRadius);
      ctx.lineTo(radarRadius + radarRadius * Math.cos(sweepAngle), radarRadius + radarRadius * Math.sin(sweepAngle));
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.6)';
      ctx.stroke();
    };

    drawRadar(); // Initial draw
    const interval = setInterval(sweep, 50);
    return () => clearInterval(interval);
  }, [userPosition]);

  return <canvas ref={radarRef} width="300" height="300" className={styles.radar}></canvas>;
};

export default Radar;
