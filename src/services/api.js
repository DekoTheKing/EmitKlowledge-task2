import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0', // Hacker News API base URL
});

export default api;
