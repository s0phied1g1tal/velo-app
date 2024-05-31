// src/components/Radar.js
import React, { useEffect, useRef } from 'react';

const Radar = ({ stations }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 300;
    const height = canvas.height = 300;
    const center = { x: width / 2, y: height / 2 };
    let angle = 0;

    const drawRadar = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw radar grid
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(center.x, center.y, 100, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(center.x, center.y, 50, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(center.x, 0);
      ctx.lineTo(center.x, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, center.y);
      ctx.lineTo(width, center.y);
      ctx.stroke();

      // Draw sweep
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.arc(center.x, center.y, 150, angle, angle + Math.PI / 6);
      ctx.closePath();
      ctx.fill();

      angle += 0.05;

      // Draw stations
      stations.forEach((station, index) => {
        const stationAngle = (index / stations.length) * Math.PI * 2;
        const radius = 80;
        const x = center.x + radius * Math.cos(stationAngle);
        const y = center.y + radius * Math.sin(stationAngle);

        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.font = '10px Arial';
        ctx.fillText(station.name, x - 15, y - 10);
      });
    };

    const animateRadar = () => {
      drawRadar();
      requestAnimationFrame(animateRadar);
    };

    animateRadar();
  }, [stations]);

  return (
    <div className="radar-container">

      <canvas ref={canvasRef}></canvas>
      <style jsx>{`
        .radar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        canvas {
          background-color: #f44336;
          border-radius: 50%;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Radar;
