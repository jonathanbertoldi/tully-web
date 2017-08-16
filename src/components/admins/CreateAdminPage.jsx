import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as snackbarActions from '../../actions/snackbarActions';
import { createAdmin } from '../../actions/adminActions';

import { Link } from 'react-router';

import { Card, CardHeader, CardText, CardActions, TextField, FlatButton } from 'material-ui';

import './admin.css';

class CreateAdminPage extends Component {
  constructor(props) {
    super(props);

    const adminModel = {
      nome: '',
      email: '',
      userName: '',
      password: '',
      confirmaSenha: '',
    };

    this.state = {
      admin: { ...adminModel },
      errors: { ...adminModel },
    };
  }

  updateAdminState = (e) => {
    const field = e.target.name;
    let admin = Object.assign({}, this.state.admin);
    admin[field] = e.target.value;

    let errors = Object.assign({}, this.state.errors);
    if (admin[field] === '')
      errors[field] = `O campo ${field} é obrigatório`;
    else
      errors[field] = '';

    return this.setState({ admin, errors });
  }

  validateAdmin = (admin) => {
    const { errors } = this.state;

    Object.keys(admin).forEach(field => {
      if (admin[field] === '')
        errors[field] = `O campo ${field} é obrigatório`;
    });

    if (admin.password !== admin.confirmaSenha)
      errors.confirmaSenha = 'A senha não confere com a que foi inserida anteriormente.'

    this.setState({ errors });

    let check = 0;
    Object.keys(errors).forEach(field => {
      return errors[field] !== '' && check++;
    });

    return check === 0;
  }

  handleAdminSubmit = (e) => {
    e.preventDefault();
    const { admin } = this.state;
    const { createAdmin, showSnackbar } = this.props.actions;
    const { router } = this.props;
    if (this.validateAdmin(admin)) {
      createAdmin(admin)
        .then(response => {
          showSnackbar('Administrador criado com sucesso');
          router.push('/admins');
        })
        .catch(error => showSnackbar(error[0].description));
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Card>
          <CardHeader title="Cadastro" subtitle="Administradores" />
          <CardText className="form-group" style={{ paddingTop: 0 }}>
            <TextField
              className="input-control"
              floatingLabelText="Nome"
              name="nome"
              onChange={this.updateAdminState}
              errorText={errors.nome}
              fullWidth />
            <TextField
              className="input-control"
              floatingLabelText="E-Mail"
              name="email"
              errorText={errors.email}
              onChange={this.updateAdminState}
              fullWidth />
            <TextField
              className="input-control"
              floatingLabelText="Login"
              name="userName"
              errorText={errors.login}
              onChange={this.updateAdminState}
              fullWidth />
            <TextField
              className="input-control"
              floatingLabelText="Senha"
              name="password"
              errorText={errors.senha}
              onChange={this.updateAdminState}
              type="password" />
            <TextField
              className="input-control"
              floatingLabelText="Confirmação de Senha"
              name="confirmaSenha"
              errorText={errors.confirmaSenha}
              onChange={this.updateAdminState}
              type="password" />
          </CardText>
          <CardActions className="card-actions">
            <FlatButton label="Cancelar" containerElement={<Link to="/admins" />} />
            <FlatButton label="Salvar" onTouchTap={this.handleAdminSubmit} primary />
          </CardActions>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { admins } = state;
  return {
    admins,
  }
}

function mapDispatchToProps(dispatch) {
  const actions = { createAdmin, ...snackbarActions };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdminPage);
