import * as types from '../constants/ActionTypes';

const initialState = {
  list: [],
  isMusic: true,
};

export default function zundoko(state = initialState, action) {
  switch (action.type) {
    case types.ZUN:
      return Object.assign({}, state, { list: [...state.list, 'ズン'] });
    case types.DOKO:
      return Object.assign({}, state, { list: [...state.list, 'ドコ'] });
    case types.KIYOSHI:
      return Object.assign({}, state, { list: [...state.list, 'キ・ヨ・シ'], isMusic: false });
    default:
      return state;
  }
}
