import { put, call, select } from 'redux-saga/effects';
import interval from '../utils/sagaEffectInterval';
import { kiyoshi } from '../actions/zundoko';
import zundokoSaga, { zunDokoRandom, zunDokoCheck, singSong, getZundokoList, getZundokoIsMusic } from './zundoko';
import * as types from '../constants/ActionTypes';

const list = ['ズン', 'ズン', 'ズン', 'ズン', 'ドコ'];
const isMusic = true;
const state = { zundoko: { list, isMusic } };
const getState = () => state;

describe('zundoko Saga test', () => {
  it('should zunDokoRandom', () => {
    const generator = zunDokoRandom();
    const next = generator.next(state);

    const whichOne = next.value.PUT.action.type;
    expect(
      whichOne === types.ZUN || whichOne === types.DOKO,
    ).toBeTruthy();
  });

  it('should zunDokoCheck', () => {
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

  it('should singSong', () => {
    const generator = singSong(getState);

    let next = generator.next();
    expect(
      next.value,
    ).toEqual(call(zunDokoCheck));

    next = generator.next();
    expect(
      next.value,
    ).toEqual(select(getZundokoIsMusic));

    next = generator.next(isMusic);
    expect(
      next.value,
    ).toEqual(call(zunDokoRandom));
  });

  it('should zundokoSaga', () => {
    const generator = zundokoSaga();

    const next = generator.next();
    expect(
      next.value,
    ).toEqual(interval(100, singSong));
  });
});
