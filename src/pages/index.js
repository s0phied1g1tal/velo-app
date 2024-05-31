// src/pages/index.js
import React from 'react';

const IndexPage = () => {
  return (
    <div className="container">
      <div className="content">
        <h1>Welcome to My Velo App</h1>
        <p>Explore the city with ease using our bike sharing service!</p>
        <button>Get Started</button>
      </div>
      <style jsx>{`
        .container {
          background-color: #63a4ff; /* Sky blue */
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          position: relative;
          overflow: hidden;
        }
        .city-skyline {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 200px;
          background-color: transparent;
        }
        .building {
          position: absolute;
          bottom: 0;
          width: 40px;
          height: 100px;
          background-color: #fff; /* White */
          border-radius: 5px;
        }
        .building-1 {
          left: 20%;
          height: 120px;
        }
        .building-2 {
          left: 45%;
          height: 90px;
        }
        .building-3 {
          left: 70%;
          height: 140px;
        }
        .building-4 {
          left: 90%;
          height: 110px;
        }
        .building-window {
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background-color: #ffe066; /* Yellow */
          border-radius: 50%;
        }
      `}</style>
      <div className="city-skyline">
        <div className="building building-1">
          <div className="building-window"></div>
          <div className="building-window" style={{ bottom: '20px' }}></div>
          <div className="building-window" style={{ bottom: '40px' }}></div>
          <div className="building-window" style={{ bottom: '60px' }}></div>
          <div className="building-window" style={{ bottom: '80px' }}></div>
        </div>
        <div className="building building-2">
          <div className="building-window"></div>
          <div className="building-window" style={{ bottom: '20px' }}></div>
          <div className="building-window" style={{ bottom: '40px' }}></div>
          <div className="building-window" style={{ bottom: '60px' }}></div>
        </div>
        <div className="building building-3">
          <div className="building-window"></div>
          <div className="building-window" style={{ bottom: '20px' }}></div>
          <div className="building-window" style={{ bottom: '40px' }}></div>
          <div className="building-window" style={{ bottom: '60px' }}></div>
          <div className="building-window" style={{ bottom: '80px' }}></div>
          <div className="building-window" style={{ bottom: '100px' }}></div>
        </div>
        <div className="building building-4">
          <div className="building-window"></div>
          <div className="building-window" style={{ bottom: '20px' }}></div>
          <div className="building-window" style={{ bottom: '40px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
