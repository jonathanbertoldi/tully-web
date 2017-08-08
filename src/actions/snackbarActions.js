import * as types from './actionTypes';

export function showSnackbar(message) {
  return {
    type: types.SHOW_SNACKBAR,
    message,
  };
}

export function closeSnackbar() {
  return {
    type: types.CLOSE_SNACKBAR,
  };
}