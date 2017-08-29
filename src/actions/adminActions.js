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

function updateAdminSuccess(admin) {
  return {
    type: types.UPDATE_ADMIN_SUCCESS,
    admin,
  };
}

function removeAdminSuccess(adminId) {
  return {
    type: types.REMOVE_ADMIN_SUCCESS,
    adminId,
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

export function updateAdmin(body, property, value) {
  return (dispatch, getState) => {
    const admin = Object.assign({}, body, { [property]: value })

    dispatch(startApiRequest());
    return tullyApi.patch(`admins/${admin.id}`, property, value)
      .then(response => {
        dispatch(updateAdminSuccess(admin));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(apiRequestFailed());
        return Promise.reject(error);
      });
  };
}

export function removeAdmin(adminId) {
  return (dispatch, getState) => {
    return tullyApi.remove(`admins/${adminId}`)
      .then(response => {
        dispatch(removeAdminSuccess(adminId));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(apiRequestFailed());
        return Promise.reject(error);
      });
  };
}
