import { all } from "redux-saga/effects";

import filmsSaga from "../redux/films/sagas";

export default function *rootSaga() {
  yield all([
    filmsSaga(),
  ]);
}
