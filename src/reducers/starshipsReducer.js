import {
  FETCHING_STARSHIPS,
  FETCHING_STARSHIPS_SUCCESS,
  FETCHING_STARSHIPS_FAILURE
} from "../containers/Starships/Starships.module";

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
