import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createForm } from 'rc-form';
import * as challengeActions from '../../actions/challengeActions';
import * as snackbarActions from '../../actions/snackbarActions';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import { Avatar, Divider, IconButton, TextField } from 'material-ui';

import { grey500 } from 'material-ui/styles/colors';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Description from 'material-ui/svg-icons/action/description';
import Business from 'material-ui/svg-icons/social/location-city';
import Phone from 'material-ui/svg-icons/communication/phone';
import Place from 'material-ui/svg-icons/maps/place';
import Public from 'material-ui/svg-icons/social/public';

import EditModal from '../../utils/edit-modal/EditModal';

const InsetDivider = () => (
  <Divider inset />
);

class DetailsChallengePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableChallengeModalVisible: false,
      phoneModalVisible: false,
      urlModalVisible: false,
      descriptionModalVisible: false,
    };
  }

  componentDidMount() {
    const { loadChallenge } = this.props.actions;
    const { router } = this.props;
    const { id } = this.props.routeParams;
    loadChallenge(id).catch(error => router.push('/404'));
  }

  openDisableChallengeModal = () => this.setState({ disableChallengeModalVisible: true });
  closeDisableChallengeModal = () => this.setState({ disableChallengeModalVisible: false });
  handleDisableChallengeSubmit = () => {
    const { challenge, router } = this.props;
    const { removeChallenge, showSnackbar } = this.props.actions;

    removeChallenge(challenge.id)
      .then(response => {
        showSnackbar('Desafio removido com sucesso');

        this.closeDisableChallengeModal();

        router.push('/desafios')
      });
  }

  handlePhoneModalState = () => {
    const { challenge } = this.props;
    const { form } = this.props;

    form.setFieldsValue({ telefone: challenge.telefone });

    this.setState({ phoneModalVisible: !this.state.phoneModalVisible });
  }

  handlePhoneModalSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    const { updateChallenge, showSnackbar } = this.props.actions;

    form.validateFields(['phone'], (err, values) => {
      if (err) return;

      this.handlePhoneModalState();
    });
  }

  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    const { disableChallengeModalVisible, phoneModalVisible } = this.state;
    const { challenge } = this.props;

    return (
      <Card>
        <CardHeader
          title="Detalhes"
          subtitle="Desafio">
          <IconButton onTouchTap={this.openDisableChallengeModal} style={{ float: 'right' }}>
            <Delete color={grey500} />
          </IconButton>
        </CardHeader>
        <CardText>
          {challenge && (
            <List>
              <ListItem
                leftAvatar={<Avatar icon={<Business />} />}
                secondaryText="Nome">
                {challenge.nome}
              </ListItem>
              <InsetDivider />
              <ListItem
                leftAvatar={<Avatar icon={<Place />} />}
                secondaryText="Localidade">
                {`${challenge.endereco} - ${challenge.cidade}, ${challenge.pais}`}
              </ListItem>
              <InsetDivider />
              <ListItem
                leftAvatar={<Avatar icon={<Phone />} />}
                secondaryText="Telefone"
                rightIconButton={
                  <IconButton onTouchTap={this.handlePhoneModalState}>
                    <Edit color={grey500} />
                  </IconButton>
                }>
                {challenge.telefone}
              </ListItem>
              <InsetDivider />
              <ListItem
                leftAvatar={<Avatar icon={<Public />} />}
                secondaryText="URL"
                rightIconButton={
                  <IconButton onTouchTap={this.openUrlModal}>
                    <Edit color={grey500} />
                  </IconButton>
                }>
                {challenge.url}
              </ListItem>
              <InsetDivider />
              <ListItem
                leftAvatar={<Avatar icon={<Description />} />}
                secondaryText="Descrição"
                rightIconButton={
                  <IconButton onTouchTap={this.openDescriptionModal}>
                    <Edit color={grey500} />
                  </IconButton>
                }>
                {challenge.descricao}
              </ListItem>
            </List>
          )}
        </CardText>
        <EditModal
          open={disableChallengeModalVisible}
          onRequestClose={this.closeDisableChallengeModal}
          handleSubmit={this.handleDisableChallengeSubmit}
          title="Deseja inativar este desafio?"
          width={460}>
          <p>Após desativado, este desafio não poderá mais ser realizado pelos jogadores</p>
        </EditModal>

        <EditModal
          open={phoneModalVisible}
          onRequestClose={this.handlePhoneModalState}
          handleSubmit={this.handlePhoneModalSubmit}
          title="Altere o telefone"
          width={460}>
          {getFieldDecorator('telefone', {
            rules: [{ required: true, message: 'Favor preencher o campo!' }],
          })(
            <TextField
              fullWidth
              errorText={getFieldError('telefone')}
              floatingLabelText="Telefone" />
            )}
        </EditModal>
      </Card>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { selected } = state.challenges;
  return {
    challenge: selected,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = { ...challengeActions, ...snackbarActions };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  createForm()(DetailsChallengePage)
);
