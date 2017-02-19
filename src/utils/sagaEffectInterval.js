import { delay } from 'redux-saga';
import { call, fork, spawn } from 'redux-saga/effects';

export function* handlerInterval(ms, worker, ...args) {
  while (true) {
    yield fork(worker, ...args);
    yield call(delay, ms);
  }
}

export default function* interval(ms, worker, ...args) {
  return yield spawn(handlerInterval, ms, worker, ...args);
}
