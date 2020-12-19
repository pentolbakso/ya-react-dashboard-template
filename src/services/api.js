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
// ** customers **
export const getCustomers = ({ keyword, skip, limit }) => {
  return http.get(`${API_URL}/customers`, {
    params: {
      'fullname[$search]': keyword && keyword.length > 0 ? keyword : null,
      $skip: skip,
      $limit: limit,
      '$sort[fullname]': 1,
    },
  });
};
export const getCustomer = (id) => {
  return http.get(`${API_URL}/customers/${id}`);
};
export const createCustomer = ({ fullname, phonenumber, gender, city, bornYear, job, education, tags, notes }) => {
  return http.post(`${API_URL}/customers`, {
    fullname,
    phonenumber,
    gender,
    city,
    bornYear,
    job,
    education,
    tags,
    notes,
  });
};
export const updateCustomer = (id, { fullname, phonenumber, gender, city, bornYear, job, education, tags, notes }) => {
  return http.patch(`${API_URL}/customers/${id}`, {
    fullname,
    phonenumber,
    gender,
    city,
    bornYear,
    job,
    education,
    tags,
    notes,
  });
};
export const deleteCustomer = (id) => {
  return http.delete(`${API_URL}/customers/${id}`);
};
// ** categories **
export const getCategories = ({ keyword, skip, limit }) => {
  return http.get(`${API_URL}/categories`, {
    params: {
      $skip: skip,
      $limit: limit,
      '$sort[enabled]': -1,
      '$sort[keyword]': 1,
    },
  });
};
export const getCategory = (id) => {
  return http.get(`${API_URL}/categories/${id}`);
};
export const createCategory = ({ name, welcomeMessage, enabled, keyword }) => {
  return http.post(`${API_URL}/categories`, { name, welcomeMessage, enabled, keyword });
};
export const updateCategory = (id, { name, welcomeMessage, enabled, keyword }) => {
  return http.patch(`${API_URL}/categories/${id}`, { name, welcomeMessage, enabled, keyword });
};
export const deleteCategory = (id) => {
  return http.delete(`${API_URL}/categories/${id}`);
};
// ** templates **
export const getTemplates = ({ keyword, skip, limit }) => {
  return http.get(`${API_URL}/templates`, {
    params: {
      'name[$search]': keyword && keyword.length > 0 ? keyword : null,
      $skip: skip,
      $limit: limit,
      '$sort[enabled]': -1,
      '$sort[name]': 1,
    },
  });
};
export const getTemplate = (id) => {
  return http.get(`${API_URL}/templates/${id}`);
};
export const createTemplate = ({ name, text, notes }) => {
  return http.post(`${API_URL}/templates`, { name, text, notes });
};
export const updateTemplate = (id, { name, text, notes, enabled }) => {
  return http.patch(`${API_URL}/templates/${id}`, { name, text, notes, enabled });
};
export const deleteTemplate = (id) => {
  return http.delete(`${API_URL}/templates/${id}`);
};
