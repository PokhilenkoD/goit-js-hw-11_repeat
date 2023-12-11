import axios from 'axios';

const API_KEY = '31844347-16adccdcc2872ee3a7bce49dd';
const BASE_URL = 'https://pixabay.com/api/';

async function requestVideo(value, page = 1) {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${value}&page=${page}`
  );
  return response;
}

export { requestVideo };
