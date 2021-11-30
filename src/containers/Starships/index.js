import Starships from './Starships'
import { connect } from "react-redux";
import starshipsReducer, { getStarships } from './Starships.module'
import { store } from '../../store'

store.injectReducer('starships', starshipsReducer)

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
