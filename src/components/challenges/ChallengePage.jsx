import React, { Component } from 'react';
import { Link } from 'react-router';

import { Card, CardHeader, FloatingActionButton, FlatButton } from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';

class ChallengePage extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardHeader
            title="Consulta"
            subtitle="Desafios"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FlatButton label="Detalhes" />
          </CardHeader>
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

export default ChallengePage;