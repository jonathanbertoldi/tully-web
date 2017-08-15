import * as types from '../actions/actionTypes';

import initialState from './initialState';

export default function adminReducer(state = initialState.admins, action) {
  switch (action.type) {
    case types.LOAD_ADMINS_SUCCESS:
      return action.admins;
    default:
      return state;
  }
}
