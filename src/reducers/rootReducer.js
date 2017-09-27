import { combineReducers } from 'redux';
import apiRequestsInProgress from './apiRequestReducer.js';
import identity from './loginReducer';
import snackbar from './snackbarReducer';

import admins from './adminReducer';
import venues from './venuesReducer';
import challenges from './challengeReducer';

const rootReducer = combineReducers({
  apiRequestsInProgress,
  identity,
  snackbar,
  admins,
  venues,
  challenges,
});

export default rootReducer;