import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as challengeActions from '../../actions/challengeActions';

import { Card, CardHeader, FloatingActionButton, FlatButton } from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';

import PaginatedTable from '../../utils/paginated-table/PaginatedTable';

class ChallengePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenge: undefined,
    };
  }

  componentDidMount() {
    this.props.actions.loadChallenges();
  }

  handleSelectedItem = (item) => {
    const challenge = item;
    this.setState({ challenge });
  }

  render() {
    const { challenges } = this.props;
    const challengeSelected = this.state.challenge === undefined;

    const tableContent = [{
      propertyName: 'nome',
      columnName: 'Nome',
    }, {
      propertyName: 'endereco',
      columnName: "Endereço",
    }, {
      propertyName: 'cidade',
      columnName: "Cidade"
    }];

    return (
      <div>
        <Card>
          <CardHeader
            title="Consulta"
            subtitle="Desafios"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FlatButton
              disabled={challengeSelected}
              label="Detalhes"
              onTouchTap={this.handleDetailsClick} />
          </CardHeader>
          <PaginatedTable noItemsMessage="Não existem registros"
            tableContent={tableContent}
            listItems={challenges.list}
            limitPerTablePage={10}
            handleSelectedItem={this.handleSelectedItem} />
        </Card>
        <FloatingActionButton
          className="fab-add"
          containerElement={<Link to="/desafios/novo" />}>
          <Add />
        </FloatingActionButton>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { challenges } = state;

  return {
    challenges,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = { ...challengeActions };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengePage);