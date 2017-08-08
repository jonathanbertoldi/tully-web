import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as loginActions from '../../actions/loginActions';
import { showSnackbar } from '../../actions/snackbarActions';

import { TextField, RaisedButton } from 'material-ui';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {},
    };
  }

  updateCredentialsState = (e) => {
    const field = e.target.name;
    let credentials = Object.assign({}, this.state.credentials);
    credentials[field] = e.target.value;
    return this.setState({ credentials });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { requestLogin, showSnackbar } = this.props.actions;

    requestLogin(this.state.credentials)
      .then(response => showSnackbar('Usuário conectado com sucesso'))
      .catch(error => showSnackbar(error.message));
  }

  render() {
    const { isFetching } = this.props;

    return (
      <div className="login-screen">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <TextField name="usuario"
            type="text"
            floatingLabelText="Usuario"
            onChange={this.updateCredentialsState}
            fullWidth />

          <TextField name="senha"
            type="password"
            floatingLabelText="Senha"
            onChange={this.updateCredentialsState}
            fullWidth />

          <RaisedButton type="submit"
            disabled={isFetching}
            label="Entrar"
            fullWidth
            primary />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { identity } = state;
  return {
    isFetching: state.apiRequestsInProgress > 0 ? true : false,
    identity,
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    ...loginActions,
    showSnackbar,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
