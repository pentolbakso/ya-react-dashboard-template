import axios from 'axios';
import store from '../rematch/store';

const http = axios.create({
  timeout: 60000,
  withCredentials: false,
  headers: {},
});

http.interceptors.request.use(
  (request) => {
    const token = store.getState().auth.token;
    if (token && token.length > 0) request.headers.Authorization = `Bearer ${token}`;
    //console.log('REQ:', request.url + ' -> ' + request.data);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    //console.log('RESP:', response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      const { data } = error.response;
      // The request was made and the server responded with a status code
      if (error.response.status === 401) {
        console.log('401', error.response);
        if (data.name === 'NotAuthenticated' && data.data && data.data.name === 'TokenExpiredError') {
          store.dispatch.auth.logout();
          return Promise.reject({
            message: 'Token expired. Please try login again.',
          });
        } else {
          return Promise.reject({
            message: 'Login failed. Please check your email and password!',
          });
        }
      } else {
        console.log('ERROR response:', data);
        let message = data.message || error.message;
        return Promise.reject({ message, raw: data });
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
      return Promise.reject({
        message: 'There is problem connecting to server. Please check your connection!',
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject({ message: error.message });
    }
  }
);

export default http;
