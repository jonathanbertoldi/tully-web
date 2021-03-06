import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.identity, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        jwt: action.identity.token,
        usuario: action.identity.usuario,
        expiration: action.identity.expiration,
      });
    case types.VALIDATE_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        jwt: action.identity.token,
        usuario: action.identity.usuario,
        expiration: action.identity.expiration,
      });
    case types.REQUEST_LOGOUT:
      localStorage.removeItem('jwt');
      return {
        isAuthenticated: false,
        jwt: '',
        expiration: '',
        usuario: {},
      };
    default:
      return state;
  }
}