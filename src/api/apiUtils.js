const developmentUrl = 'http://localhost:8080/api/';
const productionUrl = 'https://tully-api.herokuapp.com/api/';

export const apiUrl = process.env.NODE_ENV === 'development' ? developmentUrl : productionUrl;

export function apiError(statusCode, message, url) {
  return {
    statusCode,
    message,
    url,
  }
}
