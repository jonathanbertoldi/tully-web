import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './components/App';
import HomePage from './components/home/HomePage';
import UserPage from './components/users/UserPage';

import ChallengePage from './components/challenges/ChallengePage';
import CreateChallengePage from './components/challenges/CreateChallengePage';
import DetailsChallengePage from './components/challenges/DetailsChallengePage';

import AdminPage from './components/admins/AdminPage';
import CreateAdminPage from './components/admins/CreateAdminPage';
import DetailsAdminPage from './components/admins/DetailsAdminPage';

import NotFound from './components/not-found/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="usuarios" component={UserPage} />
    <Route path="desafios" component={ChallengePage} />
    <Route path="desafios/novo" component={CreateChallengePage} />
    <Route path="desafios/:id" component={DetailsChallengePage} />
    <Route path="admins" component={AdminPage} />
    <Route path="admins/novo" component={CreateAdminPage} />
    <Route path="admins/:id" component={DetailsAdminPage} />
    <Route path="404" component={NotFound} />
  </Route>
);
