// src/components/Bike.js
import React from 'react';

const Bike = () => {
  return (
    <div className="bike">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        {/* SVG path for the bike shape */}
      </svg>
      <style jsx>{`
        .bike {
          position: fixed;
          bottom: 0;
          left: -20%; /* Start off screen */
          animation: bikeMove 10s linear infinite; /* Adjust animation duration as needed */
          z-index: -1; /* Ensure it's behind other content */
        }

        @keyframes bikeMove {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Bike;
