import * as types from './actionTypes';
import { startApiRequest, apiRequestFailed } from './apiRequestActions';
import tullyApi from '../api/tullyApi';

function loadChallengesSuccess(challenges) {
  return {
    type: types.LOAD_CHALLENGES_SUCCESS,
    challenges,
  };
}

function createChallengeSuccess(challenge) {
  return {
    type: types.CREATE_CHALLENGE_SUCCESS,
    challenge,
  };
}

export function loadChallenges() {
  return (dispatch, getState) => {
    dispatch(startApiRequest());
    return tullyApi.get('desafios')
      .then(response => {
        dispatch(loadChallengesSuccess(response));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(apiRequestFailed());
        return Promise.reject(error);
      });
  };
}

export function createChallenge(challenge) {
  return (dispatch, getState) => {
    dispatch(startApiRequest());
    return tullyApi.post('desafios', challenge)
      .then(response => {
        dispatch(createChallengeSuccess(response));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(apiRequestFailed());
        return Promise.reject(error);
      });
  };
}
