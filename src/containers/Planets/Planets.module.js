import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FETCHING_PLANETS = "FETCHING_PLANETS";
const FETCHING_PLANETS_SUCCESS = "FETCHING_PLANETS_SUCCESS";
const FETCHING_PLANETS_FAILURE = "FETCHING_PLANETS_FAILURE";

const getPlanets = dispatch => {
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

export const usePlanets = () => {
  const dispatch = useDispatch();
  const props = useSelector((state) => ({
    planets: state.planets.planets,
    error: state.planets.error,
    fetching: state.planets.fetching
  }))

  useEffect(() => {
    if (!props.planets.length) {
      getPlanets(dispatch);
    }
  }, [])

  return props
}

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
