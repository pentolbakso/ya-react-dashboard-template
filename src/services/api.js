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
// ** user **
export const getUsers = ({ keyword, skip, limit }) => {
  return http.get(`${API_URL}/users`, {
    params: {
      'fullname[$search]': keyword && keyword.length > 0 ? keyword : null,
      $skip: skip,
      $limit: limit,
      '$sort[role]': 1,
      '$sort[fullname]': 1,
    },
  });
};
export const getUser = (id) => {
  return http.get(`${API_URL}/users/${id}`);
};
export const createUser = ({ fullname, email, password, phonenumber, role, enabled }) => {
  return http.post(`${API_URL}/users`, { fullname, email, password, phonenumber, role, enabled });
};
export const updateUser = (id, { fullname, email, password, phonenumber, role, enabled }) => {
  return http.patch(`${API_URL}/users/${id}`, { fullname, email, password, phonenumber, role, enabled });
};
export const deleteUser = (id) => {
  return http.delete(`${API_URL}/users/${id}`);
};
