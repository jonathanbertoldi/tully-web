import { clientId, clientSecret, fourSquareUrl } from './fourSquareApi';

export default (lat, lng) => {
  const latLng = `?ll=${lat},${lng}`;

  const url = `${fourSquareUrl}${latLng}&client_id=${clientId}&client_secret=${clientSecret}&v=20170831`;

  return fetch(url)
    .then(response => response.json())
    .then(json => {
      const { items } = json.response.groups[0];

      return items.map(item => item.venue);
    })
    .catch(error => Promise.reject(error));
};
