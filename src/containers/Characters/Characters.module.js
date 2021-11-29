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

const initialState = {
  fetchingCharacters: false,
  characters: [],
  fetchingCharacter: false,
  character: null,
  error: null
};

const charactersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_CHARACTERS:
      return { ...state, fetchingCharacters: true };
    case FETCHING_CHARACTERS_FAILURE:
      return { ...state, fetchingCharacters: false, error: action.payload };
    case FETCHING_CHARACTERS_SUCCESS:
      return {
        ...state,
        characters: action.payload,
        fetchingCharacters: false
      };
    case FETCHING_CHARACTER:
      return { ...state, fetchingCharacter: true };
    case FETCHING_CHARACTER_FAILURE:
      return { ...state, fetchingCharacter: false, error: action.payload };
    case FETCHING_CHARACTER_SUCCESS:
      return {
        ...state,
        character: action.payload,
        fetchingCharacter: false
      };
    default:
      return state;
  }
};

export default charactersReducer
