import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { AppBar, Drawer, List, ListItem, Divider, Subheader } from 'material-ui';
import Home from 'material-ui/svg-icons/action/home';
import People from 'material-ui/svg-icons/social/people';
import Explore from 'material-ui/svg-icons/action/explore';
import Security from 'material-ui/svg-icons/hardware/security';

import AppBarIconMenu from './AppBarIconMenu';

let mediaQueryChangedHandler;

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      drawerDocked: false,
    };
  }

  componentWillMount() {
    const mql = window.matchMedia(`(min-width: 992px)`);
    mediaQueryChangedHandler = this.mediaQueryChanged.bind(this);
    mql.addListener(mediaQueryChangedHandler);
    this.setState({ mql: mql, drawerOpen: mql.matches, drawerDocked: mql.matches });
  }

  componentWillUnmount() {
    this.state.mql.removeListener(mediaQueryChangedHandler);
  }

  mediaQueryChanged = () => {
    this.setState({ drawerOpen: this.state.mql.matches });
    this.setState({ drawerDocked: this.state.mql.matches });
  }

  toggleDrawer = () => {
    if (!this.state.mql.matches) this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  render() {
    const { drawerDocked, drawerOpen } = this.state;
    const { logout } = this.props;

    const windowStyle = {
      paddingLeft: drawerDocked && drawerOpen ? "256px" : "0px"
    }

    const contentStyle = {
      margin: drawerDocked && drawerOpen ? "48px 82px" : "24px",
      padding: "0px 10px"
    }

    return (
      <div>
        <AppBar title="Tully"
          onLeftIconButtonTouchTap={this.toggleDrawer}
          iconElementRight={<AppBarIconMenu onTouchLogout={logout} />} />

        <Drawer docked={drawerDocked}
          open={drawerOpen}
          onRequestChange={this.toggleDrawer} >

          <AppBar title="Tully"
            showMenuIconButton={false}
            style={{ backgroundColor: "#FFF" }}
            titleStyle={{ color: "#6F797E" }} />

          <List>
            <ListItem onTouchTap={this.toggleDrawer}
              leftIcon={<Home />}
              containerElement={<Link to="/" />} >Home</ListItem>
            <ListItem onTouchTap={this.toggleDrawer}
              leftIcon={<People />}
              containerElement={<Link to="/usuarios" />} >Usuários</ListItem>
            <ListItem onTouchTap={this.toggleDrawer}
              leftIcon={<Explore />}
              containerElement={<Link to="/desafios" />} >Desafios</ListItem>
            <ListItem onTouchTap={this.toggleDrawer}
              leftIcon={<Security />}
              containerElement={<Link to="/admins" />} >Administradores</ListItem>
          </List>

          <Divider />

          <Subheader>Tully &copy;</Subheader>
        </Drawer>

        <div style={windowStyle}>
          <div style={contentStyle}>
            {this.props.children}
          </div>
        </div>

      </div>
    );
  }
}

Layout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Layout;
