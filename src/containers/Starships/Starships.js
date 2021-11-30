import React from "react";

class Starships extends React.Component {
  componentDidMount() {
    const { getStarships, starships } = this.props;

    if (!starships.length) {
      getStarships();
    }
  }

  render() {
    const { fetching, starships } = this.props;
  
    if (fetching) {
      <h2>Fetching star wars starships...</h2>;
    }
  
    return (
      <div>
        {starships.map((starship) => (
          <div key={starship.name}>{starship.name}</div>
        ))}
      </div>
    );
  }
}

export default Starships
