import React, { useEffect } from "react";

const Planets = ({ planets, getPlanets, fetching }) => {
  useEffect(() => {
    if (!planets.length) {
      getPlanets();
    }
  }, [])

  
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
