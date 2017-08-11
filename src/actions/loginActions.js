import login, { validateToken } from '../api/apiToken';

import * as types from './actionTypes';
import { startApiRequest, apiRequestFailed } from './apiRequestActions';

function loginSuccess(identity) {
  return {
    type: types.LOGIN_SUCCESS,
    identity,
  };
}

function validateTokenSuccess(identity) {
  return {
    type: types.VALIDATE_TOKEN_SUCCESS,
    identity,
  };
}

export function requestLogin(credentials) {
  return (dispatch, getState) => {
    dispatch(startApiRequest());
    return login(credentials)
      .then(response => {
        localStorage.setItem('jwt', response.token);
        dispatch(loginSuccess(response));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(apiRequestFailed());
        return Promise.reject(error);
      });
  };
}

export function requestValidateToken() {
  return (dispatch, getState) => {
    dispatch(startApiRequest());
    return validateToken()
      .then(response => {
        dispatch(validateTokenSuccess(response));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(requestLogout());
        dispatch(apiRequestFailed());
        return Promise.reject(error);
      });
  }
}

export function requestLogout() {
  return {
    type: types.REQUEST_LOGOUT,
  };
}