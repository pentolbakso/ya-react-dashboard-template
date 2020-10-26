import * as api from '../../services/api';

const auth = {
  state: {
    user: null,
    accessToken: null,
  },
  reducers: {
    updateUser(state, user) {
      return { ...state, user };
    },
    updateAccessToken(state, accessToken) {
      return { ...state, accessToken };
    },
  },
  effects: {
    async login({ email, password }) {
      const resp = await api.login(email, password);
      const data = resp.data;
      this.updateUser(data.user);
      this.updateAccessToken(data.accessToken);
      return data;
    },
    async logout() {
      this.updateUser(null);
      this.updateAccessToken(null);
    },
  },
};

export default auth;
