import React from "react";

class Planets extends React.Component {
  componentDidMount() {
    const { planets, getPlanets } = this.props;

    if (!planets.length) {
      getPlanets();
    }
  }

  render() {
    const { fetching, planets } = this.props;
  
    if (fetching) {
      <h2>Fetching star wars planets...</h2>;
    }
  
    return (
      <div>
        {planets.map((planet) => (
          <div key={planet.name}>{planet.name}</div>
        ))}
      </div>
    );
  }
}

export default Planets
