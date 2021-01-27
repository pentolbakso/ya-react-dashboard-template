import * as api from '../../services/api';

const chat = {
  state: {
    items: [],
    page: 1,
    total: null,
    limit: 20,
    current: null, // currently opened for detail
    keyword: null, // for search
  },
  reducers: {
    setItems(state, items) {
      return { ...state, items };
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
    setCurrent(state, current) {
      return { ...state, current };
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
    async getChats({ keyword, page = 1 }, rootState) {
      // check for previous keyword
      let toSearch = keyword == undefined ? rootState.chat.keyword : keyword;
      this.setKeyword(toSearch);

      if (page <= 0) page = 1;
      const resp = await api.getChats({
        keyword: toSearch,
        skip: (page - 1) * rootState.chat.limit,
        limit: rootState.chat.limit,
      });
      const { total, data } = resp.data;
      this.setPage(page);
      this.setTotal(total);
      this.setItems(data);
      return data;
    },
    async getChat({ id }, rootState) {
      const item = rootState.chat.items.find((f) => f._id === id);
      if (item) {
        this.setCurrent(item);
        return item;
      }
      // if not found in store
      const resp = await api.getChat(id);
      this.setCurrent(resp.data);
      return resp.data;
    },
    async createChat(params) {
      const resp = await api.createChat(params);
      this.addItem(resp.data);
      return resp.data;
    },
    async updateChat({ id, ...params }) {
      const resp = await api.updateChat(id, params);
      this.updateItem(resp.data);
      return resp.data;
    },
    async deleteChat({ id }) {
      const resp = await api.deleteChat(id);
      this.removeItem(id);
      return resp.data;
    },
  },
};

export default chat;
