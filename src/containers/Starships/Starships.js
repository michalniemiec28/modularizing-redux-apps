import React from "react";
import { connect } from "react-redux";
import { getStarships } from "./Starships.module";

class Starships extends React.Component {
  componentDidMount() {
    this.props.getStarships();
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

const mapStateToProps = state => ({
  starships: state.starships.starships,
  error: state.starships.error,
  fetching: state.starships.fetching
});

const mapDispatchToProps = (dispatch) => ({
  getStarships: () => dispatch(getStarships())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Starships);
