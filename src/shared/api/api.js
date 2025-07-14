import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // cambia esto según tu entorno
});

export default api;
