import { delay } from 'redux-saga';
import { put, call, fork, select } from 'redux-saga/effects';
import { zun, doko, kiyoshi } from '../actions/zundoko';

export const list = [zun, doko];

export function* zunDokoRandom() {
  yield put(list[Math.floor(Math.random() * list.length)]());
}

export function* zunDokoCheck() {
  const checkList = [].concat(yield select(state => state.zundoko.list));
  if (checkList.length < 5) return;

  if (
    checkList.pop() === 'ドコ' &&
    checkList.pop() === 'ズン' &&
    checkList.pop() === 'ズン' &&
    checkList.pop() === 'ズン' &&
    checkList.pop() === 'ズン'
  ) {
    yield put(kiyoshi());
  }
}

export function* singSong() {
  while (yield select(state => state.zundoko.isMusic)) {
    yield call(zunDokoRandom);
    yield call(delay, 1000);
    yield call(zunDokoCheck);
  }
}

export default function* zundokoSaga() {
  yield fork(singSong);
}
