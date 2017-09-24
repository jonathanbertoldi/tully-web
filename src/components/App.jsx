import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as snackbarActions from '../actions/snackbarActions';
import { requestValidateToken, requestLogout } from '../actions/loginActions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Snackbar, RefreshIndicator } from 'material-ui';

import Login from './login/Login';
import Layout from './layout/Layout';

class App extends Component {
  handleSnackbarClose = () => this.props.actions.closeSnackbar();

  render() {
    const { refresh, snackbar, identity } = this.props;
    const { requestLogout } = this.props.actions;

    return (
      <MuiThemeProvider>
        <div>
          {identity.isAuthenticated ? <Layout logout={requestLogout}>{this.props.children}</Layout> : <Login />}

          <Snackbar open={snackbar.open}
            message={snackbar.message}
            autoHideDuration={4000}
            onRequestClose={this.handleSnackbarClose} />

          <RefreshIndicator style={{ marginLeft: '50%' }}
            size={40}
            left={-20}
            top={107}
            status={refresh} />
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { snackbar, identity } = state;
  return {
    refresh: state.apiRequestsInProgress > 0 ? 'loading' : 'hide',
    isFetching: state.apiRequestsInProgress > 0 ? true : false,
    identity,
    snackbar,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = { ...snackbarActions, requestLogout, requestValidateToken };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
