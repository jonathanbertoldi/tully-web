import { apiUrl, apiError } from './apiUtils';

export default (credentials) => {
  const request = {
    headers: new Headers({
      'Content-type': 'application/json',
    }),
    method: 'POST',
    body: JSON.stringify(credentials),
  };

  const url = `${apiUrl}token`;

  return fetch(url, request)
    .then(response => {
      if (response.ok) {
        return response.json()
          .then(json => {
            return Promise.resolve(json);
          });
      }
      return Promise.reject(apiError('Falha ao realizar autenticação no servidor', url));
    })
    .catch(error => {
      return Promise.reject(error);
    })
}