import * as types from './actionTypes';

export function startApiRequest() {
  return {
    type: types.START_API_REQUEST,
  };
}

export function apiRequestFailed() {
  return {
    type: types.API_REQUEST_FAILED,
  };
}