import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import { IconMenu, IconButton, MenuItem } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { white } from 'material-ui/styles/colors';

const AppBarIconMenu = ({ onTouchLogout }) => {
    const handleLogout = () => {
        browserHistory.push('/');
        onTouchLogout();
    };

    return (
        <IconMenu iconButtonElement={<IconButton><MoreVertIcon color={white} /></IconButton>}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }} >
            <MenuItem primaryText="Sobre" />
            <MenuItem primaryText="Sair" onTouchTap={handleLogout} />
        </IconMenu>
    );
}

AppBarIconMenu.propTypes = {
    onTouchLogout: PropTypes.func.isRequired,
};

export default AppBarIconMenu;
