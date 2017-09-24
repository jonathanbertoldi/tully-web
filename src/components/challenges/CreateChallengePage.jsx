import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as venuesActions from '../../actions/venuesActions';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { TextField, IconButton } from 'material-ui';
import Search from 'material-ui/svg-icons/action/search';

import TullyMap from './TullyMap';

class CreateChallengePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      position: {
        lat: -23.563263,
        lng: -46.654243,
      },
      zoom: 17,
    };
  }

  handleMapClick = async (e) => {
    const { latLng } = e;

    await this.setState({
      position: {
        lat: latLng.lat(),
        lng: latLng.lng()
      }
    });
  }

  handleLatLngChange = (e) => {
    const field = e.target.name;
    let position = Object.assign({}, this.state.position);
    position[field] = e.target.value;
    return this.setState({ position });
  }

  handleSearchClick = (e) => {
    e.preventDefault();

    const { loadVenues } = this.props.actions;
    const { lat, lng } = this.state.position;

    loadVenues(lat, lng);
  }

  handleMarkerClick = (e) => {
    console.log(e);
  }

  render() {
    const { position, zoom } = this.state;
    const { venues } = this.props;

    const markers = venues.map(venue => {
      return {
        position: {
          lat: venue.location.lat,
          lng: venue.location.lng,
        },
        defaultAnimation: 2,
        key: venue.id,
      };
    });

    return (
      <div>
        <Card>
          <CardHeader
            title="Cadastro"
            subtitle="Desafios"
          />
          <TullyMap
            containerElement={<div style={{ height: `360px` }} />}
            mapElement={<div style={{ height: `360px` }} />}
            center={position}
            zoom={zoom}
            markers={markers}
            onMapLoad={_.noop}
            onMapClick={this.handleMapClick}
            onMarkerClick={this.handleMarkerClick}
          />
          <CardText className="form-group" style={{ paddingTop: 0 }}>
            <TextField className="input-control"
              onChange={this.handleLatLngChange}
              value={position.lat}
              name="lat"
              floatingLabelText="Latitude"
            />
            <TextField className="input-control"
              onChange={this.handleLatLngChange}
              value={position.lng}
              name="lng"
              floatingLabelText="Longitude"
            />
            <IconButton
              style={{ marginTop: 28 }}
              onTouchTap={this.handleSearchClick}
            >
              <Search />
            </IconButton>
          </CardText>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { venues } = state;

  return {
    venues,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = { ...venuesActions };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChallengePage);
