import { apiUrl, apiError } from './apiUtils';

export default (endpoint) => {
  const request = {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }),
    method: 'DELETE',
  };

  const url = `${apiUrl}${endpoint}`;

  return fetch(url, request)
    .then(response => {
      if (response.ok) {
        return Promise.resolve();
      }
      const { status } = response;
      if (response.status === 404) {
        return Promise.reject(apiError(status, 'O recurso solicitado não foi encontrado', url));
      }
      return Promise.reject(response);
    })
    .catch(error => {
      return Promise.reject(error);
    });
}
