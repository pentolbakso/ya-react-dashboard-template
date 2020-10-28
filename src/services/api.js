import http from 'helpers/http';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const login = (email, password) => {
  return http.post(`${API_URL}/authentication`, { strategy: 'local', email, password });
};

export const getPlaces = () => {
  return http.get(`${API_URL}/places`);
};
