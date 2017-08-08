import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Layout extends Component {
  render() {
    return (
      <div>
        <a onClick={this.props.logout}>Logout</a>
      </div>
    );
  }
}

Layout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Layout;
