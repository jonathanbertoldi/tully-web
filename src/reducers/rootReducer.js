import { combineReducers } from 'redux';
import apiRequestsInProgress from './apiRequestReducer.js';
import identity from './loginReducer';
import snackbar from './snackbarReducer';

import admins from './adminReducer';

const rootReducer = combineReducers({
  apiRequestsInProgress,
  identity,
  snackbar,
  admins,
});

export default rootReducer;