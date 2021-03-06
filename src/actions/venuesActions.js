import fourSquareApi from '../api/fourSquare/fourSquareApi';

import { startApiRequest, apiRequestFailed } from './apiRequestActions';
import * as types from './actionTypes';

function loadVenuesSuccess(venues) {
  return {
    type: types.LOAD_VENUES_SUCCESS,
    venues,
  };
}

function loadVenueSuccess(venue) {
  return {
    type: types.LOAD_VENUE_SUCCESS,
    venue,
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

export function loadVenue(venueId) {
  return (dispatch, getState) => {
    dispatch(startApiRequest());
    return fourSquareApi.getVenue(venueId)
      .then(response => {
        dispatch(loadVenueSuccess(response));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(apiRequestFailed());
        return Promise.reject(error);
      });
  };
}
