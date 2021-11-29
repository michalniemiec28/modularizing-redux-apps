import {
  FETCHING_CHARACTERS,
  FETCHING_CHARACTERS_SUCCESS,
  FETCHING_CHARACTERS_FAILURE,
  FETCHING_CHARACTER,
  FETCHING_CHARACTER_SUCCESS,
  FETCHING_CHARACTER_FAILURE
} from "../actions/charactersActions";

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
