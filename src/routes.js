import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './components/App';
import HomePage from './components/home/HomePage';
import UserPage from './components/users/UserPage';
import ChallengePage from './components/challenges/ChallengePage';
import AdminPage from './components/admins/AdminPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="usuarios" component={UserPage} />
    <Route path="desafios" component={ChallengePage} />
    <Route path="admins" component={AdminPage} />
  </Route>
);
