import { apiUrl } from './apiUtils';

export default (endpoint, property, value) => {
  const body = [{
    op: 'replace',
    path: property,
    value: value,
  }];
  
  const request = {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }),
    method: 'PATCH',
    body: JSON.stringify(body),
  };

  const url = `${apiUrl}${endpoint}`;

  return fetch(url, request)
    .then(response => {
      if (response.ok) {
        return Promise.resolve();
      }
      return Promise.reject(response);
    })
    .catch(error => {
      return Promise.reject(error);
    });
}
