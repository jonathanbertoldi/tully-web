import { combineReducers } from 'redux';
import apiRequestsInProgress from './apiRequestReducer.js';
import identity from './loginReducer';
import snackbar from './snackbarReducer';

import admins from './adminReducer';
import venues from './venuesReducer';

const rootReducer = combineReducers({
  apiRequestsInProgress,
  identity,
  snackbar,
  admins,
  venues,
});

export default rootReducer;