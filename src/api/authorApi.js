import { handleResponse, handleError } from './apiUtil';
const baseUrl = process.env.API_URL + '/authors/';

export function getAuthors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
