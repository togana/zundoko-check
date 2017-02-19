import { handleActions } from 'redux-actions';
import * as zundokoAction from '../actions/zundoko';

const initialState = {
  list: [],
  isMusic: true,
};

const zundoko = handleActions({
  [zundokoAction.zun]: state => Object.assign({}, state, { list: [...state.list, 'ズン'] }),
  [zundokoAction.doko]: state => Object.assign({}, state, { list: [...state.list, 'ドコ'] }),
  [zundokoAction.kiyoshi]: state => Object.assign({}, state, { list: [...state.list, 'キ・ヨ・シ！'], isMusic: false }),
}, initialState);

export default zundoko;
