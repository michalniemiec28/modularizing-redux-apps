import React from "react";
import { connect } from "react-redux";
import { getPlanets } from "./Planets.module";

class Planets extends React.Component {
  componentDidMount() {
    this.props.getPlanets();
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

const mapStateToProps = state => ({
  planets: state.planets.planets,
  error: state.planets.error,
  fetching: state.planets.fetching
});

const mapDispatchToProps = (dispatch) => ({
  getPlanets: () => dispatch(getPlanets())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Planets);
