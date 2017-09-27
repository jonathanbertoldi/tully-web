import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as challengeActions from '../../actions/challengeActions';
import * as snackbarActions from '../../actions/snackbarActions';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import { Avatar, Divider, IconButton } from 'material-ui';

import { grey500 } from 'material-ui/styles/colors';
import Delete from 'material-ui/svg-icons/action/delete';

import EditModal from '../../utils/edit-modal/EditModal';

const InsetDivider = () => (
  <Divider inset />
);

class DetailsChallengePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableChallengeModalVisible: false,
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

  render() {
    const { disableChallengeModalVisible } = this.state;
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
                leftAvatar={<Avatar />}
                secondaryText="Nome">
                {challenge.nome}
              </ListItem>
              <InsetDivider />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailsChallengePage);
