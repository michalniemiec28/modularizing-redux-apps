import { connect } from "react-redux";
import planetsReducer, { getPlanets } from "./Planets.module";
import Planets from './Planets'
import { store } from '../../store'

store.injectReducer('planets', planetsReducer)

const mapStateToProps = state => ({
  planets: state.planets.planets,
  error: state.planets.error,
  fetching: state.planets.fetching
});
  
const mapDispatchToProps = {
  getPlanets,
}
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Planets);
  