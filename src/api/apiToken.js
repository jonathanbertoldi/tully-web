import { apiUrl, apiError } from './apiUtils';

export function validateToken() {
  const request = {
    headers: new Headers({
      'Content-type': 'application/json',
      'Authorization': `bearer ${localStorage.getItem('jwt')}`,
    }),
    method: 'GET',
  };

  const url = `${apiUrl}token/validar`;

  return fetch(url, request)
    .then(response => {
      if (response.ok) {
        return response.json()
          .then(json => {
            if (json.usuario.perfil === 'Admin') {
              return Promise.resolve(json);
            } else {
              return Promise.reject(apiError('Usuário com permissões insuficientes para acessar este recurso', url));
            }
          });
      }
      return Promise.reject(apiError('Falha ao realizar autenticação no servidor', url));
    })
    .catch(error => {
      return Promise.reject(error);
    })
}

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
            if (json.usuario.perfil === 'Admin') {
              return Promise.resolve(json);
            } else {
              return Promise.reject(apiError('Usuário com permissões insuficientes para acessar este recurso', url));
            }
          });
      }
      return Promise.reject(apiError('Falha ao realizar autenticação no servidor', url));
    })
    .catch(error => {
      return Promise.reject(error);
    })
}