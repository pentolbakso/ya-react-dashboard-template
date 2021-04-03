import * as api from '../../services/api';

const user = {
  state: {
    items: [],
    page: 1,
    total: null,
    limit: 10,
    keyword: null, // for search
  },
  reducers: {
    setItems(state, items) {
      return { ...state, items };
    },
    appendItems(state, items) {
      return { ...state, items: [...state.items, ...items] };
    },
    addItem(state, item) {
      return { ...state, items: [item, ...state.items] };
    },
    updateItem(state, item) {
      const newItems = state.items.map((n) => {
        if (n._id === item._id) return item;
        return n;
      });
      return { ...state, items: newItems };
    },
    removeItem(state, id) {
      return { ...state, items: state.items.filter((n) => n._id !== id) };
    },
    setPage(state, page) {
      return { ...state, page };
    },
    setTotal(state, total) {
      return { ...state, total };
    },
    setKeyword(state, keyword) {
      return { ...state, keyword };
    },
  },
  effects: {
    async getUsers({ keyword, page = 1 }, rootState) {
      // check for previous keyword
      let toSearch = keyword == undefined ? rootState.user.keyword : keyword;
      this.setKeyword(toSearch);

      if (page <= 0) page = 1;
      const resp = await api.getUsers({
        keyword: toSearch,
        skip: (page - 1) * rootState.user.limit,
        limit: rootState.user.limit,
      });
      const { total, data } = resp.data;
      this.setPage(page);
      this.setTotal(total);
      this.setItems(data);
      return data;
    },
    async getUser({ id }, rootState) {
      const item = rootState.user.items.find((f) => f._id === id);
      if (item) {
        return item;
      }
      // if not found in store
      const resp = await api.getUser(id);
      this.addItem(resp.data);
      return resp.data;
    },
    async createUser(params) {
      const resp = await api.createUser(params);
      this.addItem(resp.data);
      return resp.data;
    },
    async updateUser({ id, ...params }) {
      const resp = await api.updateUser(id, params);
      this.updateItem(resp.data);
      return resp.data;
    },
    async deleteUser({ id }) {
      const resp = await api.deleteUser(id);
      this.removeItem(id);
      return resp.data;
    },
    async toggleEnabled({ id, enabled }) {
      const resp = await api.updateUser(id, { enabled });
      this.updateItem(resp.data);
      return resp.data;
    },
  },
};

export default user;
