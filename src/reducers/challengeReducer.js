import { combineReducers } from 'redux';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

function challengesReducer(state = initialState.challenges.list, action) {
  switch (action.type) {
    case types.LOAD_CHALLENGES_SUCCESS:
      return action.challenges;
    case types.CREATE_ADMIN_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.challenge),
      ];
    case types.REMOVE_CHALLENGE_SUCCESS:
      return [
        ...state.filter(challenge => challenge.id !== action.challengeId),
      ];
    default:
      return state;
  }
}

function challengeReducer(state = initialState.challenges.selected, action) {
  switch (action.type) {
    case types.LOAD_CHALLENGE_SUCCESS:
      return action.challenge;
    default:
      return state;
  }
}

export default combineReducers({
  list: challengesReducer,
  selected: challengeReducer,
});
