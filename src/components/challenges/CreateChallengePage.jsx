import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { createForm } from 'rc-form';

import * as venuesActions from '../../actions/venuesActions';
import * as challengeActions from '../../actions/challengeActions';
import * as snackbarActions from '../../actions/snackbarActions';

import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import { TextField, IconButton, FlatButton } from 'material-ui';

import { grey600 } from 'material-ui/styles/colors';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CameraIcon from 'material-ui/svg-icons/image/photo-camera';

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

  handleMarkerClick = (marker) => this.props.actions.loadVenue(marker.key);

  handleChallengeSubmit = (e) => {
    e.preventDefault();
    const { form, router } = this.props;
    const { createChallenge, showSnackbar } = this.props.actions;

    form.validateFields((err, values) => {
      if (err) return;

      createChallenge(values)
        .then(response => {
          showSnackbar('Desafio cadastrado com sucesso');
          router.push('/desafios');
        })
        .catch(error => showSnackbar(error[0].description));
    });
  }

  render() {
    const { position, zoom } = this.state;
    const { venues, isFetching } = this.props;
    const { getFieldDecorator, getFieldError } = this.props.form;

    const markers = venues.list.map(venue => {
      const { location, id } = venue;

      return {
        position: {
          lat: location.lat,
          lng: location.lng,
        },
        defaultAnimation: 2,
        key: id,
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
          <CardText style={{ padding: '0 16px' }}>
            <div className="form-group">
              <TextField className="input-control"
                onChange={this.handleLatLngChange}
                value={position.lat}
                name="lat"
                floatingLabelText="Latitude" />
              <TextField className="input-control"
                onChange={this.handleLatLngChange}
                value={position.lng}
                name="lng"
                floatingLabelText="Longitude" />
              <IconButton
                style={{ marginTop: 28 }}
                onTouchTap={this.handleSearchClick} >
                <SearchIcon color={grey600} />
              </IconButton>
            </div>
            <form onSubmit={this.handleChallengeSubmit}>
              {getFieldDecorator('latitude')}
              {getFieldDecorator('longitude')}
              {getFieldDecorator('foto')}
              {getFieldDecorator('nome', {
                rules: [{ required: true, message: 'Favor preencher o campo' }]
              })(
                <TextField
                  name="nome"
                  fullWidth
                  className="input-control"
                  floatingLabelText="Nome"
                  errorText={getFieldError('nome')} />
                )}
              {getFieldDecorator('endereco', {
                initialValue: '',
                rules: [{ required: true, message: 'Favor preencher o campo' }]
              })(
                <TextField
                  name="endereco"
                  fullWidth
                  className="input-control"
                  floatingLabelText="Endereço"
                  errorText={getFieldError('endereco')} />
                )}
              <div className="form-group">
                {getFieldDecorator('cidade', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Favor preencher o campo' }]
                })(
                  <TextField
                    name="cidade"
                    className="input-control"
                    floatingLabelText="Cidade"
                    errorText={getFieldError('cidade')} />
                  )}
                {getFieldDecorator('estado', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Favor preencher o campo' }]
                })(
                  <TextField
                    name="estado"
                    className="input-control"
                    floatingLabelText="Estado"
                    errorText={getFieldError('estado')} />
                  )}
                {getFieldDecorator('pais', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Favor preencher o campo' }]
                })(
                  <TextField
                    name="pais"
                    className="input-control"
                    floatingLabelText="País"
                    errorText={getFieldError('pais')} />
                  )}
              </div>
              <div className="form-group">
                {getFieldDecorator('telefone', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Favor preencher o campo' }]
                })(
                  <TextField
                    name="telefone"
                    className="input-control"
                    floatingLabelText="Telefone"
                    errorText={getFieldError('telefone')} />
                  )}
                {getFieldDecorator('url', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Favor preencher o campo' }]
                })(
                  <TextField
                    name="url"
                    className="input-control"
                    floatingLabelText="URL"
                    errorText={getFieldError('url')} />
                  )}
              </div>
              {getFieldDecorator('descricao', {
                initialValue: '',
                rules: [{ required: true, message: 'Favor preencher o campo' }]
              })(
                <TextField
                  multiLine
                  rows={1}
                  fullWidth
                  name="descricao"
                  className="input-control"
                  floatingLabelText="Descrição"
                  errorText={getFieldError('descricao')} />
                )}
              <FlatButton
                fullWidth
                icon={<CameraIcon color={grey600} />}
                label="Foto" />
              <CardActions className="card-actions">
                <FlatButton label="Cancelar" containerElement={<Link to="/desafios" />} />
                <FlatButton type="submit" label="Salvar" disabled={isFetching} primary />
              </CardActions>
            </form>
          </CardText>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { venues, apiRequestsInProgress } = state;

  return {
    venues,
    isFetching: apiRequestsInProgress > 0 ? true : false,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = { ...venuesActions, ...challengeActions, ...snackbarActions };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

function mapPropsToFields(props) {
  const { selected } = props.venues;

  return {
    nome: { value: selected.nome },
    endereco: { value: selected.endereco },
    cidade: { value: selected.cidade },
    estado: { value: selected.estado },
    pais: { value: selected.pais },
    latitude: { value: selected.latitude },
    longitude: { value: selected.longitude },
    descricao: { value: selected.descricao ? selected.descricao : '' },
    telefone: { value: selected.telefone ? selected.telefone : '' },
    url: { value: selected.url ? selected.url : '' },
    foto: { value: selected.foto ? selected.foto : '' },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  createForm({ mapPropsToFields })(CreateChallengePage)
);
