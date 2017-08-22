import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as adminActions from '../../actions/adminActions';
import { showSnackbar } from '../../actions/snackbarActions';
import { requestLogout } from '../../actions/loginActions';

import { Card, CardHeader, FloatingActionButton, FlatButton } from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';

import PaginatedTable from '../../utils/paginated-table/PaginatedTable';

import './admin.css';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: undefined,
    };
  }

  componentDidMount() {
    const { loadAdmins } = this.props.actions;

    loadAdmins();
  }

  handleSelectedItem = (item) => {
    const admin = item;
    this.setState({ admin });
  }

  handleDetailsClick = () => {
    const { router } = this.props;
    const { id } = this.state.admin;
    router.push(`admins/${id}`);
  }

  render() {
    const { admins } = this.props;
    const adminSelected = this.state.admin === undefined;

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
          <CardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} title="Consulta" subtitle="Administradores">
            <FlatButton
              disabled={adminSelected}
              label="Detalhes"
              onTouchTap={this.handleDetailsClick} />
          </CardHeader>
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
  const actions = { ...adminActions, requestLogout, showSnackbar };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
