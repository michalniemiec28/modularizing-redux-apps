import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FETCHING_STARSHIPS = "FETCHING_STARSHIPS";
const FETCHING_STARSHIPS_SUCCESS = "FETCHING_STARSHIPS_SUCCESS";
const FETCHING_STARSHIPS_FAILURE = "FETCHING_STARSHIPS_FAILURE";

const getStarships = dispatch => {
  dispatch({ type: FETCHING_STARSHIPS });
  axios
    .get("https://swapi.dev/api/starships")
    .then(({ data }) => {
      dispatch({
        type: FETCHING_STARSHIPS_SUCCESS,
        payload: data.results
      });
    })
    .catch(err => {
      dispatch({
        type: FETCHING_STARSHIPS_FAILURE,
        payload: err
      });
    });
};

export const useStarships = () => {
  const dispatch = useDispatch();
  const props = useSelector((state) => ({
    starships: state.starships.starships,
    error: state.starships.error,
    fetching: state.starships.fetching
  }))

  useEffect(() => {
    if (!props.starships.length) {
      getStarships(dispatch);
    }
  }, [])

  return props
}

const initialState = {
  fetching: false,
  starships: [],
  error: null
};

const starshipsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_STARSHIPS:
      return { ...state, fetching: true };
    case FETCHING_STARSHIPS_FAILURE:
      return { ...state, fetching: false, error: action.payload };
    case FETCHING_STARSHIPS_SUCCESS:
      return {
        ...state,
        starships: action.payload,
        fetching: false
      };
    default:
      return state;
  }
};

export default starshipsReducer
