import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function snackbarReducer(state = initialState.snackbar, action) {
  switch (action.type) {
    case types.SHOW_SNACKBAR:
      return Object.assign({}, state, {
        open: true,
        message: action.message,
      });
    case types.CLOSE_SNACKBAR:
      return Object.assign({}, state, {
        open: false,
        message: '',
      });
    default:
      return state;
  }
}