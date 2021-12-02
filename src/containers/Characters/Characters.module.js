import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FETCHING_CHARACTERS = "FETCHING_CHARACTERS";
const FETCHING_CHARACTERS_SUCCESS = "FETCHING_CHARACTERS_SUCCESS";
const FETCHING_CHARACTERS_FAILURE = "FETCHING_CHARACTERS_FAILURE";
const FETCHING_CHARACTER = "FETCHING_CHARACTER";
const FETCHING_CHARACTER_SUCCESS = "FETCHING_CHARACTER_SUCCESS";
const FETCHING_CHARACTER_FAILURE = "FETCHING_CHARACTER_FAILURE";

const getCharacters = dispatch => {
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

const getCharacter = dispatch => url => {
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

export const useCharacters = () => {
  const dispatch = useDispatch();
  const props = useSelector((state) => ({
    characters: state.characters.characters,
    character: state.characters.character,
    error: state.characters.error,
    fetchingCharacters: state.characters.fetchingCharacters
  }))

  useEffect(() => {
    if (!props.characters.length) {
      getCharacters(dispatch);
    }
  }, [])

  return {
    ...props,
    getCharacter: getCharacter(dispatch),
  }
}

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
