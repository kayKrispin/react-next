import { all, put, call, takeLatest } from "redux-saga/effects";
import { getFilms } from "../../../src/api";
import * as types from "./filmsActionTypes";
import serverSagaWrapper from "../../helpers/serverSagaWrapper";


function *filmsSaga ({ q }) {

  try {
    const response = yield call(getFilms, q);

    yield put({type: types.GET_FILMS_SUCCESS, payload: response});
  } catch (error) {
    yield put({ type: types.GET_FILMS_ERROR, error: error.toString() });
  }
}

export default function *() {
  yield all([
    yield takeLatest(types.GET_FILMS_REQUEST, serverSagaWrapper(filmsSaga)),
  ])
}
