import React, { Component } from 'react';

import { Card, CardHeader, FloatingActionButton } from 'material-ui';

import PaginatedTable from '../../utils/paginated-table/PaginatedTable';

class AdminPage extends Component {
  render() {
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

    const admins = [{
      nome: "Nome teste",
      email: "email@email.com",
      userName: "login",
    }];

    return (
      <div>
        <Card>
          <CardHeader title="Consulta" subtitle="Administradores" />
          <PaginatedTable noItemsMessage="Não existem registros"
            tableContent={tableContent}
            listItems={admins}
            limitPerTablePage={10} />
        </Card>
      </div>
    );
  }
}

export default AdminPage;