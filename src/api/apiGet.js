import { apiUrl, apiError } from './apiUtils';

export default (endpoint) => {
  const request = {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }),
    method: 'GET',
  };

  const url = `${apiUrl}${endpoint}`;

  return fetch(url, request)
    .then(response => {
      if (response.ok) {
        return response.json()
          .then(json => {
            return Promise.resolve(json);
          });
      }
      const { status } = response;
      if (response.status === 404) {
        return Promise.reject(apiError(status, 'O recurso solicitado não foi encontrado', url));
      }
      if (response.status === 401) {
        return Promise.reject(apiError(status, 'Você não está autorizado para acessar este recurso', url));
      }
    })
    .catch(error => {
      return Promise.reject(error);
    });
}
