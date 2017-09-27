import { clientId, clientSecret, apiVersion, fourSquareUrl } from './fourSquareApi';

export default (venueId) => {
  const url = `${fourSquareUrl}${venueId}?${clientId}&${clientSecret}&${apiVersion}`;

  return fetch(url)
    .then(response => response.json())
    .then(json => {
      const { venue } = json.response;

      const telefone = venue.contact.formattedPhone;
      const foto = `${venue.bestPhoto.prefix}${venue.bestPhoto.height}x${venue.bestPhoto.width}${venue.bestPhoto.suffix}`;

      const object = Object.assign({}, {
        fourSquareId: venue.id,
        nome: venue.name,
        telefone,
        endereco: venue.location.address,
        latitude: venue.location.lat,
        longitude: venue.location.lng,
        cidade: venue.location.city,
        estado: venue.location.state,
        pais: venue.location.country,
        descricao: venue.description,
        foto,
        url: venue.url,
      });

      return Promise.resolve(object);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};
