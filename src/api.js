import axios from 'axios';

const api = axios.create({
  baseURL: `https://11.react.pages.academy/wtw`,
  timeout: 1000 * 5,
  withCredentials: true,
});

export default api;
