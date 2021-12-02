import React from "react";
import { usePlanets } from "./Planets.module";

const Planets = () => {
  const { planets, fetching } = usePlanets();
  
  if (fetching) {
    return <h2>Fetching star wars planets...</h2>;
  }

  return (
    <div>
      {planets.map((planet) => (
        <div key={planet.name}>{planet.name}</div>
      ))}
    </div>
  );
}

export default Planets
