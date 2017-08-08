export const apiUrl = "http://localhost:8080/api/";

export function apiError(message, url) {
  return {
    message,
    url,
  }
}