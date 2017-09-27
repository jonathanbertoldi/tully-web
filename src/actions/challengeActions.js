import * as types from './actionTypes';
import { startApiRequest, apiRequestFailed } from './apiRequestActions';
import tullyApi from '../api/tullyApi';

function loadChallengesSuccess(challenges) {
  return {
    type: types.LOAD_CHALLENGES_SUCCESS,
    challenges,
  };
}

function loadChallengeSuccess(challenge) {
  return {
    type: types.LOAD_CHALLENGE_SUCCESS,
    challenge,
  }
}

function createChallengeSuccess(challenge) {
  return {
    type: types.CREATE_CHALLENGE_SUCCESS,
    challenge,
  };
}

function removeChallengeSuccess(challengeId) {
  return {
    type: types.REMOVE_CHALLENGE_SUCCESS,
    challengeId,
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

export function loadChallenge(id) {
  return (dispatch, getState) => {
    dispatch(startApiRequest());
    return tullyApi.get(`desafios/${id}`)
      .then(response => {
        dispatch(loadChallengeSuccess(response));
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

export function removeChallenge(challengeId) {
  return (dispatch, getState) => {
    return tullyApi.remove(`desafios/${challengeId}`)
      .then(response => {
        dispatch(removeChallengeSuccess(challengeId));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(apiRequestFailed());
        return Promise.reject(error);
      });
  };
}
