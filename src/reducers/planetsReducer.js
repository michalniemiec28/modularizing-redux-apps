import {
  FETCHING_PLANETS,
  FETCHING_PLANETS_SUCCESS,
  FETCHING_PLANETS_FAILURE
} from "../actions/planetsActions";

const initialState = {
  fetching: false,
  planets: [],
  error: null
};

const planetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_PLANETS:
      return { ...state, fetching: true };
    case FETCHING_PLANETS_FAILURE:
      return { ...state, fetching: false, error: action.payload };
    case FETCHING_PLANETS_SUCCESS:
      return {
        ...state,
        planets: action.payload,
        fetching: false
      };
    default:
      return state;
  }
};

export default planetsReducer
