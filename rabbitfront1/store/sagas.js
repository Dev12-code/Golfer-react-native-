import { all } from "redux-saga/effects";
import authSagas from "./redux/auth/sagas";
import tournamentsSagas from "./redux/tournaments/sagas";
import golfersSagas from "./redux/golfers/sagas";

export default function* rootSaga() {
  const sagas = [...authSagas, ...tournamentsSagas, ...golfersSagas];
  yield all(sagas);
}
