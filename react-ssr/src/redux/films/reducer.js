import * as types from "./filmsActionTypes";

const initialState = {
  films: [],
  shouldTrack: false
};

const candidate = (state = initialState, action) => {

  switch (action.type) {
    case types.GET_FILMS_SUCCESS:
      return {
        films: [ ...action.payload ]
      };
    case "TOGGLE_SHOULD_TRACK":
      return {
        ...state,
        shouldTrack: action.payload,
      };

    case "ADD_PROMISE": {
      return {
        ...state,
        promises: {
          ...state.promises,
          [action.key]: action.promise
        }
      }
    }
    case "RESET_PROMISES":
      return {
        ...state,
        promises: {}
      };
    default:
      return state;
  }
};

export default candidate;
