import * as types from "./filmsActionTypes";

export const getFilmsRequest = data => {
  return { type: types.GET_FILMS_REQUEST, q: data };
};
