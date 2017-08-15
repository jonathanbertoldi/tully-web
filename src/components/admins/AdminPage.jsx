import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as adminActions from '../../actions/adminActions';
import { showSnackbar } from '../../actions/snackbarActions';

import { Card, CardHeader, FloatingActionButton } from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';

import PaginatedTable from '../../utils/paginated-table/PaginatedTable';

import './admin.css';

class AdminPage extends Component {
  componentDidMount() {
    const { loadAdmins, showSnackbar } = this.props.actions;

    loadAdmins().catch(error => showSnackbar());
  }

  handleSelectedItem = (item) => {
    const selectedAdmin = item;
    console.log(selectedAdmin);
  }

  render() {
    const { admins } = this.props;

    const tableContent = [{
      propertyName: 'nome',
      columnName: 'Nome',
    }, {
      propertyName: 'email',
      columnName: "Email",
    }, {
      propertyName: 'userName',
      columnName: "Login"
    }];

    return (
      <div>
        <Card>
          <CardHeader title="Consulta" subtitle="Administradores" />
          <PaginatedTable noItemsMessage="Não existem registros"
            tableContent={tableContent}
            listItems={admins}
            limitPerTablePage={10}
            handleSelectedItem={this.handleSelectedItem} />
        </Card>
        <FloatingActionButton
          className="fab-add"
          containerElement={<Link to="/admins/novo" />}>
          <Add />
        </FloatingActionButton>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { admins } = state;
  return {
    admins,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = { ...adminActions, showSnackbar };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
