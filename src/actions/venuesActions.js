import fourSquareApi from '../api/fourSquare/fourSquareApi';

import { startApiRequest, apiRequestFailed } from './apiRequestActions';
import * as types from './actionTypes';

function loadVenuesSuccess(venues) {
  return {
    type: types.LOAD_VENUES_SUCCESS,
    venues,
  };
}

export function loadVenues(lat, lng) {
  return (dispatch, getState) => {
    dispatch(startApiRequest());
    return fourSquareApi.getVenues(lat, lng)
      .then(response => {
        dispatch(loadVenuesSuccess(response));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(apiRequestFailed());
        return Promise.reject(error);
      });
  };
}
