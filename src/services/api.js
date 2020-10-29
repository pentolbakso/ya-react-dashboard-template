import http from 'helpers/http';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const login = (email, password) => {
  return http.post(`${API_URL}/authentication`, { strategy: 'local', email, password });
};

export const getPlaces = ({ keyword, skip, limit }) => {
  return http.get(`${API_URL}/places`, {
    params: {
      'name[$search]': keyword && keyword.length > 0 ? keyword : null,
      $skip: skip,
      $limit: limit,
    },
  });
};
export const getPlace = (id) => {
  return http.get(`${API_URL}/places/${id}`);
};
export const createPlace = ({ name, description, address }) => {
  return http.post(`${API_URL}/places`, { name, description, address });
};
export const updatePlace = ({ id, name, description, address }) => {
  return http.patch(`${API_URL}/places/${id}`, { name, description, address });
};
export const deletePlace = (id) => {
  return http.delete(`${API_URL}/places/${id}`);
};
