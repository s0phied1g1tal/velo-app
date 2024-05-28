const StationDetail = ({ station }) => {
    if (!station) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>{station.name}</h1>
        <p>Beschikbare plaatsen: {station.empty_slots}</p>
        <p>Beschikbare fietsen: {station.free_bikes}</p>
      </div>
    );
  };
  
  export default StationDetail;
  