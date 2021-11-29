import axios from "axios";

export const FETCHING_CHARACTERS = "FETCHING_CHARACTERS";
export const FETCHING_CHARACTERS_SUCCESS = "FETCHING_CHARACTERS_SUCCESS";
export const FETCHING_CHARACTERS_FAILURE = "FETCHING_CHARACTERS_FAILURE";
export const FETCHING_CHARACTER = "FETCHING_CHARACTER";
export const FETCHING_CHARACTER_SUCCESS = "FETCHING_CHARACTER_SUCCESS";
export const FETCHING_CHARACTER_FAILURE = "FETCHING_CHARACTER_FAILURE";

export const getCharacters = () => dispatch => {
  dispatch({ type: FETCHING_CHARACTERS });
  axios
    .get("https://swapi.dev/api/people")
    .then(({ data }) => {
      dispatch({
        type: FETCHING_CHARACTERS_SUCCESS,
        payload: data.results
      });
    })
    .catch(err => {
      dispatch({
        type: FETCHING_CHARACTERS_FAILURE,
        payload: err
      });
    });
};

export const getCharacter = (url) => dispatch => {
  dispatch({ type: FETCHING_CHARACTER });
  axios
    .get(url)
    .then(({ data }) => {
      dispatch({
        type: FETCHING_CHARACTER_SUCCESS,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCHING_CHARACTER_FAILURE,
        payload: err
      });
    });
};
