import { fork } from 'redux-saga/effects';

const emptyFunction = () => {};

export default function* rootSaga() {
  yield fork(emptyFunction);
}
