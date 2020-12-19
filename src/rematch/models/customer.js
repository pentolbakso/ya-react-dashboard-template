import * as api from '../../services/api';

const customer = {
  state: {
    items: [],
    page: 1,
    total: null,
    limit: 5,
    current: null, // currently opened for detail
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
    async getCustomers({ keyword, page = 1 }, rootState) {
      // check for previous keyword
      let toSearch = keyword == undefined ? rootState.customer.keyword : keyword;
      this.setKeyword(toSearch);

      if (page <= 0) page = 1;
      const resp = await api.getCustomers({
        keyword: toSearch,
        skip: (page - 1) * rootState.customer.limit,
        limit: rootState.customer.limit,
      });
      const { total, data } = resp.data;
      this.setPage(page);
      this.setTotal(total);
      this.setItems(data);
      return data;
    },
    async getCustomer({ id }, rootState) {
      const item = rootState.customer.items.find((f) => f._id === id);
      if (item) {
        this.setCurrent(item);
        return item;
      }
      // if not found in store
      const resp = await api.getCustomer(id);
      this.setCurrent(resp.data);
      return resp.data;
    },
    async createCustomer(params) {
      const resp = await api.createCustomer(params);
      this.addItem(resp.data);
      return resp.data;
    },
    async updateCustomer({ id, ...params }) {
      const resp = await api.updateCustomer(id, params);
      this.updateItem(resp.data);
      return resp.data;
    },
    async deleteCustomer({ id }) {
      const resp = await api.deleteCustomer(id);
      this.removeItem(id);
      return resp.data;
    },
  },
};

export default customer;
