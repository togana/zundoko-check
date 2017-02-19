import interval from '../utils/sagaEffectInterval';
// import { zun, doko } from '../actions/zundoko';
import * as types from '../constants/ActionTypes';
import zundokoSaga, { zunDokoRandom, singSong } from './zundoko';

describe('zundoko Saga test', () => {
  it('should zunDokoRandom', () => {
    const saga = zunDokoRandom();
    const whichOne = saga.next().value.PUT.action.type;
    expect(
      whichOne === types.ZUN || whichOne === types.DOKO,
    ).toBeTruthy();
  });

  // TODO: should zunDokoCheck
  // TODO: should singSong

  it('should zundokoSaga', () => {
    const saga = zundokoSaga();
    expect(
      saga.next().value,
    ).toEqual(interval(100, singSong));
  });
});
