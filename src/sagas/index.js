import { fork } from 'redux-saga/effects';
import zundokoSaga from './zundoko';

export default function* rootSaga() {
  yield fork(zundokoSaga);
}
