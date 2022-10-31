import { KEY } from '../constants/credential';

function fetchData(request, page, perPage) {
  return fetch(
    `https://pixabay.com/api/?q=${request}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  ).then(response => {
    return response.json();
  });
}
const api = { fetchData };

export default api;
