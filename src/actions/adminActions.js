import * as types from './actionTypes';
import { startApiRequest, apiRequestFailed } from './apiRequestActions';

import tullyApi from '../api/tullyApi';

function loadAdminsSuccess(admins) {
  return {
    type: types.LOAD_ADMINS_SUCCESS,
    admins,
  };
}

function createAdminSuccess(admin) {
  return {
    type: types.CREATE_ADMIN_SUCCESS,
    admin,
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

export function createAdmin(admin) {
  return (dispatch, getState) => {
    dispatch(startApiRequest());
    return tullyApi.post('admins', admin)
      .then(response => {
        dispatch(createAdminSuccess(response));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(apiRequestFailed());
        return Promise.reject(error);
      });
  };
}
