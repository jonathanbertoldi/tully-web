import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog, FlatButton } from 'material-ui';

class EditModal extends Component {
  render() {
    const { open, onRequestClose, handleSubmit, title, width } = this.props;

    const customContentStyle = {
      width,
    };

    const actions = [
      <FlatButton onTouchTap={onRequestClose} label="Cancelar"/>,
      <FlatButton onTouchTap={handleSubmit} primary label="Enviar"/>
    ];

    return (
      <Dialog
        open={open}
        onRequestClose={onRequestClose}
        title={title}
        actions={actions}
        contentStyle={customContentStyle}>
        {this.props.children}
      </Dialog>
    );
  }
}

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number,
};

export default EditModal;
