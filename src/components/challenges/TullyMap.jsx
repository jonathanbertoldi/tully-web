import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class TullyMap extends Component {
  render() {
    // map events
    const { onMapLoad, onMapClick, onMarkerClick } = this.props;

    // map properties
    const { zoom, center, markers } = this.props;

    return (
      <GoogleMap ref={onMapLoad}
        defaultZoom={zoom}
        defaultCenter={center}
        onClick={onMapClick}>
        {markers.map(marker => (
          <Marker
            {...marker}
            onClick={onMarkerClick}
          />
        ))}
      </GoogleMap>
    );
  }
}

TullyMap.propTypes = {
  onMapLoad: PropTypes.func,
  onMapClick: PropTypes.func,
  onMarkerClick: PropTypes.func,
  zoom: PropTypes.number,
  center: PropTypes.object,
  markers: PropTypes.arrayOf(PropTypes.object),
};

export default withGoogleMap(TullyMap);
