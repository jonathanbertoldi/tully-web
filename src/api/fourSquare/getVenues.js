import { clientId, clientSecret, apiVersion, fourSquareUrl } from './fourSquareApi';

export default (lat, lng) => {
  const latLng = `?ll=${lat},${lng}`;

  const url = `${fourSquareUrl}explore/${latLng}&${clientId}&${clientSecret}&${apiVersion}`;

  return fetch(url)
    .then(response => response.json())
    .then(json => {
      const { items } = json.response.groups[0];

      return items.map(item => item.venue);
    })
    .catch(error => Promise.reject(error));
};
