import axios from "axios";

export const FETCHING_STARSHIPS = "FETCHING_STARSHIPS";
export const FETCHING_STARSHIPS_SUCCESS = "FETCHING_STARSHIPS_SUCCESS";
export const FETCHING_STARSHIPS_FAILURE = "FETCHING_STARSHIPS_FAILURE";

export const getStarships = () => dispatch => {
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
