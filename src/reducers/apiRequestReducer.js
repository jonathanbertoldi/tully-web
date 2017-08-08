import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

export default function apiRequestReducer (state = initialState.apiRequestsInProgress, action) {
  if (action.type === types.START_API_REQUEST) {
    return state + 1;
  } else if (action.type === types.API_REQUEST_FAILED || actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}