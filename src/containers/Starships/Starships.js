import React, { useEffect } from "react";

const Starships = ({ getStarships, starships, fetching }) => {
  useEffect(() => {
    if (!starships.length) {
      getStarships();
    }
  }, [])
  
  if (fetching) {
    return <h2>Fetching star wars starships...</h2>;
  }
  
  return (
    <div>
      {starships.map((starship) => (
        <div key={starship.name}>{starship.name}</div>
      ))}
    </div>
  );
}

export default Starships
