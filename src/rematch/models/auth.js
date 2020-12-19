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
    async updateAccount(params, rootState) {
      const resp = await api.updateUser(rootState.auth.user._id, params);
      this.updateUser(resp.data);
      return resp.data;
    },
  },
};

export default auth;
