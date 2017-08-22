import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as adminActions from '../../actions/adminActions';

import {
  Card, CardHeader, CardText, IconButton,
  Avatar, List, ListItem, Divider,
  IconMenu, MenuItem, TextField
} from 'material-ui';

import { grey600 } from 'material-ui/styles/colors';

import Person from 'material-ui/svg-icons/social/person';
import Email from 'material-ui/svg-icons/communication/email';
import Lock from 'material-ui/svg-icons/action/lock';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Edit from 'material-ui/svg-icons/editor/mode-edit';

import EditModal from './EditModal';

class DetailsAdminPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nameModalVisible: false,
      emailModalVisible: false,
      loginModalVisible: false,
      changePasswordModalVisible: false,
      disableAccountModalVisible: false,
    };
  }

  componentDidMount() {
    const { loadAdmins } = this.props.actions;
    const { router } = this.props;
    const { id } = this.props.routeParams;
    loadAdmins()
      .then(response => {
        const admin = response.find(a => a.id === parseInt(id, 10));
        if (!admin) router.push('/404');
      });
  }

  iconButtonElement = (
    <IconButton
      touch={true}
      tooltip="Ações"
      tooltipPosition="bottom-left">
      <MoreVertIcon color={grey600} />
    </IconButton>
  );

  renderIconMenu = () => (
    <IconMenu
      targetOrigin={{ vertical: "top", horizontal: "right" }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      style={{ float: 'right' }}
      iconButtonElement={this.iconButtonElement}>
      <MenuItem onTouchTap={this.openChangePasswordModal}>
        Alterar Senha
      </MenuItem>
      <MenuItem onTouchTap={this.openDisableAccountModal}>
        Inativar Conta
      </MenuItem>
    </IconMenu>
  )

  openNameModal = () => this.setState({ nameModalVisible: true });
  closeNameModal = () => this.setState({ nameModalVisible: false });
  handleEditNameSubmit = () => {
    const { admin } = this.state;
    console.log(admin);
    this.closeNameModal();
  }

  openEmailModal = () => this.setState({ emailModalVisible: true });
  closeEmailModal = () => this.setState({ emailModalVisible: false });
  handleEditEmailSubmit = () => {
    console.log('submeteu');
    this.closeEmailModal();
  }

  openLoginModal = () => this.setState({ loginModalVisible: true });
  closeLoginModal = () => this.setState({ loginModalVisible: false });
  handleEditLoginSubmit = () => {
    console.log('submeteu');
    this.closeLoginModal();
  }

  openChangePasswordModal = () => this.setState({ changePasswordModalVisible: true });
  closeChangePasswordModal = () => this.setState({ changePasswordModalVisible: false });
  handleChangePasswordSubmit = () => {
    console.log('submeteu');
    this.closeChangePasswordModal();
  }

  openDisableAccountModal = () => this.setState({ disableAccountModalVisible: true });
  closeDisableAccountModal = () => this.setState({ disableAccountModalVisible: false });
  handleDisableAccountSubmit = () => {
    console.log('submeteu');
    this.closeDisableAccountModal();
  }

  updateAdminState = (e) => {
    const field = e.target.name;
    let admin = Object.assign({}, this.state.admin);
    admin[field] = e.target.value;
    this.setState({ admin });
  }

  render() {
    const { renderIconMenu, updateAdminState } = this;
    const { openNameModal, closeNameModal, handleEditNameSubmit } = this;
    const { openEmailModal, closeEmailModal, handleEditEmailSubmit } = this;
    const { openLoginModal, closeLoginModal, handleEditLoginSubmit } = this;
    const { closeChangePasswordModal, handleChangePasswordSubmit } = this;
    const { closeDisableAccountModal, handleDisableAccountSubmit } = this;
    const { admin } = this.props;
    const { nameModalVisible, emailModalVisible, loginModalVisible, changePasswordModalVisible, disableAccountModalVisible } = this.state;

    return (
      <Card>
        <CardHeader title="Detalhes" subtitle="Administrador">
          {renderIconMenu()}
        </CardHeader>
        <CardText>
          {admin && (
            <List>
              <ListItem
                leftAvatar={<Avatar icon={<Person />} />}
                secondaryText="Nome"
                rightIconButton={<IconButton onTouchTap={openNameModal}><Edit color={grey600} /></IconButton>}>
                {admin.nome}
              </ListItem>
              <Divider inset />
              <ListItem
                leftAvatar={<Avatar icon={<Email />} />}
                secondaryText="E-Mail"
                insetChildren
                rightIconButton={<IconButton onTouchTap={openEmailModal}><Edit color={grey600} /></IconButton>}>
                {admin.email}
              </ListItem>
              <Divider inset />
              <ListItem
                leftAvatar={<Avatar icon={<Lock />} />}
                secondaryText="Login"
                insetChildren
                rightIconButton={<IconButton onTouchTap={openLoginModal}><Edit color={grey600} /></IconButton>}>
                {admin.userName}
              </ListItem>
            </List>
          )}
        </CardText>
        <EditModal
          open={nameModalVisible}
          onRequestClose={closeNameModal}
          handleSubmit={handleEditNameSubmit}
          title="Altere o nome"
          width={460}>
          <TextField
            floatingLabelText="Novo nome"
            name="nome"
            onChange={updateAdminState}
            fullWidth />
        </EditModal>
        <EditModal
          open={emailModalVisible}
          onRequestClose={closeEmailModal}
          handleSubmit={handleEditEmailSubmit}
          title="Altere o email"
          width={460}>
          <TextField
            floatingLabelText="Novo email"
            name="email"
            onChange={updateAdminState}
            fullWidth />
        </EditModal>
        <EditModal
          open={loginModalVisible}
          onRequestClose={closeLoginModal}
          handleSubmit={handleEditLoginSubmit}
          title="Altere o login"
          width={460}>
          <TextField
            floatingLabelText="Novo login"
            name="login"
            onChange={updateAdminState}
            fullWidth />
        </EditModal>
        <EditModal
          open={changePasswordModalVisible}
          onRequestClose={closeChangePasswordModal}
          handleSubmit={handleChangePasswordSubmit}
          title="Altere sua senha"
          width={460}>
          <TextField
            floatingLabelText="Senha antiga"
            name="oldPassword"
            onChange={updateAdminState}
            fullWidth />
          <TextField
            floatingLabelText="Nova Senha"
            name="newPassword"
            onChange={updateAdminState}
            fullWidth />
          <TextField
            floatingLabelText="Confirme a Senha"
            name="passwordConfirm"
            onChange={updateAdminState}
            fullWidth />
        </EditModal>
        <EditModal
          open={disableAccountModalVisible}
          onRequestClose={closeDisableAccountModal}
          handleSubmit={handleDisableAccountSubmit}
          title="Deseja desativar a sua conta?"
          width={460}>
          <p>Após desativada, sua conta somente poderá ser reativada por outro usuário administrador</p>
        </EditModal>
      </Card>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { admins } = state;
  const admin = admins.find(a => a.id === parseInt(ownProps.routeParams.id, 10))
  return {
    admin,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = { ...adminActions };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsAdminPage);
