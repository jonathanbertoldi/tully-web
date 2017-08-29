import * as types from '../actions/actionTypes';

import initialState from './initialState';

export default function adminReducer(state = initialState.admins, action) {
  switch (action.type) {
    case types.LOAD_ADMINS_SUCCESS:
      return action.admins;
    case types.CREATE_ADMIN_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.admin),
      ].sort((a, b) => a.id - b.id);
    case types.UPDATE_ADMIN_SUCCESS:
      return [
        ...state.filter(admin => admin.id !== action.admin.id),
        Object.assign({}, action.admin),
      ].sort((a, b) => a.id - b.id);
    case types.REMOVE_ADMIN_SUCCESS:
      return [
        ...state.filter(admin => admin.id !== action.adminId),
      ].sort((a, b) => a.id - b.id);
    default:
      return state;
  }
}
