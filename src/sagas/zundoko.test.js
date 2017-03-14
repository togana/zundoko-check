import { put, select } from 'redux-saga/effects';
import interval from '../utils/sagaEffectInterval';
import { kiyoshi } from '../actions/zundoko';
import zundokoSaga, { zunDokoRandom, zunDokoCheck, singSong, getZundokoList } from './zundoko';
import * as types from '../constants/ActionTypes';

const list = ['ズン', 'ズン', 'ズン', 'ズン', 'ドコ'];
const zundoko = { list };
const state = { zundoko };
const getState = () => state;

describe('zundoko Saga test', () => {
  it('should zunDokoRandom', () => {
    const saga = zunDokoRandom();
    const whichOne = saga.next().value.PUT.action.type;
    expect(
      whichOne === types.ZUN || whichOne === types.DOKO,
    ).toBeTruthy();
  });

  it('should check Zun Doko phrase', () => {
    const generator = zunDokoCheck(getState);
    let next = generator.next(state);

    expect(
      next.value,
    ).toEqual(select(getZundokoList));

    next = generator.next(list);
    expect(
      next.value,
    ).toEqual(put(kiyoshi()));
  });

  // TODO: should singSong

  it('should zundokoSaga', () => {
    const saga = zundokoSaga();
    expect(
      saga.next().value,
    ).toEqual(interval(100, singSong));
  });
});
