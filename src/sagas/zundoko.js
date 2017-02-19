import { put, call, select } from 'redux-saga/effects';
import interval from '../utils/sagaEffectInterval';
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
  yield call(zunDokoCheck);
  if (yield select(state => state.zundoko.isMusic)) {
    yield call(zunDokoRandom);
  }
}

export default function* zundokoSaga() {
  yield interval(100, singSong);
}
