export const apiUrl = "http://localhost:8080/api/";

export function apiError(statusCode, message, url) {
  return {
    statusCode,
    message,
    url,
  }
}
