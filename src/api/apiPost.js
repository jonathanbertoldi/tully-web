import { apiUrl } from './apiUtils';

export default (endpoint, body) => {
  const request = {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }),
    method: 'POST',
    body: JSON.stringify(body),
  };

  const url = `${apiUrl}${endpoint}`;

  return fetch(url, request)
    .then(response => {
      if (response.ok || response.status === 400 || response.status === 409) {
        return response.json()
          .then(json => {
            return { response, json };
          })
      }
    })
    .then(({ response, json }) => {
      if (response.ok)
        return Promise.resolve(json);
      return Promise.reject(json);
    })
    .catch(error => {
      console.log(error);
      return Promise.reject(error);
    });
}