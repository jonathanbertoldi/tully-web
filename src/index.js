import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import { requestValidateToken } from './actions/loginActions';

import routes from './routes';

import './index.css';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const store = configureStore();
store.dispatch(requestValidateToken()).catch(error => browserHistory.push('/'));

const app = (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
