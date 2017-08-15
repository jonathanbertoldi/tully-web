import * as types from './actionTypes';
import { startApiRequest, apiRequestFailed } from './apiRequestActions';

import tullyApi from '../api/tullyApi';

function loadAdminsSuccess(admins) {
  return {
    type: types.LOAD_ADMINS_SUCCESS,
    admins,
  };
}

export function loadAdmins() {
  return (dispatch, getState) => {
    dispatch(startApiRequest());
    return tullyApi.get('admins')
      .then(response => {
        dispatch(loadAdminsSuccess(response));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(apiRequestFailed());
        return Promise.reject(error);
      });
  };
}
