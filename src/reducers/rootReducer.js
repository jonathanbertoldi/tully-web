import { combineReducers } from 'redux';
import apiRequestsInProgress from './apiRequestReducer.js';
import identity from './loginReducer';
import snackbar from './snackbarReducer';

const rootReducer = combineReducers({
  apiRequestsInProgress,
  identity,
  snackbar,
});

export default rootReducer;