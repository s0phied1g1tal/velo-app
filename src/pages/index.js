// src/pages/index.js
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="container">
      <h1 className="title">Welcome to Velo App</h1>
      <p className="description">Explore the city with Velo bike rentals.</p>
      <Link href="/radar">
        <div className="button">Start Exploring</div>
      </Link>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f44336;
          color: #fff;
        }
        .title {
          font-size: 36px;
          margin-bottom: 20px;
        }
        .description {
          font-size: 18px;
          margin-bottom: 30px;
        }
        .button {
          background-color: orange;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          font-size: 18px;
          text-decoration: none;
          transition: background-color 0.3s;
          cursor: pointer;
        }
        .button:hover {
          background-color: #1565c0;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
