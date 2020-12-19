import * as api from '../../services/api';

const template = {
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
    async getTemplates({ keyword, page = 1 }, rootState) {
      // check for previous keyword
      let toSearch = keyword == undefined ? rootState.template.keyword : keyword;
      this.setKeyword(toSearch);

      if (page <= 0) page = 1;
      const resp = await api.getTemplates({
        keyword: toSearch,
        skip: (page - 1) * rootState.template.limit,
        limit: rootState.template.limit,
      });
      const { total, data } = resp.data;
      this.setPage(page);
      this.setTotal(total);
      this.setItems(data);
      return data;
    },
    async getTemplate({ id }, rootState) {
      const item = rootState.template.items.find((f) => f._id === id);
      if (item) {
        this.setCurrent(item);
        return item;
      }
      // if not found in store
      const resp = await api.getTemplate(id);
      this.setCurrent(resp.data);
      return resp.data;
    },
    async createTemplate(params) {
      const resp = await api.createTemplate(params);
      this.addItem(resp.data);
      return resp.data;
    },
    async updateTemplate({ id, ...params }) {
      const resp = await api.updateTemplate(id, params);
      this.updateItem(resp.data);
      return resp.data;
    },
    async deleteTemplate({ id }) {
      const resp = await api.deleteTemplate(id);
      this.removeItem(id);
      return resp.data;
    },
    async toggleEnabled({ id, enabled }) {
      const resp = await api.updateTemplate(id, { enabled });
      this.updateItem(resp.data);
      return resp.data;
    },
  },
};

export default template;
