import login from '../api/apiToken';

import * as types from './actionTypes';
import { startApiRequest, apiRequestFailed } from './apiRequestActions';

function loginSuccess(identity) {
  return {
    type: types.LOGIN_SUCCESS,
    identity,
  };
}

export function requestLogin(credentials) {
  return (dispatch, getState) => {
    dispatch(startApiRequest());
    return login(credentials)
      .then(response => {
        dispatch(loginSuccess(response));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(apiRequestFailed());
        return Promise.reject(error);
      });
  };
}

export function requestLogout() {
  return {
    type: types.REQUEST_LOGOUT,
  };
}