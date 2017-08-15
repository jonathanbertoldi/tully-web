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
      if (response.status === 404) {
        return Promise.reject(apiError('O recurso solicitado não foi encontrado', url));
      }
      if (response.status === 401) {
        return Promise.reject(apiError('Você não tem nível de permissão o suficiente para acessar este recurso', url));
      }
    })
    .catch(error => {
      return Promise.reject(apiError('Ocorreu um erro na comunicação com o servidor', url));
    });
}