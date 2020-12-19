import * as api from '../../services/api';

const category = {
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
    async getCategories({ keyword, page = 1 }, rootState) {
      // check for previous keyword
      let toSearch = keyword == undefined ? rootState.category.keyword : keyword;
      this.setKeyword(toSearch);

      if (page <= 0) page = 1;
      const resp = await api.getCategories({
        keyword: toSearch,
        skip: (page - 1) * rootState.category.limit,
        limit: rootState.category.limit,
      });
      const { total, data } = resp.data;
      this.setPage(page);
      this.setTotal(total);
      this.setItems(data);
      return data;
    },
    async getCategory({ id }, rootState) {
      const item = rootState.category.items.find((f) => f._id === id);
      if (item) {
        this.setCurrent(item);
        return item;
      }
      // if not found in store
      const resp = await api.getCategory(id);
      this.setCurrent(resp.data);
      return resp.data;
    },
    async createCategory(params) {
      const resp = await api.createCategory(params);
      this.addItem(resp.data);
      return resp.data;
    },
    async updateCategory({ id, ...params }) {
      const resp = await api.updateCategory(id, params);
      this.updateItem(resp.data);
      return resp.data;
    },
    async deleteCategory({ id }) {
      const resp = await api.deleteCategory(id);
      this.removeItem(id);
      return resp.data;
    },
    async toggleEnabled({ id, enabled }) {
      const resp = await api.updateCategory(id, { enabled });
      this.updateItem(resp.data);
      return resp.data;
    },
  },
};

export default category;
