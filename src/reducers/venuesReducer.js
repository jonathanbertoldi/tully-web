import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function venuesReducer(state = initialState.venues, action) {
  switch (action.type) {
    case types.LOAD_VENUES_SUCCESS:
      return action.venues;
    default:
      return state;
  }
};
