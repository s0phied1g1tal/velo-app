// components/StationList.js

import Link from 'next/link';

const StationList = ({ stations }) => {
  return (
    <ul>
      {stations.map(station => (
        <li key={station.id}>
          <Link href={`/station/${station.id}`} legacyBehavior>
            <a>{station.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default StationList;
