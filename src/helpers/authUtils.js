import store from '../rematch/store';

export function isAuthenticated() {
  return !!store.getState().auth.accessToken;
}
