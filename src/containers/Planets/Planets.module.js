import axios from "axios";

export const FETCHING_PLANETS = "FETCHING_PLANETS";
export const FETCHING_PLANETS_SUCCESS = "FETCHING_PLANETS_SUCCESS";
export const FETCHING_PLANETS_FAILURE = "FETCHING_PLANETS_FAILURE";

export const getPlanets = () => dispatch => {
  dispatch({ type: FETCHING_PLANETS });
  axios
    .get("https://swapi.dev/api/planets")
    .then(({ data }) => {
      dispatch({
        type: FETCHING_PLANETS_SUCCESS,
        payload: data.results
      });
    })
    .catch(err => {
      dispatch({
        type: FETCHING_PLANETS_FAILURE,
        payload: err
      });
    });
};

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
