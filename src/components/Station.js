// src/components/Station.js
import React from 'react';

const Station = ({ name, availableBikes, availableSlots }) => {
  return (
    <div className="station">
      <h3>{name}</h3>
      <p>Available Bikes: {availableBikes}</p>
      <p>Available Slots: {availableSlots}</p>
      <style jsx>{`
        .station {
          background-color: #f4f4f4;
          padding: 10px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default Station;
