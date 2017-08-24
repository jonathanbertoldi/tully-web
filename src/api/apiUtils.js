const developmentUrl = 'http://localhost:8080/api/';
const productionUrl = 'https://tully-api.herokuapp.com/api/';

export const apiUrl = process.env.APP_ENV === 'Production' ? productionUrl : developmentUrl;

export function apiError(statusCode, message, url) {
  return {
    statusCode,
    message,
    url,
  }
}
