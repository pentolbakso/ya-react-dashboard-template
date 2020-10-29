import * as api from '../../services/api';

const place = {
  state: {
    items: [],
    total: null,
    hasMore: false,
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
    setTotal(state, total) {
      return { ...state, total };
    },
    setHasMore(state, hasMore) {
      return { ...state, hasMore };
    },
    setKeyword(state, keyword) {
      return { ...state, keyword };
    },
  },
  effects: {
    async getPlaces({ keyword }, rootState) {
      // check for previous keyword
      let toSearch = keyword == undefined ? rootState.place.keyword : keyword;
      this.setKeyword(toSearch);

      const resp = await api.getPlaces({ keyword: toSearch });
      const { total, limit, data } = resp.data;
      this.setHasMore(data.length == limit);
      this.setTotal(total);
      this.setItems(data);
      return data;
    },
    async getMorePlaces(payload, rootState) {
      const skip = rootState.place.items.length > 0 ? rootState.place.items.length : null;
      const resp = await api.getPlaces({ keyword: rootState.place.keyword, skip });
      const { total, limit, data } = resp.data;
      this.setHasMore(data.length == limit);
      this.setTotal(total);
      this.appendItems(data);
      return data;
    },
    async getPlace({ id }, rootState) {
      const place = rootState.place.items.find((f) => f._id === id);
      if (place) {
        this.setCurrent(place);
        return place;
      }
      // if not found in store
      const resp = await api.getPlace(id);
      this.setCurrent(resp.data);
      return resp.data;
    },
    async createPlace({ name, description, address }) {
      const resp = await api.createPlace({ name, description, address });
      this.addItem(resp.data);
      return resp.data;
    },
    async updatePlace({ id, name, description, address }) {
      const resp = await api.updatePlace({ id, name, description, address });
      this.updateItem(resp.data);
      return resp.data;
    },
    async deletePlace({ id }) {
      const resp = await api.deletePlace(id);
      this.removeItem(id);
      return resp.data;
    },
  },
};

export default place;
