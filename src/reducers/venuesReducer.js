import { combineReducers } from 'redux';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

function venuesReducer(state = initialState.venues.list, action) {
  switch (action.type) {
    case types.LOAD_VENUES_SUCCESS:
      return action.venues;
    default:
      return state;
  }
}

function venueReducer(state = initialState.venues.selected, action) {
  switch (action.type) {
    case types.LOAD_VENUE_SUCCESS:
      return action.venue;
    default:
      return state;
  }
}

export default combineReducers({
  list: venuesReducer,
  selected: venueReducer,
});
