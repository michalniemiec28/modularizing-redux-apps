import React from "react";
import { useStarships } from "./Starships.module";

const Starships = () => {
  const { starships, fetching } = useStarships();
  
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
